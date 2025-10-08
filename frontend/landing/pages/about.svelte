<script>
    import { inertia } from '@inertiajs/svelte';
    import Page from '#components/page';
    import Padding from '#components/padding';
    import State from '#state/state.svelte';

    const { sessionOwner, referrer } = $props();

    State.setSessionOwner(sessionOwner);
    State.setReferrer(referrer);
</script>

<svelte:head>
    <title>About – gendly</title>
</svelte:head>

<Page>
    <Padding>
        <h3 class="text-3xl mb-3">About</h3>
        <p>Welcome to gendly. The truly social platform.</p>
    </Padding>
</Page>
