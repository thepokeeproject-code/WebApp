<script>
    import { inview } from 'svelte-inview';
    import { Tooltip } from 'flowbite-svelte';
    import { emptyTween, round, animateM, animateF, animateS } from './rating.helpers.js';
    import State from '#state/state.svelte';
    import * as Emojis from '#emojis/index';

    const { postId } = $props();

    let isVisible = $state(false);
    let elMale = $state(undefined);
    let elFemale = $state(undefined);
    let twMale = $state(emptyTween());
    let twFemale = $state(emptyTween());
    let twSelf = $state(emptyTween());

    const data = $derived.by(() => {
        const ratings = State.ratingsById(postId) ?? {};
        const m = ratings.male;
        const f = ratings.female;
        const s = ratings.self;
        const avg = (m + f) / 2;
        const isCombined = Math.abs(m - f) < 0.5;

        return { m, f, s, avg, isCombined, isVisible };
    });

    const enter = (e) => {
        if (e.detail.inView) isVisible = true;
    };

    const leave = (e) => {
        if (!e.detail.inView) isVisible = false;
    };

    $effect(() => {
        animateM(twMale, elMale, data);
        animateF(twFemale, elFemale, data);
        animateS(twSelf, data);
    });
</script>

<div
    use:inview
    oninview_enter={enter}
    oninview_leave={leave}
    oninview_init={leave}
    direction="vertical"
    class:isVisible
    class="container absolute flex flex-col"
>
    <div class="bar absolute shadow-xl/50 inset-shadow-black/60"></div>
    <div class="cohorts absolute">
        <div
            bind:this={elMale}
            class="gender male absolute shadow-xl"
            class:invisible={isNaN(data.m)}
            style="bottom: calc({twMale.current}% - 2.4rem)"
        >
            <Emojis.Male />
        </div>
        <Tooltip type="auto">{round(data.m, 2)} / 4</Tooltip>
        <div
            bind:this={elFemale}
            class="gender female absolute shadow-xl"
            class:invisible={isNaN(data.f)}
            style="bottom: calc({twFemale.current}% - 2.4rem)"
        >
            <Emojis.Female />
        </div>
        <Tooltip type="auto">{round(data.f, 2)} / 4</Tooltip>
        <div class="gender self absolute shadow-xl" style="bottom: calc({twSelf.current}% - 2.2rem)">me</div>
        <Tooltip type="auto">{data.s} / 4</Tooltip>
    </div>
</div>

<style>
    .container {
        position: absolute;
        right: 2.2rem;
        bottom: 10rem;
        width: 1rem;
        height: 0;
        transition: height 200ms var(--easing-default);
    }

    .container.isVisible {
        height: 20rem;
    }

    .bar {
        bottom: 0;
        left: 0;
        right: 0;
        height: 0%;
        border-radius: 1.8rem;
        transition: height 500ms var(--easing-default);
    }

    .isVisible .bar {
        height: 100%;
    }

    .cohorts {
        bottom: 0;
        right: 0;
        height: 0%;
        transition: height 800ms var(--easing-default);
    }

    .isVisible .cohorts {
        height: 100%;
    }

    .gender {
        width: 2.4rem;
        height: 2.4rem;
        line-height: 2.4rem;
        font-size: 1.3rem;
        text-align: center;
        transition: all;
        background-color: rgba(255, 255, 255, 1);
    }

    :global(*) {
        --bar-bg: rgba(255, 255, 255, 0.8);
    }

    :global(.dark) {
        --bar-bg: rgba(255, 255, 255, 0.8);
    }

    .bar {
        background: repeating-linear-gradient(
            0deg,
            var(--bar-bg) 0,
            var(--bar-bg) calc(25% - 2px),
            transparent calc(25% - 2px),
            transparent calc(25% + 2px),
            var(--bar-bg) calc(25% + 2px),
            var(--bar-bg) calc(50% - 2px),
            transparent calc(50% - 2px),
            transparent calc(50% + 2px),
            var(--bar-bg) calc(50% + 2px),
            var(--bar-bg) calc(75% - 2px),
            transparent calc(75% - 2px),
            transparent calc(75% + 2px),
            var(--bar-bg) calc(75% + 2px),
            var(--bar-bg) 100%
        );
    }

    .male {
        left: -3.4rem;
        border-radius: 50% 0 50% 50%;
    }

    .female {
        left: -3.4rem;
        border-radius: 50% 0 50% 50%;
    }

    .self {
        right: -2.2rem;
        height: 2.2rem;
        width: 2.2rem;
        border-radius: 0 50% 50% 50%;
        background-color: rgba(255, 255, 255, 1);
        color: black;
        font-size: 1rem;
        font-weight: bold;
        line-height: 1.8rem;
    }
</style>
