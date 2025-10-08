<script>
    import * as Icons from '#icons/index';
</script>

<div class="splash h-full w-full fixed">
    <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg" style="">
        <defs>
            <linearGradient id="greenGradient1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#b2f2bb" />
                <stop offset="100%" stop-color="#d3f9d8" />
            </linearGradient>
            <linearGradient id="greenGradient2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#a5d6a7" />
                <stop offset="100%" stop-color="#c8e6c9" />
            </linearGradient>
            <linearGradient id="greenGradient3" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#00d5be" />
                <stop offset="100%" stop-color="#00d492" />
            </linearGradient>
        </defs>

        <!-- Back wave (farthest, lightest) -->
        <path fill="url(#greenGradient1)" opacity="0.6">
            <animate
                attributeName="d"
                dur="18s"
                repeatCount="indefinite"
                values="
        M0,100 C480,200 960,0 1440,100 L1440,320 L0,320 Z;
        M0,120 C480,180 960,120 1440,180 L1440,320 L0,320 Z;
        M0,100 C480,200 960,0 1440,100 L1440,320 L0,320 Z"
            />
        </path>

        <!-- Middle wave -->
        <path fill="url(#greenGradient2)" opacity="0.8">
            <animate
                attributeName="d"
                dur="12s"
                repeatCount="indefinite"
                values="
        M0,140 C400,240 1040,40 1440,140 L1440,320 L0,320 Z;
        M0,160 C400,200 1040,120 1440,180 L1440,320 L0,320 Z;
        M0,140 C400,240 1040,40 1440,140 L1440,320 L0,320 Z"
            />
        </path>

        <!-- Front wave -->
        <path fill="url(#greenGradient3)">
            <animate
                attributeName="d"
                dur="10s"
                repeatCount="indefinite"
                values="
        M0,160 C360,260 1080,60 1440,160 L1440,320 L0,320 Z;
        M0,180 C360,220 1080,120 1440,180 L1440,320 L0,320 Z;
        M0,160 C360,260 1080,60 1440,160 L1440,320 L0,320 Z"
            />
        </path>
    </svg>
</div>

<style>
    .splash {
        z-index: -1;
        position: fixed;
    }

    .splash > svg {
        position: fixed;
        bottom: 0;
        max-height: calc(100vw / 1.2);
        width: 100%;
        z-index: -1;
    }
</style>
