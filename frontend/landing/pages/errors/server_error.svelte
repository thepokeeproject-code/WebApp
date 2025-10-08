<script>
    import Page from '#components/page';
    import Padding from '#components/padding';
    import { translate } from '#state/translate';

    const { error } = $props();
</script>

<svelte:head>
    <title>{translate('messages.error')} – gendly</title>
</svelte:head>

<Page>
    <Padding>
        <h3 class="text-3xl mb-3">
            {translate('messages.error')}
        </h3>
        <p>{translate('messages.errors.server_error')}</p>
        <p>{error.message}</p>
    </Padding>
</Page>
