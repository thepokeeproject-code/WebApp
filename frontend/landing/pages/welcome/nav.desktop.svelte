<script>
    import { scrollElement } from 'svelte-scrolling';

    const values = $state({
        elWindow: null,
    });

    const onSelect = (e) => {
        values.isOpen = false;

        const id = e.currentTarget.getAttribute('href');

        e.preventDefault();
        scrollElement(id);
    };
</script>

<svelte:window bind:this={values.elWindow} />

<div id="nav-desktop" class="hidden md:flex flex-1 justify-center items-center space-x-6">
    <a onclick={onSelect} href="#about" class="text-sm font-bold text-black hover:underline focus:outline-none">
        Über gendly
    </a>
    <a onclick={onSelect} href="#privacy" class="text-sm font-bold text-black hover:underline focus:outline-none">
        Datenschutz
    </a>
    <a onclick={onSelect} href="#features" class="text-sm font-bold text-black hover:underline focus:outline-none">
        Features
    </a>
    <a onclick={onSelect} href="#pricing" class="text-sm font-bold text-black hover:underline focus:outline-none">
        Preise
    </a>
    <a onclick={onSelect} href="#faq" class="text-sm font-bold text-black hover:underline focus:outline-none"> FAQ </a>
</div>
<div class="relative ml-auto hidden md:flex">
    <a
        href="/"
        target="_self"
        rel="noopener noreferrer"
        class="bg-green-500 text-white px-5 py-2 rounded-full hover:bg-green-600 transition flex items-center"
    >
        Zur App
    </a>
</div>
