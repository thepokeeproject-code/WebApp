<script>
    import axios from 'axios';
    import { inertia, page, router } from '@inertiajs/svelte';
    import { onMount, onDestroy } from 'svelte';
    import { idGeneratorDec } from '#contracts/id_generator';
    import { scrollElement } from 'svelte-scrolling';
    import Page from '#components/page';
    import Padding from '#components/padding';
    import Spacer from '#components/spacer';
    import PageFull from '#components/pagefull';
    import TypeImage from '#components/types/image';
    import Adder from '#components/adder';
    import Comments from '#components/comments';
    import State from '#state/state.svelte';
    import Sockets from '#state/sockets';
    import { translate } from '#state/translate';

    const { errors = {}, post, sessionOwner, ratingsForPosts, referrer } = $props();

    State.mergePostsFromArray([post]);
    State.mergeRatings(ratingsForPosts);
    State.setSessionOwner(sessionOwner);
    State.setReferrer(referrer);

    onMount(() => {
        if (!referrer?.endsWith('/create')) scrollElement('comments');
        Sockets.subscribe(['comment', 'rating']);
    });

    onDestroy(() => Sockets.unsubscribe(['comment', 'rating']));

    const values = $state({
        valInput: undefined,
        elInput: undefined,
        error: undefined,
    });

    const data = $derived.by(() => {
        const postId = post.id;
        const hasSession = State.hasSession();
        const placeholder = translate('messages.pages.post.write_comment');

        return {
            postId,
            hasSession,
            placeholder,
        };
    });

    const loginToComment = translate('messages.pages.post.login_to_comment', {
        link: (chunks) => `<a use:inertia href="/login">${chunks}</a>`,
    });

    // TODO: action!
    const submitForm = (e) => {
        // Prevent page from reloading
        e.preventDefault();

        if (!values.valInput) return;

        const text = values.valInput;
        const postId = post.id;
        const postUid = post.postUid;
        const userId = sessionOwner.id;
        const clientId = idGeneratorDec.next().value;
        const now = new Date().toISOString();

        // Clear values
        values.elInput.value = '';
        values.valInput = undefined;
        values.error = undefined;

        const clientComment = {
            id: clientId,
            userId,
            postId,
            text,
            createdAt: now,
            updatedAt: now,
            commentUid: null,
            metadata: {},
            author: {
                id: userId,
                username: sessionOwner.username,
                gender: sessionOwner.metadata.gender,
            },
        };

        State.createComment(clientComment);

        axios
            .post(`/posts/${postUid}/comments`, { text, postId }, { withCredentials: true })
            .then((res) => {
                const { author, comment } = res.data;
                State.deleteComment(clientId);
                State.createComment(comment);
            })
            .catch(({ response }) => {
                values.elInput.value = text;
                State.deleteComment(clientId);
                if (response.status === 401) router.visit('/login');
                const msg = response?.data?.errors?.[0]?.message;
                values.error = msg || translate('messages.errors.generic_error');
            });
    };
</script>

<svelte:head>
    <title>{post.title} – gendly</title>
</svelte:head>

<PageFull>
    <TypeImage
        postId={post.id}
        isBtnShareHidden={true}
        isBtnCommentsHidden={true}
        isBtnHomeHidden={false}
        shouldScrollSnap={false}
    />
    <div class="bg-slate-200/90 dark:bg-slate-700/90 rounded-2xl mt-2 mb-8">
        <Padding>
            <form onsubmit={submitForm} class="flex flex-col relative">
                {#if data.hasSession}
                    <textarea
                        bind:this={values.elInput}
                        bind:value={values.valInput}
                        placeholder={data.placeholder}
                        class="form-element relative h-[5rem] w-full"
                    ></textarea>
                {:else}
                    <p class="form-element h-[5rem] w-full select-none">
                        {@html loginToComment}
                    </p>
                {/if}
                {#if errors.text}
                    <p class="form-error">{errors.text}</p>
                {/if}
                {#if values.error}
                    <p class="form-error">{values.error}</p>
                {/if}
                <Spacer></Spacer>
                <button class="form-element" type="submit" disabled={!data.hasSession || !values.valInput}>
                    {translate('messages.actions.post_comment')}
                </button>
            </form>

            <h3 id="comments" class="text-2xl mb-3 mt-6 select-none">
                <span>{translate('messages.comments')}</span>
                <span> </span>
                <span class="text-base">({post.commentsCount})</span>
            </h3>
            <Comments postId={data.postId} />
        </Padding>
    </div>
    <Adder />
</PageFull>
