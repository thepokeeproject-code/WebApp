<script>
    import { inertia } from '@inertiajs/svelte';
    import { inview } from 'svelte-inview';
    import { UserGender } from '#contracts/enums';
    import * as Icons from '#icons/index';
    import * as Actions from '#actions/index';
    import * as Emojis from '#emojis/index';
    import Rating from '#components/rating';
    import Rater from '#components/rater';
    import State from '#state/state.svelte';
    import historyBack from '#actions/historyBack';
    import Lazyimage from '#components/lazyimage';
    import { Dropdown, DropdownItem, DropdownDivider, DropdownHeader } from 'flowbite-svelte';
    import { translate } from '#state/translate';

    const { postId, isBtnShareHidden, isBtnCommentsHidden, isBtnHomeHidden, shouldScrollSnap } = $props();

    let btnMenu = $state(null);

    const data = $derived.by(() => {
        const post = State.postById(postId);
        const hasRating = State.hasRating(postId);
        const hasSession = State.hasSession();

        return {
            post,
            hasRating,
            hasSession,
            showBtnMenu: hasRating && hasSession,
        };
    });
</script>

<div class="post relative overflow-hidden" class:snap-start={shouldScrollSnap}>
    <div class="spacer"></div>
    <Lazyimage src={data.post.metadata.imageUrl} title={data.post.title} />
    <a use:inertia href="/posts/{data.post.postUid}">
        <h3 class="title absolute text-l">
            {#if data.post.user.gender === UserGender.MALE}
                <Emojis.Male />
            {:else}
                <Emojis.Female />
            {/if}
            <span class="headline text-shadow-xl">{data.post.title}</span>
        </h3>
    </a>
    {#if !data.hasRating}
        <Rater {postId} />
    {/if}
    <div class="gradient absolute"></div>
    <div class="actions absolute flex flex-row">
        <div class="flex grow"></div>
        {#if data.showBtnMenu}
            <button class="contextmenu" bind:this={btnMenu}>
                <div class="button-round">
                    <Icons.Ellipsis />
                </div>
            </button>
            <Dropdown simple placement="top" offset={10}>
                <DropdownItem onclick={(e) => Actions.ratingDelete(e, postId)}>
                    {translate('messages.actions.delete_rating')}
                </DropdownItem>
            </Dropdown>
        {/if}
        {#if isBtnShareHidden === false}
            <div class="share">
                <div class="button-round">
                    <Icons.Share />
                </div>
            </div>
        {/if}
        {#if isBtnCommentsHidden === false}
            <div class="comments">
                <div class="flex-col flex mr-2 text-2xl"></div>
                <a class="button-round" use:inertia href="/posts/{data.post.postUid}">
                    <Icons.Comment />
                </a>
            </div>
        {/if}
        {#if isBtnHomeHidden === false}
            <div class="feed">
                <button class="button-round" onclick={(e) => Actions.historyBack(e, '/')}>
                    <Icons.X />
                </button>
            </div>
        {/if}
    </div>
    {#if data.hasRating}
        <Rating {postId} />
    {/if}
</div>

<style>
    .spacer {
        height: var(--post-margin-top);
    }

    .post {
        user-select: none;
    }

    .title {
        color: black;
        top: calc(var(--post-margin-top) + 1rem);
        left: 1.5rem;
        max-width: 40%;
    }

    .headline {
        letter-spacing: 0.02rem;
        color: white;
    }

    .gradient {
        left: 0;
        right: 0;
        bottom: 0;
        height: 10rem;
        background: linear-gradient(0deg, rgba(0, 0, 0, 0.75), transparent);
        border-radius: 0 0 1rem 1rem;
    }

    .actions {
        bottom: 1.5rem;
        right: 1.5rem;
        left: 1.5rem;
    }

    .comments,
    .contextmenu,
    .feed,
    .share {
        margin-left: 1rem;
    }
</style>
