<script>
    import Navigation from '#components/navigation';
    import Back from '#components/back';
    import Burger from '#components/burger';
    import Toaster from '#components/toaster';
    import Droplets from '#components/droplets';
    import Cookies from '#components/cookies';
    import DevMode from '#components/devmode';
    import State from '#state/state.svelte';

    const { children } = $props();

    const data = $derived.by(() => {
        return {
            isMainMenuOpen: State.isMainMenuOpen(),
        };
    });
</script>

<main id="page" class="app-width flex flex-col grow">
    <article id="content" class="flex flex-col grow text-lg" style:filter={data.isMainMenuOpen ? 'blur(3px)' : 'none'}>
        {@render children?.()}
    </article>
    <Back />
    <Burger />
    <Navigation />
    <Toaster />
    <Cookies />
    <DevMode />
</main>
<Droplets />

<style>
    article {
        transition: filter 150ms linear;
    }
</style>
