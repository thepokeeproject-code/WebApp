<script>
    import { onMount } from 'svelte';
    import { scrollElement } from 'svelte-scrolling';
    import * as Icons from '#icons/index';

    const values = $state({
        isOpen: false,
        elButton: null,
        elWindow: null,
        elMenu: null,
    });

    const onToggle = (e) => {
        values.isOpen = !values.isOpen;
    };

    const onSelect = (e) => {
        values.isOpen = false;

        const id = e.currentTarget.getAttribute('href');

        e.preventDefault();
        scrollElement(id);
    };

    const onClickOutside = (e) => {
        if (values.elButton.contains(e.target)) return;
        if (values.elMenu.contains(e.target)) return;

        values.isOpen = false;
    };

    onMount(() => {
        values.elMenu = values.elWindow.document.getElementById('nav-mobile');
    });

    $effect(() => {
        values.elMenu.classList.toggle('translate-x-0', values.isOpen);
        values.elMenu.classList.toggle('translate-x-full', !values.isOpen);
    });
</script>

<svelte:window bind:this={values.elWindow} onclick={onClickOutside} />

<div class="md:hidden ml-auto">
    <button bind:this={values.elButton} onclick={onToggle} class="p-2 focus:outline-none size-12" aria-label="menu">
        <Icons.Hamburger />
    </button>
    <div
        id="nav-mobile"
        class="fixed top-0 right-0 w-64 max-h-screen overflow-y-auto bg-white shadow-lg transform translate-x-full transition-transform duration-300 z-50 md:hidden p-6"
    >
        <a
            href="/"
            target="_self"
            rel="noopener noreferrer"
            class="block w-full text-sm font-medium text-white bg-green-500 hover:bg-green-600 rounded-full px-4 py-2 mb-4 text-center transition"
        >
            Zur App
        </a>

        <a
            onclick={onSelect}
            href="#about"
            id="linkUeberMobile"
            class="block w-full text-left text-sm font-bold text-black hover:underline focus:outline-none mb-2"
        >
            Über gendly
        </a>
        <a
            onclick={onSelect}
            href="#privacy"
            class="block w-full text-left text-sm font-bold text-black hover:underline focus:outline-none mb-2"
        >
            Datenschutz
        </a>
        <a
            onclick={onSelect}
            href="#features"
            class="block w-full text-left text-sm font-bold text-black hover:underline focus:outline-none mb-2"
        >
            Features
        </a>
        <a
            onclick={onSelect}
            href="#pricing"
            class="block w-full text-left text-sm font-bold text-black hover:underline focus:outline-none mb-2"
        >
            Preise
        </a>
        <a
            onclick={onSelect}
            href="#faq"
            class="block w-full text-left text-sm font-bold text-black hover:underline focus:outline-none mb-2"
        >
            FAQ
        </a>
    </div>
</div>
