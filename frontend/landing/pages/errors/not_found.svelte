<script>
    import Page from '#components/page';
    import Padding from '#components/padding';
    import { translate } from '#state/translate';
</script>

<svelte:head>
    <title>{translate('messages.error')} – gendly</title>
</svelte:head>

<Page>
    <Padding>
        <h3 class="text-3xl mb-3">
            {translate('messages.error')}
        </h3>
        <p>{translate('messages.errors.not_found')}</p>
    </Padding>
</Page>
