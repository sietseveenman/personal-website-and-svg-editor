<template>
    <span>Layout</span>
    <slot />
</template>

<style lang="scss">
    :root {
        --font-read: 'Roboto Mono', monospace;
    }
    html {
        font-family: var(--font-read);
        letter-spacing: 0.025em;
        font-size: 62.5%;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
    }

    body {
        font-size: 1.6rem;
        overscroll-behavior: contain;
    }

    *,
    *::before,
    *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
</style>