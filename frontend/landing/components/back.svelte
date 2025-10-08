<script>
    import { page } from '@inertiajs/svelte';
    import * as Icons from '#icons/index';
    import * as Actions from '#actions/index';
    import State from '#state/state.svelte';
    import { onMount } from 'svelte';
    import throttle from 'lodash/throttle';

    const values = $state({
        elWindow: null,
        btnSelf: null,
        btnInline: null,
        isVisible: false,
    });

    const onScroll = () => {
        if ($page.component !== 'post') return;
        if (!values.btnInline) return;

        const topInline = values.btnInline.getBoundingClientRect().top;
        const topSelf = values.btnSelf.getBoundingClientRect().top;

        values.isVisible = topSelf > topInline;
    };

    onMount(() => {
        const htmlBody = values.elWindow.document.body;
        values.btnInline = htmlBody.querySelector('.feed > button');
    });
</script>

<svelte:window bind:this={values.elWindow} on:scroll={throttle(onScroll, 100)} />

<div id="back" class="app-width">
    <div class="flex shrink absolute" class:invisible={!values.isVisible}>
        <button bind:this={values.btnSelf} class="button-round" onclick={(e) => Actions.historyBack(e, '/')}>
            <Icons.X />
        </button>
    </div>
</div>

<style>
    #back {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
    }

    #back > div {
        top: calc(var(--post-margin-top) + 8.5rem);
        right: 1.5rem;
    }
</style>
