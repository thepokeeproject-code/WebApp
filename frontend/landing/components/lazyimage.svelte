<script>
    import { inview } from 'svelte-inview';
    import Spinner from './spinner.svelte';
    import { onMount } from 'svelte';

    const { src, title } = $props();

    const values = $state({
        shouldLoad: false,
        isLoaded: false,
        src: '',
    });

    const done = () => {
        requestAnimationFrame(() => {
            values.isLoaded = true;
            values.src = src;
        });
    };

    const enter = () => {
        values.shouldLoad = true;
        const img = new Image();
        img.onload = () => done();
        img.onerror = () => {};
        img.src = src;
    };

    const options = {
        rootMargin: '200px 0px',
        threshold: 0,
        once: true,
        onEnter: enter,
    };
</script>

<div use:inview={options} oninview_enter={enter}>
    <div class="sizer relative rounded-2xl border-2 border-teal-800 bg-slate-300/90 dark:bg-slate-600/90">
        <img
            class="image"
            alt={title}
            src={values.src}
            {title}
            loading="lazy"
            class:visible={values.isLoaded}
            style="visibility: {values.shouldLoad ? 'visible' : 'hidden'}"
        />
        {#if !values.isLoaded}
            <div class="spinner absolute top-0 left-0 right-0 bottom-0 text-center content-center">
                <Spinner />
            </div>
        {/if}
    </div>
</div>
<noscript>
    <img class="sizer rounded-2xl" {src} alt={title} {title} />
</noscript>

<style>
    .sizer {
        overflow: hidden;
        aspect-ratio: var(--post-aspect);
        min-width: 100%;
    }

    .image {
        opacity: 0;
        transition: opacity 200ms ease;
    }

    .image.visible {
        opacity: 1;
    }
</style>
