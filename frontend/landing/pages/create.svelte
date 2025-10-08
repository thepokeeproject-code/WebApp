<script>
    import { inertia, router } from '@inertiajs/svelte';
    import { onMount } from 'svelte';
    import TrueCropper from 'truecropper/dist/truecropper.es.js';
    import 'truecropper/dist/truecropper.css';
    import { Dropzone } from 'flowbite-svelte';
    import Page from '#components/page';
    import Padding from '#components/padding';
    import Spacer from '#components/spacer';
    import * as Icons from '#icons/index';
    import imageSizes from '#contracts/image_sizes';
    import State from '#state/state.svelte';
    import { translate } from '#state/translate';
    import { pickAll } from 'ramda';

    // https://flowbite-svelte.com/docs/forms/file-input#dropzone

    const { errors = {}, sessionOwner, referrer } = $props();

    State.setSessionOwner(sessionOwner);
    State.setReferrer(referrer);

    const values = $state({
        title: null,
        image: null,
        src: null,
        cropperInstance: null,
        left: null,
        top: null,
        width: null,
        height: null,
        error: null,
        isLoading: null,
        progress: null,
    });

    const reset = () => {
        URL.revokeObjectURL(values.src);

        values.src = null;
        values.cropperInstance = null;
        values.left = null;
        values.top = null;
        values.width = null;
        values.height = null;
        values.isLoading = null;
        values.progress = null;
        values.image = null;
    };

    const initCropper = (values) => {
        values.cropperInstance = new TrueCropper('#cropper', {
            aspectRatio: 9 / 16,
            maxSize: {
                width: 100,
                height: 100,
                unit: 'percent',
            },
            minSize: {
                width: imageSizes.minWidth,
                height: imageSizes.minHeight,
                unit: 'real',
            },
            allowFlip: false,
            onInitialize(instance, data) {
                updateValues(values, data);
            },
            onCropChange(instance, data) {
                updateValues(values, data);
            },
            onError(instance, data) {
                reset();
                values.error = translate('messages.errors.image_dimensions', {
                    w: imageSizes.minWidth,
                    h: imageSizes.minHeight,
                });
            },
        });
    };

    const updateValues = (values, data) => {
        values.left = data.x;
        values.top = data.y;
        values.width = data.width;
        values.height = data.height;
    };

    const onDrop = (event) => {
        event.preventDefault();
        values.image = event.dataTransfer?.files[0] ?? null;
    };

    const onRemove = (event) => {
        values.error = null;
        values.image = null;
    };

    const submitForm = (e) => {
        e.preventDefault();

        const data = pickAll(['title', 'image', 'left', 'top', 'width', 'height'], values);

        router.post('/posts', data, {
            onStart: () => {
                values.isLoading = true;
            },
            onProgress: (e) => {
                values.progress = e.percentage;
            },
            onFinish: () => {
                values.isLoading = false;
            },
            onError: (errors) => {
                // Some other error than title error occurred
                if (!errors.title) {
                    values.error = errors.image || translate('messages.errors.generic_error');
                }
            },
        });
    };

    $effect(() => {
        const size = imageSizes.fileSizeMb;
        const image = values.image;

        const hasFile = !!image;
        const isImage = image?.type?.startsWith('image');
        const isWithinLimit = image?.size / 1024 / 1024 <= size;

        if (!hasFile) {
            reset();
        } else if (!isWithinLimit) {
            reset();
            values.error = translate('messages.errors.image_size', { size });
        } else if (!isImage) {
            reset();
            values.error = translate('messages.errors.image_type');
        } else {
            values.error = null;
            values.src = URL.createObjectURL(image);
            initCropper(values);
        }
    });
</script>

<svelte:head>
    <title>{translate('messages.pages.create')} – gendly</title>
</svelte:head>

<Page>
    <Padding>
        <h3 class="text-3xl mb-3">{translate('messages.pages.create')}</h3>
        <p>{translate('messages.pages.create.find_out')}</p>
        <Spacer></Spacer>
        <form onsubmit={submitForm} class="flex flex-col">
            <label for="title" class="select-none">
                {translate('messages.title')}
            </label>
            <input id="title" class="form-element" name="title" bind:value={values.title} />
            {#if errors.title}
                <Spacer></Spacer>
                <p class="form-error">{errors.title}</p>
            {/if}

            <label for="image" class="select-none">
                {translate('messages.image')}
            </label>
            {#if !values.image}
                <Dropzone
                    id="dropzone"
                    class="h-[400px] border-0 dark:hover:bg-slate-600 bg-slate-300 dark:bg-slate-500 hover:bg-slate-200 hover:border-slate-300 hover:border-2 border-dashed"
                    bind:files={() => null, (f) => (values.image = f[0])}
                    ondrop={onDrop}
                >
                    <div class="size-12 mb-2 text-slate-800 dark:text-slate-400">
                        <Icons.Upload />
                    </div>
                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span class="font-semibold">
                            {translate('messages.pages.create.click_upload')}
                        </span>
                        <br />
                        <span>
                            {translate('messages.pages.create.or_drag_drop')}
                        </span>
                    </p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                        {translate('messages.ui.image_formats_size', {
                            w: imageSizes.minWidth,
                            h: imageSizes.minHeight,
                        })}
                    </p>
                </Dropzone>
            {:else}
                <div class="relative rounded-md overflow-hidden">
                    <div class="truecropper">
                        <img class="image" alt="cropper" src={values.src} id="cropper" />
                    </div>
                    <button class="button-round size-8! absolute top-[1rem] right-[1rem]" onclick={onRemove}>
                        <Icons.X />
                    </button>
                </div>
            {/if}

            {#if values.error}
                <Spacer></Spacer>
                <p class="form-error">{values.error}</p>
            {/if}

            <Spacer></Spacer>
            <Spacer></Spacer>

            <button
                class="form-element"
                type="submit"
                disabled={values.error || !values.image || !values.title || values.isLoading}
            >
                {#if !values.isLoading}
                    {translate('messages.actions.post')}
                {:else}
                    {translate('messages.pages.create.posting', {
                        percent: values.progress,
                    })}
                {/if}
            </button>
        </form>
    </Padding>
</Page>

<style>
    .image {
        max-height: 600px;
    }
</style>
