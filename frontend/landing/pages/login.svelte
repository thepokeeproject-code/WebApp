<script>
    import { inertia, router, useForm } from '@inertiajs/svelte';
    import Page from '#components/page';
    import Padding from '#components/padding';
    import Spacer from '#components/spacer';
    import { translate } from '#state/translate';

    const form = useForm({
        email: null,
        password: null,
        rememberMe: true,
    });

    const submitForm = (e) => {
        e.preventDefault();
        $form.post('/session/create');
    };
</script>

<svelte:head>
    <title>{translate('messages.login')} – gendly</title>
</svelte:head>

<Page>
    <Padding>
        <h3 class="text-3xl mb-3">{translate('messages.login')}</h3>
        <p>{translate('messages.pages.login')}</p>
        <p>
            <span>{translate('messages.pages.login.or')}</span>
            <a use:inertia href="/signup">
                {translate('messages.pages.login.create_account')}
            </a>.
        </p>
        <Spacer></Spacer>
        <form onsubmit={submitForm} class="flex flex-col">
            <label for="email" class="select-none">
                {translate('messages.email')}
            </label>
            <input id="email" class="form-element" type="email" bind:value={$form.email} />

            <label for="password" class="select-none">
                {translate('messages.password')}
            </label>
            <input id="password" class="form-element" type="password" bind:value={$form.password} />

            <Spacer></Spacer>

            <label class="inline-flex items-center mb-5 cursor-pointer">
                <input bind:checked={$form.rememberMe} type="checkbox" class="sr-only peer" />
                <div
                    class="relative w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-slate-400 dark:peer-focus:ring-slate-300 rounded-full peer dark:bg-slate-500 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-slate-600 peer-checked:bg-blue-400 dark:peer-checked:bg-blue-400"
                ></div>
                <span class="ms-3 text-base">
                    {translate('messages.remember_me')}
                </span>
            </label>

            <Spacer></Spacer>
            <Spacer></Spacer>

            <button class="form-element" type="submit">
                {translate('messages.login')}
            </button>

            {#if $form.hasErrors}
                <Spacer></Spacer>
                <p class="form-error">
                    {translate('messages.errors.email_password_incorrect')}
                </p>
            {/if}
        </form>
    </Padding>
</Page>
