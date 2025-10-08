<script>
    import { inertia } from '@inertiajs/svelte';
    import { onMount, onDestroy } from 'svelte';
    import * as Actions from '#actions/index';
    import { pageSizePosts } from '#contracts/paging';
    import PageFull from '#components/pagefull';
    import TypeImage from '#components/types/image';
    import Loader from '#components/loader';
    import Adder from '#components/adder';
    import Spacer from '#components/spacer';
    import Pagehint from '#components/pagehint';
    import State from '#state/state.svelte';
    import Sockets from '#state/sockets';
    import { translate } from '#state/translate';

    const { posts, sessionOwner, ratingsForPosts, referrer } = $props();

    State.setPostsMeta(posts.meta);
    State.mergePostsFromArray(posts.data);
    State.mergeRatings(ratingsForPosts);
    State.setSessionOwner(sessionOwner);
    State.setReferrer(referrer);

    onMount(() => {
        Sockets.subscribe(['post', 'rating']);
        Actions.userWelcome();
    });

    const data = $derived.by(() => {
        const incoming = State.postsIncoming();

        return {
            incoming,
            posts: State.postsAsArr(),
            meta: State.postsMeta(),
            hasPostsPending: incoming.length > 0,
        };
    });
</script>

<svelte:head>
    <title>{translate('messages.home')} – gendly</title>
</svelte:head>

<PageFull>
    {#if data.hasPostsPending}
        <div class="snap-end mt-7 flex flex-row grow">
            <button
                id="posts-hint"
                onclick={Actions.postsRefresh}
                class="select-none flex grow p-3 rounded-lg justify-center text-slate-600 border-slate-600 border-2 bg-white/35"
            >
                {translate('messages.pages.home.show_new_posts', {
                    count: data.incoming.length,
                })}
            </button>
        </div>
    {/if}
    {#each data.posts as post}
        <TypeImage
            postId={post.id}
            isBtnShareHidden={true}
            isBtnCommentsHidden={false}
            isBtnHomeHidden={true}
            shouldScrollSnap={true}
        />
    {/each}
    {#if data.posts.length >= pageSizePosts}
        <Loader
            pagingInfo={() => data.meta}
            nextPageUrl={(info) => `/posts${info.nextPageUrl}`}
            onSuccess={Actions.postsLoadSuccess}
        />
    {:else}
        <div class="p-5 flex flex-col items-center">
            <Pagehint>
                {translate('messages.ui.reached_end')}
            </Pagehint>
        </div>
    {/if}
    <div class="flex h-14"></div>
    <div class="flex h-14"></div>
    <div class="flex h-14"></div>
    <div class="flex h-14"></div>
    <div class="flex h-14"></div>
    <Adder />
</PageFull>
