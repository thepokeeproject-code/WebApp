<script>
    import Navigation from '#components/navigation';
    import Separator from '#components/separator';
    import Header from '#components/header';
    import Toaster from '#components/toaster';
    import Droplets from '#components/droplets';
    import Cookies from '#components/cookies';
    import State from '#state/state.svelte';

    const { children } = $props();

    const data = $derived.by(() => {
        return {
            isMainMenuOpen: State.isMainMenuOpen(),
        };
    });
</script>

<main id="page" class="app-width flex flex-col grow bg-slate-100/90 dark:bg-slate-700/90">
    <Header />
    <Separator />
    <article id="content" class="flex flex-col grow text-lg">
        {@render children?.()}
    </article>
    <div class:invisible={!data.isMainMenuOpen} class="backdrop"></div>
    <Navigation />
    <Toaster />
    <Cookies />
</main>
<Droplets />

<style>
    .backdrop {
        position: absolute;
        width: 100%;
        height: 100%;
        backdrop-filter: blur(3px);
        transition: all 50ms var(--easing-default);
    }
</style>
