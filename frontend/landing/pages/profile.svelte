<script>
    import Page from '#components/page';
    import Padding from '#components/padding';
    import State from '#state/state.svelte';
    import Spacer from '#components/spacer';
    import { translate } from '#state/translate';

    const { sessionOwner, referrer } = $props();

    State.setSessionOwner(sessionOwner);
    State.setReferrer(referrer);

    const data = $derived.by(() => {
        const sessionOwner = State.sessionOwner();
        const { username, metadata, email } = sessionOwner;
        const { gender } = metadata;

        return {
            username,
            gender,
            email,
        };
    });
</script>

<svelte:head>
    <title>{translate('messages.my_profile')} – gendly</title>
</svelte:head>

<Page>
    <Padding>
        <h3 class="text-3xl mb-3">
            {translate('messages.my_profile')}
        </h3>
        <p>{translate('messages.pages.profile.view_edit')}</p>
        <Spacer></Spacer>
        <form class="flex flex-col">
            <label for="username" class="select-none">{translate('messages.username')}</label>
            <input name="username" disabled value={data.username} class="form-element" />

            <label for="email" class="select-none">{translate('messages.email')}</label>
            <input name="email" disabled value={data.email} class="form-element" />

            <label for="gender" class="select-none">{translate('messages.gender')}</label>
            <input name="gender" disabled value={data.gender} class="form-element" />
        </form>
    </Padding>
</Page>
