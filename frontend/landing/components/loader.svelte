<script>
    import axios from 'axios';
    import { inertia } from '@inertiajs/svelte';
    import { inview } from 'svelte-inview';
    import * as Actions from '#actions/index';
    import * as Icons from '#icons/index';
    import Pagehint from '#components/pagehint';
    import Spinner from '#components/spinner';
    import State from '#state/state.svelte';
    import { translate } from '#state/translate';

    const { pagingInfo, nextPageUrl, onSuccess = () => {}, onError = () => {} } = $props();

    const data = $derived.by(() => {
        const info = pagingInfo();
        const hasNextPage = !!info?.nextPageUrl;
        const url = info && nextPageUrl(info);

        return {
            hasNextPage,
            url,
        };
    });

    const values = $state({
        isVisible: false,
        isPending: false,
    });

    const leave = (e) => {
        if (!e.detail.inView) values.isVisible = false;
    };

    const enter = (e) => {
        if (e.detail.inView) values.isVisible = true;

        // Already fetching
        if (values.isPending) return;

        // Already at the end
        if (!data.hasNextPage) return;

        values.isPending = true;

        axios
            .get(data.url, { withCredentials: false })
            .then((res) => {
                onSuccess(res);

                values.isPending = false;
            })
            .catch((e) => {
                onError(e);

                values.isPending = false;

                Actions.toastCreate({
                    icon: 'Warning',
                    text: translate('messages.errors.generic_error'),
                });
            });
    };
</script>

<div
    id="loader"
    use:inview
    oninview_enter={enter}
    oninview_leave={leave}
    oninview_init={leave}
    class="p-5 flex flex-col items-center"
>
    {#if values.isPending}
        <Pagehint>
            {translate('messages.ui.loading_more')}
        </Pagehint>
        <div class="snap-end text-center p-4">
            <Spinner />
        </div>
    {:else if !data.hasNextPage}
        <Pagehint>
            {translate('messages.ui.reached_end')}
        </Pagehint>
    {/if}
</div>
