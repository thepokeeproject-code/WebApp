<script>
    import { inertia, router, page } from '@inertiajs/svelte';
    import * as Icons from '#icons/index';
    import State from '#state/state.svelte';
</script>

<div class="wrapper app-width">
    <div class="flex shrink absolute">
        <button id="burger" class="button-round" onclick={() => State.openMainMenu()}>
            <Icons.Hamburger />
        </button>
    </div>
</div>

<style>
    .wrapper {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
    }

    .wrapper > div {
        top: calc(var(--post-margin-top) + 1.5rem);
        right: 1.5rem;
    }
</style>
