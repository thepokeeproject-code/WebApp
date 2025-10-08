<script>
    import Toast from '#components/toast';
    import State from '#state/state.svelte';

    const toasts = $derived(State.toasts());
</script>

<div id="toaster" class="app-width">
    <div class="absolute flex flex-col mx-auto">
        {#each toasts as toast}
            <Toast id={toast.id} />
        {/each}
    </div>
</div>

<style>
    #toaster {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
    }

    #toaster > div {
        top: 1.5rem;
        left: 0;
        right: 0;
        pointer-events: none;
    }
</style>
