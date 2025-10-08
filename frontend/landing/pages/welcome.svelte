<script>
    import { inertia } from '@inertiajs/svelte';
    import { onMount } from 'svelte';
    import { setGlobalOptions } from 'svelte-scrolling';
    import AOS from 'aos';
    import 'aos/dist/aos.css';
    import './welcome/splash.css';
    import Header from '#pages/welcome/header';
    import About from '#pages/welcome/about';
    import How from '#pages/welcome/how';
    import Solution from '#pages/welcome/solution';
    import Steps from '#pages/welcome/steps';
    import Privacy from '#pages/welcome/privacy';
    import Features from '#pages/welcome/features';
    import Pricing from '#pages/welcome/pricing';
    import Faq from '#pages/welcome/faq';
    import Footer from '#pages/welcome/footer';
    import NavMobile from '#pages/welcome/nav.mobile';
    import NavDesktop from '#pages/welcome/nav.desktop';
    import Cookies from '#components/cookies';
    import { translate } from '#state/translate';

    onMount(() => {
        AOS.init({
            duration: 500,
        });

        setGlobalOptions({
            duration: 500,
        });
    });
</script>

<svelte:head>
    <title>{translate('messages.pages.welcome')} – gendly</title>
</svelte:head>

<div class="bg-teal-50 text-gray-800 z-0">
    <nav class="w-full px-6 py-4 flex items-center fixed top-0 bg-teal-50 shadow z-50">
        <div class="flex items-center space-x-6">
            <div class="text-3xl italic font-bold select-none">gendly</div>
        </div>
        <NavDesktop />
        <NavMobile />
    </nav>
    <div class="h-20"></div>
    <Header />
    <About />
    <How />
    <Solution />
    <Steps />
    <Privacy />
    <Features />
    <Pricing />
    <Faq />
    <Footer />
    <Cookies />
</div>
