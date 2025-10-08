<script>
    import { onMount, onDestroy } from 'svelte';
    import * as Actions from '#actions/index';
    import State from '#state/state.svelte';
    import { translate } from '#state/translate';

    const settingName = 'color-theme';

    const values = $state({
        isDarkMode: null,
        isMounted: false,
    });

    $effect(() => {
        if (!values.isMounted) return;

        const cls = document.documentElement.classList;

        if (values.isDarkMode) {
            cls.add('dark');
            localStorage.setItem(settingName, 'dark');
        } else {
            cls.remove('dark');
            localStorage.setItem(settingName, 'light');
        }
    });

    onMount(() => {
        const hasPreference = settingName in localStorage;
        const isDark = localStorage.getItem(settingName) === 'dark';
        const osIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        values.isDarkMode = isDark || (!hasPreference && osIsDark);
        values.isMounted = true;
    });
</script>

<label class="inline-flex items-center mb-5 cursor-pointer">
    <input bind:checked={values.isDarkMode} type="checkbox" class="sr-only peer" />
    <div
        class="relative w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-slate-400 dark:peer-focus:ring-slate-300 rounded-full peer dark:bg-slate-500 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-slate-600 peer-checked:bg-blue-400 dark:peer-checked:bg-blue-400"
    ></div>
    <span class="ms-3 text-base">
        {translate('messages.ui.darkmode')}
    </span>
</label>
