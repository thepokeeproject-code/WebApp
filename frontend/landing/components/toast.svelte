<script>
    import { router } from '@inertiajs/svelte';
    import { onMount, onDestroy } from 'svelte';
    import * as Icons from '#icons/index';
    import * as Actions from '#actions/index';
    import State from '#state/state.svelte';

    const { id } = $props();
    let timeout = $state(null);

    const data = $derived.by(() => {
        const toast = State.toastById(id) ?? {};
        const Icon = Icons[toast.icon];

        return {
            toast,
            Icon,
        };
    });

    const onClick = () => {
        Actions.scrollIntoView(data.toast.scrollToId);
        Actions.toastDelete(data.toast.id);
    };

    const onClose = (e) => {
        e.stopPropagation();
        Actions.toastDelete(data.toast.id);
    };

    onMount(() => {
        if (data.toast.duration !== false) {
            timeout = window.setTimeout(() => {
                Actions.toastDelete(data.toast.id);
            }, data.toast.duration);
        }
    });

    onDestroy(() => {
        window.clearTimeout(timeout);

        // Hooking into router.on('navigate') is unreliable to clean up toasts
        // Therefore we use this place, because on page changes
        // all toasts are destroyed (and then re-mounted)

        if (data.toast.closeOnNavigate) {
            Actions.toastDelete(data.toast.id);
        }
    });
</script>

<button
    id="toaster{data.toast.id}"
    class="rounded-[2rem] pl-3 pr-4 py-2 bg-slate-100 dark:bg-slate-500 text-slate-800 dark:text-slate-100 shadow flex flex-row mb-2 shrink mx-auto select-none"
    onclick={onClick}
>
    <div class="flex flex-col justify-center mr-1">
        <div class="size-6" style="color: {data.toast.color};">
            <data.Icon />
        </div>
    </div>
    <div class="flex flex-row items-center justify-center">
        {#if data.toast.text}
            <p class="text-md leading-5">
                {data.toast.text}
            </p>
        {:else if data.toast.html}
            <p class="text-md leading-5">
                {@html data.toast.html}
            </p>
        {/if}
    </div>
    <div class="flex flex-col justify-center ml-2">
        <div
            class="size-4 rounded-full bg-slate-200 dark:bg-slate-400"
            onclick={onClose}
            role="button"
            tabindex="0"
            onkeydown={onClose}
        >
            <Icons.X />
        </div>
    </div>
</button>

<style>
    button {
        pointer-events: all;
    }
</style>
