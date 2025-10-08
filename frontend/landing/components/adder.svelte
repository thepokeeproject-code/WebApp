<script>
    import { router } from '@inertiajs/svelte';
    import * as Icons from '#icons/index';
    import * as Actions from '#actions/index';
</script>

<div id="adder" class="app-width">
    <div class="flex shrink absolute">
        <button class="button-round" onclick={() => Actions.visitCreate()}>
            <Icons.Plus />
        </button>
    </div>
</div>

<style>
    #adder {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
    }

    #adder > div {
        top: calc(var(--post-margin-top) + 5rem);
        right: 1.5rem;
    }
</style>
