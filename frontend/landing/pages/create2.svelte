<script>
    import { inertia, router } from '@inertiajs/svelte';
    import { Dropzone } from 'flowbite-svelte';
    import Page from '#components/page';
    import Padding from '#components/padding';
    import Spacer from '#components/spacer';
    import * as Icons from '#icons/index';
    import imageSizes from '#contracts/image_sizes';
    import State from '#state/state.svelte';

    // https://flowbite-svelte.com/docs/forms/file-input#dropzone

    const { errors = {}, sessionOwner, referrer } = $props();

    State.setSessionOwner(sessionOwner);
    State.setReferrer(referrer);

    const cropErrors = $state({});

    const values = $state({
        title: null,
        elFrame: null,
        elVideo: null,
        srcVideo: null,
        fileVideo: null,
        duration: null,
        height: null,
        width: null,
        widthCropped: null,
        heightClient: null,
        widthClient: null,
    });

    const dragger = $state({
        drag: false,
        style: '',
        info: {},
        crop: { x: 0, y: 0 },
        rect: null,
        offX: null,
        offY: null,
    });

    const rangers = $state({
        start: null,
        end: null,
        progress: null,
    });

    const percent = (value, total) => {
        return (value * 100) / total;
    };

    const data = $derived.by(() => {
        const { duration } = values;
        const { start, end, progress } = rangers;
        const range = Math.max(end - start, 0);
        const startPercent = percent(start, duration);
        const endPercent = percent(end, duration);
        const rangePercent = percent(range, duration);
        const progressPercent = percent(progress, duration);

        // Take into account the thumb size
        // because the html range input is visually inaccurate.
        // Without this the shader area would not match
        // the tips of the thumbs.
        // const offsetStart = (32 * startPercent) / 100;
        // const offsetEnd = (32 * (100 - endPercent)) / 100;
        const offsetStart = 0;
        const offsetEnd = 0;

        const styleShader = `
            left: calc(${startPercent}% - ${offsetStart}px);
            right: calc(100% - ${endPercent}% - ${offsetEnd}px);
        `;

        const info = parseFloat(progress).toFixed(2);

        return {
            styleShader,
            range,
            info,
        };
    });

    $effect(() => {
        values.fileVideo ? setVideo(values) : resetVideo(values);
    });

    const onDrop = (event) => {
        event.preventDefault();
        values.fileVideo = event.dataTransfer?.files[0] ?? null;
    };

    const onRemove = (event) => {
        values.fileVideo = null;
    };

    const resetVideo = function (values) {
        URL.revokeObjectURL(values.srcVideo);

        values.srcVideo = null;
    };

    const setVideo = function (values) {
        const videoUrl = URL.createObjectURL(values.fileVideo);

        values.srcVideo = videoUrl;
    };

    const onMetadata = () => {
        values.duration = Math.floor(values.elVideo.duration);
        values.height = values.elVideo.videoHeight;
        values.width = values.elVideo.videoWidth;
        values.widthCropped = (values.height * 9) / 16;
        values.heightClient = values.elVideo.clientHeight;
        values.widthClient = values.elVideo.clientWidth;

        rangers.start = 0;
        rangers.end = values.duration;
    };

    const debounce = (callback, wait) => {
        let timeoutId = null;
        return (...args) => {
            window.clearTimeout(timeoutId);
            timeoutId = window.setTimeout(() => {
                callback(...args);
            }, wait);
        };
    };

    const onTimeUpdate = (e) => {
        const progress = e.target.currentTime;

        requestAnimationFrame(() => {
            rangers.progress = progress;
        });
    };

    const onDblClickVideo = (e) => {
        if (values.elVideo.paused) values.elVideo.play();
        else values.elVideo.pause();
    };

    const onMouseMove = (e) => {
        if (!dragger.drag) return;

        const { x, y } = e;
        const { canMoveX, canMoveY, leftMin, leftMax, topMin, topMax } = dragger.info;

        const xDiff = x - dragger.rect.left - dragger.offX;
        const yDiff = y - dragger.rect.top - dragger.offY;

        const moveX = canMoveX ? Math.min(Math.max(leftMin, xDiff), leftMax) : 0;

        const moveY = canMoveY ? Math.min(Math.max(topMin, yDiff), topMax) : 0;

        dragger.crop = { x: -moveX, y: -moveY };
        dragger.style = `left: ${moveX}px; top: ${moveY}px;`;
    };

    const onMouseDown = (e) => {
        const cW = values.elVideo.offsetWidth;
        const cH = values.elVideo.offsetHeight;
        const pW = values.elFrame.offsetWidth;
        const pH = values.elFrame.offsetHeight;

        const canMoveX = cW > pW;
        const canMoveY = cH > pH;
        const leftMin = (cW - pW) * -1;
        const leftMax = 0;
        const topMin = (cH - pH) * -1;
        const topMax = 0;

        dragger.offX = e.offsetX;
        dragger.offY = e.offsetY;
        dragger.drag = true;
        dragger.rect = values.elFrame.getBoundingClientRect();
        dragger.info = { canMoveX, canMoveY, leftMin, leftMax, topMin, topMax };
    };

    const onMouseUp = (e) => {
        dragger.drag = false;
        dragger.info = {};
    };

    const submitForm = async (e) => {
        e.preventDefault();
        // router.post("/posts", values);

        if (typeof window === 'undefined') {
            throw new Error('FFmpeg only runs in the browser.');
        }

        const { FFmpeg } = await import('@ffmpeg/ffmpeg');
        const { fetchFile } = await import('@ffmpeg/util');
        const ffmpeg = new FFmpeg();

        if (!ffmpeg.loaded) await ffmpeg.load();

        ffmpeg.on('log', ({ type, message }) => {
            console.log(`[${type}] ${message}`);
        });

        ffmpeg.writeFile('input.webm', await fetchFile(values.fileVideo));

        // https://github.com/ffmpegwasm/ffmpeg.wasm/issues/679#issuecomment-1987188448
        await ffmpeg.exec([
            '-ss',
            `${rangers.start}`,
            '-to',
            `${rangers.end}`,
            '-i',
            'input.webm',
            '-fflags',
            '+genpts',
            '-preset',
            'ultrafast',
            '-c:v',
            'libvpx',
            '-c:a',
            'libvorbis',
            '-crf',
            '23',
            '-threads',
            '4',
            '-vf',
            `crop=370:${(370 / 9) * 16}:${dragger.crop.x}:${dragger.crop.y}`, // width:height:x:y
            'output.webm',
        ]);

        const data = await ffmpeg.readFile('output.webm');
        const blob = new Blob([data], { type: 'video/webm' });
        const url = URL.createObjectURL(blob);

        values.elVideo.src = url;
    };

    const onSelectProgress = (e) => {
        values.elVideo.currentTime = parseFloat(e.target.value);
    };
</script>

<svelte:head>
    <title>Create Post – gendly</title>
</svelte:head>

<svelte:body on:mousemove={onMouseMove} on:mouseup={onMouseUp} />

<Page>
    <Padding>
        <h3 class="text-3xl mb-3">Create a Post</h3>
        <p>Ask the world for their lousy opinions!</p>
        <Spacer></Spacer>
        <form onsubmit={submitForm} class="flex flex-col">
            <label for="title" class="select-none">Title</label>
            <input id="title" class="form-element" name="title" bind:value={values.title} />
            {#if errors.title}
                <p>{errors.title}</p>
            {/if}

            <label for="title" class="select-none">Video</label>
            {#if !values.fileVideo}
                <Dropzone
                    id="dropzone"
                    class="form-element h-[400px] border-0 dark:border-0 dark:hover:bg-slate-500 bg-slate-200 dark:bg-slate-600 hover:bg-slate-200 hover:border-0"
                    bind:files={() => null, (f) => (values.fileVideo = f[0])}
                    ondrop={onDrop}
                    ondragover={(event) => event.preventDefault()}
                >
                    <div class="size-12 mb-2 text-slate-800 dark:text-slate-400">
                        <Icons.Upload />
                    </div>
                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span class="font-semibold">Click to upload</span>
                        or drag and drop
                    </p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                        MP4, MPG or MKV ({imageSizes.minWidth}x{imageSizes.minHeight})
                    </p>
                </Dropzone>
            {:else}
                <div class="frame relative rounded-md overflow-hidden" bind:this={values.elFrame}>
                    <video
                        controls={false}
                        autoplay
                        loop
                        class="video"
                        bind:this={values.elVideo}
                        onloadedmetadata={onMetadata}
                        src={values.srcVideo}
                        ondblclick={onDblClickVideo}
                        onmousedown={onMouseDown}
                        ontimeupdate={onTimeUpdate}
                        style={dragger.style}
                    >
                        <track kind="captions" />
                    </video>
                    <button class="button-round size-8! absolute top-[1rem] right-[1rem]" onclick={onRemove}>
                        <Icons.X />
                    </button>
                </div>
                <div
                    class="h-[36px] relative flex flex-row mb-8 mt-2 bg-slate-200 dark:bg-slate-600 py-2 px-4 rounded-md"
                >
                    <div class="shader absolute top-0 bottom-0" style={data.styleShader}></div>
                    <div
                        class="absolute w-full h-full flex items-center justify-center text-sm text-slate-200 top-0 left-0"
                    >
                        {data.info}
                    </div>
                    <div class="absolute h-full max-w-full left-0 top-0 right-0 select-none" style="">
                        <input
                            class="ranger start relative"
                            type="range"
                            bind:value={rangers.start}
                            step={0.5}
                            min={0}
                            max={values.duration}
                            name="start"
                            oninput={onSelectProgress}
                        />
                    </div>
                    <div class="absolute h-full max-w-full left-0 top-0 right-0 select-none" style="">
                        <input
                            class="ranger end relative"
                            type="range"
                            bind:value={rangers.end}
                            step={0.5}
                            min={0}
                            max={values.duration}
                            name="end"
                            oninput={onSelectProgress}
                        />
                    </div>
                    <div class="absolute h-full w-full left-0 top-0">
                        <input
                            class="ranger progress relative"
                            type="range"
                            bind:value={rangers.progress}
                            step={0.5}
                            min={0}
                            max={values.duration}
                            name="progress"
                            oninput={onSelectProgress}
                        />
                    </div>
                </div>
                <div
                    class="flex flex-row mt-2 text-sm text-slate-500 bg-slate-200 dark:bg-slate-600 dark:text-slate-200 py-2 px-4 rounded-md select-none"
                >
                    <span> Video dimensions are </span>
                    <span
                        class="mx-1"
                        class:text-red-400={values.widthCropped < 400}
                        class:text-green-400={values.widthCropped >= 400}
                    >
                        {values.widthCropped}
                    </span>
                    <span> x </span>
                    <span
                        class="mx-1"
                        class:text-red-400={values.height < 640}
                        class:text-green-400={values.height >= 640}
                    >
                        {values.height}
                    </span>
                    <span> pixels. </span>
                    <div class="flex flex-col grow"></div>
                    <div
                        class="flex-inline size-5"
                        class:text-red-400={values.widthCropped < 400 || values.height < 640}
                        class:text-green-400={values.widthCropped >= 400 && values.height >= 640}
                    >
                        {#if values.widthCropped < 400 || values.height < 640}
                            <Icons.Warning />
                        {:else}
                            <Icons.Check />
                        {/if}
                    </div>
                </div>
                <div
                    class="flex flex-row mt-2 text-sm text-slate-500 bg-slate-200 dark:bg-slate-600 dark:text-slate-200 py-2 px-4 rounded-md select-none"
                >
                    <span> Video duration is </span>
                    <span class="mx-1" class:text-red-400={data.range < 5} class:text-green-400={data.range >= 5}>
                        {data.range}
                    </span>
                    <span> seconds. </span>
                    <div class="flex flex-col grow"></div>
                    <div
                        class="flex-inline size-5"
                        class:text-red-400={data.range < 5}
                        class:text-green-400={data.range >= 5}
                    >
                        {#if data.range < 5}
                            <Icons.Warning />
                        {:else}
                            <Icons.Check />
                        {/if}
                    </div>
                </div>
            {/if}
            {#if errors.image}
                <p>{errors.image}</p>
            {/if}

            <Spacer></Spacer>
            <Spacer></Spacer>

            <button class="form-element" type="submit" disabled={cropErrors.any || !values.fileVideo}> Post! </button>
        </form>
    </Padding>
</Page>

<style>
    .frame {
        position: relative;
        aspect-ratio: calc(9 / 16);
        width: 100%;
    }

    .video {
        left: 0;
        top: 0;
        min-width: 100%;
        min-height: 100%;
        max-width: none;
        max-height: none;
        width: auto;
        height: auto;
        position: absolute;
        /* object-fit: cover; */
        cursor: move;
    }

    .shader {
        opacity: 0.3;
        background: repeating-linear-gradient(135deg, var(--color-yellow-400) 2px 4px, transparent 4px 6px);
    }

    .ranger::-webkit-slider-thumb {
        position: relative;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 1rem;
        border-color: var(--color-yellow-400);
    }
    .ranger.start::-webkit-slider-thumb,
    .ranger.end::-webkit-slider-thumb {
        margin-top: calc(1rem + 20px);
    }
    .ranger.start::-webkit-slider-thumb {
        border-radius: 0 50% 50% 50%;
    }
    .ranger.end::-webkit-slider-thumb {
        border-radius: 50% 0 50% 50%;
    }
    .ranger.progress::-webkit-slider-thumb {
        height: 100%;
        border-width: 1px;
        border-color: var(--color-green-500);
    }
</style>
