<script>
    import { inertia, router, page } from '@inertiajs/svelte';
    import { UserGender } from '#contracts/enums';
    import Spacer from '#components/spacer';
    import Darkmode from '#components/darkmode';
    import * as Icons from '#icons/index';
    import * as Actions from '#actions/index';
    import State from '#state/state.svelte';
    import { translate } from '#state/translate';

    const values = $state({
        elWindow: null,
        elMenu: null,
    });

    const data = $derived.by(() => {
        return {
            sessionOwner: State.sessionOwner(),
            isFeed: $page.url === '/',
            isCreate: $page.url === '/create',
            isMainMenuOpen: State.isMainMenuOpen(),
            isMale: State.sessionOwner()?.metadata.gender == UserGender.MALE,
        };
    });

    const onClickOutside = (e) => {
        if (!data.isMainMenuOpen) return;
        if (values.elWindow.document.getElementById('burger')?.contains(e.target)) return;
        if (values.elMenu.contains(e.target) && !values.elMenu.isSameNode(e.target)) return;

        State.closeMainMenu();
    };
</script>

<svelte:window bind:this={values.elWindow} onclick={onClickOutside} />

<nav id="nav" class:pointer-events-none={!data.isMainMenuOpen} class="app-width">
    <div bind:this={values.elMenu} class:invisible={!data.isMainMenuOpen} class="wrapper">
        <ul
            class:isOpen={data.isMainMenuOpen}
            class="menu bg-slate-100 dark:bg-slate-700 flex flex-col p-10 pt-5 text-3xl border-l-2 border-slate-400"
        >
            <div class="closer absolute m-1 text-slate-800 dark:text-slate-200">
                <button aria-label="close" class="size-8" onclick={() => State.closeMainMenu()}>
                    <Icons.X />
                </button>
            </div>
            {#if data.sessionOwner}
                <li class="flex flex-row justify-center">
                    <button
                        class="avatar content-center"
                        onclick={() => {
                            State.closeMainMenu();
                            Actions.visitProfile();
                        }}
                    >
                        {#if data.isMale}
                            <Icons.Male />
                        {:else}
                            <Icons.Female />
                        {/if}
                    </button>
                </li>
                <li class="flex flex-row justify-center">
                    <p class="mt-2 text-base text-center">
                        <span>
                            {translate('messages.welcome', {
                                name: data.sessionOwner.username,
                            })}
                        </span>
                        <br />
                        <a class="text-base py-3" use:inertia href="/profile" onclick={() => State.closeMainMenu()}>
                            {translate('messages.my_profile')}
                        </a>
                    </p>
                </li>
                <Spacer />
                <Spacer />
                <Spacer />
                <Spacer />
                <Spacer />
                <Spacer />
            {/if}

            <li class="flex flex-row justify-center">
                <a class="py-3" use:inertia href="/" onclick={() => State.closeMainMenu()}>
                    {translate('messages.feed')}
                </a>
            </li>

            {#if data.sessionOwner}
                <li class="flex flex-row justify-center">
                    <a class="py-3" use:inertia href="/create" onclick={() => State.closeMainMenu()}>
                        {translate('messages.create')}
                    </a>
                </li>
            {/if}

            <!--
            {#if data.sessionOwner}
                <li class="flex flex-row justify-center">
                    <a
                        class="py-3"
                        use:inertia
                        href="/create2"
                        onclick={() => State.closeMainMenu()}
                    >
                        Create Video
                    </a>
                </li>
            {/if}
            -->

            {#if !data.sessionOwner}
                <li class="flex flex-row justify-center">
                    <a class="py-3" use:inertia href="/signup" onclick={() => State.closeMainMenu()}>
                        {translate('messages.signup')}
                    </a>
                </li>
                <li class="flex flex-row justify-center">
                    <a class="py-3" use:inertia href="/login" onclick={() => State.closeMainMenu()}>
                        {translate('messages.login')}
                    </a>
                </li>
            {/if}

            <li class="flex flex-row grow"></li>

            {#if data.sessionOwner}
                <li class="flex flex-row justify-center items-center">
                    <button class="link py-3 text-base" onclick={() => Actions.logout()}>
                        {translate('messages.logout')}
                    </button>
                    <div class="size-5 ml-1">
                        <Icons.Logout />
                    </div>
                </li>
            {/if}

            <div class="border-t my-3 border-slate-300 dark:border-slate-500 h-1"></div>
            <li class="flex flex-row justify-center">
                <Darkmode />
            </li>
            <div class="border-t my-3 border-slate-300 dark:border-slate-500 h-1"></div>

            <li class="flex flex-row justify-center text-sm">
                <a class="py-2" use:inertia href="/welcome" onclick={() => State.closeMainMenu()}>
                    {translate('messages.home')}
                    <span class="inline-block size-3">
                        <Icons.External />
                    </span>
                </a>
            </li>
            <li class="flex flex-row justify-center text-sm">
                <a class="py-2" use:inertia href="/imprint" onclick={() => State.closeMainMenu()}>
                    {translate('messages.imprint')}
                    <span class="inline-block size-3">
                        <Icons.External />
                    </span>
                </a>
            </li>
            <li class="flex flex-row justify-center text-sm">
                <a class="py-2" use:inertia href="/privacy" onclick={() => State.closeMainMenu()}>
                    {translate('messages.privacy')}
                    <span class="inline-block size-3">
                        <Icons.External />
                    </span>
                </a>
            </li>
            <li class="flex- flex-row justify-center text-sm mt-4">
                <p class="text-center">© 2025 gendly</p>
            </li>
        </ul>
        <div class="darkmode absolute"></div>
    </div>
</nav>

<style>
    #nav {
        position: fixed;
        width: 100%;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        overflow: hidden;
    }

    .wrapper {
        width: 100%;
        height: 100%;
    }

    .menu {
        position: absolute;
        top: 0;
        bottom: 0;
        right: -100%;
        height: 100%;
        padding-top: 6rem;
        transition: right 200ms var(--easing-default);
    }

    .darkmode {
        right: 1.5rem;
        bottom: 1.5rem;
    }

    .link {
        text-align: inherit;
    }

    .closer {
        top: 1.5rem;
        right: 1.5rem;
    }

    .avatar {
        width: 6rem;
        aspect-ratio: 1;
        overflow: hidden;
        border-radius: 100%;
        border: 0.125rem solid var(--color-slate-400);
        outline: var(--color-slate-600);
        outline-style: solid;
        outline-offset: -0.25rem;
        outline-width: 0.125rem;
    }

    .isOpen {
        right: 0;
    }
</style>
