<script>
    import { inertia, router, page } from '@inertiajs/svelte';
    import * as Icons from '#icons/index';
    import State from '#state/state.svelte';
</script>

<header id="header" class="flex flex-row items-center" dir="ltr">
    <div class="grow py-2 ps-8">
        <div class="name text-5xl italic font-bold select-none">
            <a use:inertia href="/">gendly</a>
        </div>
    </div>
    <div class="shrink pe-5">
        <button id="burger" class="size-8 content-center" onclick={() => State.openMainMenu()}>
            <Icons.Hamburger />
        </button>
    </div>
</header>

<style>
    .name {
        letter-spacing: -0.1rem;
    }
</style>
