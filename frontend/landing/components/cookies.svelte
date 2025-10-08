<script>
    import Cookies from 'js-cookie';
    import { translate } from '#state/translate';

    const cookieName = 'cookie-consent-necessary';
    const values = $state({
        isAlreadySeen: null,
    });

    const onClose = () => {
        Cookies.set(cookieName, 'y', { expires: 365 });
        values.isAlreadySeen = true;
    };

    $effect.pre(() => {
        values.isAlreadySeen = Cookies.get(cookieName) === 'y';
    });
</script>

{#if !values.isAlreadySeen}
    <div
        id="cookies"
        class="select-none border-t-1 p-4 text-center bg-slate-100 border-slate-200 text-slate-700 dark:bg-slate-700 dark:border-slate-900 dark:text-slate-400"
    >
        <div class="flex flex-row grow shrink justify-center items-center">
            <div class="flex flex-col">
                {translate('messages.cookies.essential')}<br />
                {translate('messages.cookies.no_tracking')}
            </div>
            <div class="flex flex-col ml-3">
                <button class="form-element" onclick={onClose}>
                    {translate('messages.cookies.close')}
                </button>
            </div>
        </div>
    </div>
{/if}

<style>
    #cookies {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
    }
</style>
