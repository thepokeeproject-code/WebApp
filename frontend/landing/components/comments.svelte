<script>
    import axios from 'axios';
    import { inertia } from '@inertiajs/svelte';
    import { onMount, onDestroy } from 'svelte';
    import { UserGender } from '#contracts/enums';
    import { pageSizeComments } from '#contracts/paging';
    import * as Actions from '#actions/index';
    import * as Icons from '#icons/index';
    import * as Emojis from '#emojis/index';
    import Loader from '#components/loader';
    import Pagehint from '#components/pagehint';
    import State from '#state/state.svelte';
    import { translate } from '#state/translate';

    const { postId } = $props();

    const data = $derived.by(() => {
        const comments = State.commentsForPostId(postId);
        const incoming = State.commentsIncomingForPostId(postId);

        return {
            comments,
            incoming,
            hasComments: comments.length > 0,
            hasCommentsPending: incoming.length > 0,
        };
    });

    const isMale = (comment) => {
        return comment.author.gender === UserGender.MALE;
    };

    onMount(() => Actions.commentsLoad(postId));
    onDestroy(() => State.resetCommentsMeta());
</script>

{#if data.hasCommentsPending}
    <button
        id="comments-hint"
        onclick={Actions.commentsRefresh}
        class="select-none p-3 rounded-lg mb-5 text-center text-teal-400 dark:text-teal-300 bg-slate-100 dark:bg-slate-500 border-teal-400 dark:border-teal-300 border-2"
    >
        {translate('messages.pages.post.show_new_comments', {
            count: data.incoming.length,
        })}
    </button>
{/if}
{#if data.hasComments}
    {#each data.comments as comment}
        <div class="my-3">
            <div class="flex flex-row items-center">
                <span class="size-5 inline-flex mr-1">
                    {#if isMale(comment)}
                        <Icons.Male />
                    {:else}
                        <Icons.Female />
                    {/if}
                </span>
                <span class="inline-flex">
                    <strong class:text-blue-400={isMale(comment)} class:text-pink-400={!isMale(comment)}>
                        {comment.author.username}
                    </strong>
                </span>
            </div>
            <p
                class="comment rounded-lg bg-slate-300 dark:bg-slate-600 dark:text-slate-300 p-3 text-base mt-1 text-slate-600"
            >
                {comment.text}
            </p>
            <div class="text-xs text-right text-slate-400 mt-1">
                {translate('messages.ui.date_time', {
                    timestamp: new Date(comment.createdAt),
                })}
            </div>
        </div>
    {/each}
    {#if data.comments.length >= pageSizeComments}
        <Loader
            pagingInfo={() => State.commentsMeta()}
            nextPageUrl={(info) => `/posts/${postId}/comments${info.nextPageUrl}`}
            onSuccess={Actions.commentsLoadSuccess}
        />
    {/if}
{:else}
    <Pagehint>
        {translate('messages.pages.post.no_comments')}
    </Pagehint>
{/if}
