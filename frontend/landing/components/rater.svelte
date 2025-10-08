<script>
    import { Tween } from 'svelte/motion';
    import { cubicOut } from 'svelte/easing';
    import * as Icons from '#icons/index';
    import * as Actions from '#actions/index';
    import * as Emojis from '#emojis/index';
    import State from '#state/state.svelte';
    import { createTweens, updateTweens, resetTweens } from './rater.helpers.js';

    const { postId } = $props();

    const data = $derived.by(() => {
        const post = State.postById(postId);
        const hasRating = State.hasRating(postId);
        const hasSession = State.hasSession();
        const isMenuOpen = State.isRatingMenuOpen(postId);

        return {
            post,
            hasRating,
            hasSession,
            isMenuOpen,
        };
    });

    const values = $state(createTweens());

    $effect(() => {
        if (data.isMenuOpen) {
            updateTweens(values);
        } else {
            resetTweens(values);
        }
    });
</script>

<div class="container absolute rounded-full" class:isMenuOpen={data.isMenuOpen}>
    <div
        class="selector shadow rounded-full"
        style="background: conic-gradient(from 180deg, rgba(0, 0, 0, 0.15) {values.twSelector
            .current}deg, #0000 0%); transform: scale({values.twSelectorScale.current})"
    ></div>
    <div class="icons">
        <button
            value="4"
            onclick={(e) => Actions.ratingCreate(e, postId)}
            class="value rating-4 absolute"
            style="transform: scale({values.tw5.current});"
        >
            <Emojis.Rating4 />
        </button>
        <button
            value="3"
            onclick={(e) => Actions.ratingCreate(e, postId)}
            class="value rating-3 absolute"
            style="transform: scale({values.tw4.current});"
        >
            <Emojis.Rating3 />
        </button>
        <button
            value="2"
            onclick={(e) => Actions.ratingCreate(e, postId)}
            class="value rating-2 absolute"
            style="transform: scale({values.tw3.current});"
        >
            <Emojis.Rating2 />
        </button>
        <button
            value="1"
            onclick={(e) => Actions.ratingCreate(e, postId)}
            class="value rating-1 absolute"
            style="transform: scale({values.tw2.current});"
        >
            <Emojis.Rating1 />
        </button>
        <button
            value="0"
            onclick={(e) => Actions.ratingCreate(e, postId)}
            class="value rating-0 absolute"
            style="transform: scale({values.tw1.current});"
        >
            <Emojis.Rating0 />
        </button>
    </div>
    {#if data.hasSession}
        <button class="opener rounded-full shadow" onclick={() => State.openRatingMenu(postId)}>
            <div class="size-11 m-auto">
                <Icons.Fire />
            </div>
        </button>
    {:else if !data.hasSession}
        <button class="opener rounded-full shadow" onclick={() => Actions.visitLogin()}>
            <div class="size-11 m-auto">
                <Icons.Fire />
            </div>
        </button>
    {/if}
    <button class="closer rounded-full shadow" onclick={() => State.closeRatingMenus()}>
        <Icons.X></Icons.X>
    </button>
</div>

<style>
    /* https://www.reddit.com/r/css/comments/1fvo5dl/ */

    :root {
        --selector-size: 16rem;
    }

    .container {
        right: 1rem;
        height: 4.5rem;
        width: 4.5rem;
        bottom: calc(50% - 2.5rem);
        background: rgba(0, 0, 0, 0.15);
        transition: background;
    }

    .container.isMenuOpen {
        background: none;
    }

    .icons {
        position: absolute;
        bottom: -5.5rem;
        right: calc(var(--selector-size) / -2);
        height: var(--selector-size);
        width: var(--selector-size);
    }

    .selector {
        width: var(--selector-size);
        position: absolute;
        top: calc(50% - var(--selector-size) / 2);
        right: calc(var(--selector-size) / -2);
        aspect-ratio: 1;
        border-radius: 50%;
        transform: scale(0);
        background: conic-gradient(from 180deg, rgba(0, 0, 0, 0.15) 0deg, #0000 0%);
        transition: transform 150ms var(--easing-default);
    }

    .opener {
        color: white;
        position: absolute;
        width: 100%;
        height: 100%;
        padding: 0.75rem;
        opacity: 100;
        transform: scale(1);
        transform-origin: 50% 50%;
        transition: all 150ms var(--easing-default);
    }

    .isMenuOpen .opener {
        transform: scale(0);
        opacity: 0;
    }

    .closer {
        color: white;
        position: absolute;
        height: 2rem;
        width: 2rem;
        top: calc(50% - 1rem);
        right: 1rem;
        opacity: 0;
        transform: scale(0);
        transform-origin: 50% 50%;
        transition: all 200ms var(--easing-default);
    }

    .isMenuOpen .closer {
        transform: scale(1);
        opacity: 100;
    }

    .value {
        cursor: pointer;
        font-size: 2rem;
        opacity: 0;
        transform: scale(0);
        transform-origin: 50% 50%;
        transition: all 200ms var(--easing-default);
    }

    .value.rating-4 {
        left: 5rem;
        top: 1rem;
    }

    .value.rating-3 {
        left: 2rem;
        top: 3rem;
    }

    .value.rating-2 {
        left: 1rem;
        top: 6.5rem;
    }

    .value.rating-1 {
        left: 2rem;
        top: 10rem;
    }

    .value.rating-0 {
        left: 5rem;
        top: 12rem;
    }

    .isMenuOpen .value {
        opacity: 100;
    }

    .value:hover {
        transform: scale(1.1);
    }
</style>
