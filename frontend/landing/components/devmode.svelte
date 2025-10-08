<script>
    import { onMount } from 'svelte';
    import State from '#state/state.svelte';
    import * as Actions from '#actions/index';

    const values = $state({
        elWindow: null,
    });

    const toast = () => {
        Actions.toastCreate({
            id: 'posts-pending',
            icon: 'Info',
            text: 'Scroll up to see new posts!',
            scrollToId: 'posts-hint',
            duration: false,
        });
    };

    const post = () => {
        const posts = State.posts();
        const keys = Object.keys(posts);
        const first = posts[keys[0]];

        State.appendIncomingPost(first);
    };

    const log = () => {
        console.log($state.snapshot(State.get()));
    };

    onMount(() => {
        values.elWindow.debug = {
            toast,
            post,
            log,
        };
    });
</script>

<svelte:window bind:this={values.elWindow} />
