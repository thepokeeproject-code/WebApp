<script>
    import { inertia, router, useForm } from '@inertiajs/svelte';
    import Page from '#components/page';
    import Padding from '#components/padding';
    import Spacer from '#components/spacer';
    import { UserGender } from '#contracts/enums';
    import { translate } from '#state/translate';

    const form = useForm({
        email: null,
        password: null,
        passwordConfirm: null,
        username: null,
        gender: Object.values(UserGender).at(0),
    });

    const submitForm = (e) => {
        e.preventDefault();
        $form.post('/users');
    };
</script>

<svelte:head>
    <title>{translate('messages.signup')} – gendly</title>
</svelte:head>

<Page>
    <Padding>
        <h3 class="text-3xl mb-3">{translate('messages.signup')}</h3>
        <p>{translate('messages.pages.signup.create_account')}</p>
        <p>
            <span>{translate('messages.pages.signup.or')}</span>
            <a use:inertia href="/login">
                {translate('messages.pages.signup.login_here')}
            </a>
        </p>
        <Spacer></Spacer>
        <form onsubmit={submitForm} class="flex flex-col">
            <label for="email" class="select-none">{translate('messages.email')}</label>
            <input id="email" class="form-element" name="email" type="email" bind:value={$form.email} />
            {#if $form.errors.email}
                <Spacer></Spacer>
                <p class="form-error">{$form.errors.email}</p>
            {/if}

            <label for="password" class="select-none">{translate('messages.password')}</label>
            <input id="password" class="form-element" name="password" type="password" bind:value={$form.password} />
            <label for="password-confirm" class="select-none">
                {translate('messages.pages.signup.password_confirm')}
            </label>
            <input
                id="passwordConfirm"
                class="form-element"
                name="passwordConfirm"
                type="password"
                bind:value={$form.passwordConfirm}
            />
            {#if $form.errors.password}
                <Spacer></Spacer>
                <p class="form-error">{$form.errors.password}</p>
            {/if}

            <label for="username" class="select-none">
                {translate('messages.username')}
            </label>
            <input id="username" class="form-element" name="username" bind:value={$form.username} />
            {#if $form.errors.username}
                <Spacer></Spacer>
                <p class="form-error">{$form.errors.username}</p>
            {/if}

            <label for="gender" class="select-none">{translate('messages.gender')}</label>
            <select id="gender" class="form-element" name="gender" bind:value={$form.gender}>
                {#each Object.values(UserGender) as gender}
                    <option selected={gender === $form.gender} value={gender}>
                        {translate(`messages.${gender}`)}
                    </option>
                {/each}
            </select>
            {#if $form.errors.gender}
                <Spacer></Spacer>
                <p class="form-error">{$form.errors.gender}</p>
            {/if}

            <Spacer></Spacer>
            <Spacer></Spacer>

            <button class="form-element" type="submit">
                {translate('messages.actions.sign_up')}
            </button>
        </form>
    </Padding>
</Page>
