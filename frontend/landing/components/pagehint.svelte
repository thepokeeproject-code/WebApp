<script>
    const { children } = $props();
</script>

<div
    class="select-none text-sm text-slate-500 bg-slate-300 dark:bg-slate-600 dark:text-slate-200 py-2 px-4 rounded-full"
>
    {@render children?.()}
</div>
