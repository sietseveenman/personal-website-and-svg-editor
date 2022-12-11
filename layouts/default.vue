<template>
    <slot />
</template>

<script setup>

    import { onMounted } from 'vue'
    import { useGlobalStore } from '@/stores/globalStore'

    const store = useGlobalStore()
    let prev = null

    onMounted(() => {
        document.addEventListener('mouseup', resetDrag)
        document.addEventListener('mousemove', handleDrag )
    })

    function resetDrag () {
        store.resetDrag(undefined)
        prev = null
    }

    function handleDrag (e) {

        if ( !store.activePath && !store.activeAnchor ) return

        const point = store[store.activePath][store.activeAnchor]

        const mx = e.clientX
        const my = e.clientY

        if ( prev ) {
            point.x -= (prev.x - mx)
            point.y -= (prev.y - my)
        }

        prev = {
            x: mx,
            y: my
        }
    }
</script>

<style lang="scss">
    :root {
        --font-read: 'Roboto Mono', monospace;
        --black: #000C22;
        --background: var(--black);
        --c-primary: #FC5FFF;
        --c-secondary: #29E818;

        --hover-anchor-color: #29E818;
        --hover-anchor-stroke-width: 1;
    }

    html {
        font-family: var(--font-read);
        letter-spacing: 0.025em;
        font-size: 62.5%;
        color: var(--c-primary);
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
    }

    body {
        font-size: 1.6rem;
        overscroll-behavior: contain;
        background: var(--background);
        position: relative;
    }

    *,
    *::before,
    *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    h1,h2,h3,h4,h5 {
        font-size: 100%;
        font-weight: inherit;
    }
    #__cake {
        position: relative;
    } 
    .strike {
        position: relative;
        &:after {
            position: absolute;
            content:'';
            left: -0.1em;
            right: -0.1em;
            top: 58%;
            transform: translateY(-50%);
            height: 0.12em;
            background: var(--c-secondary);
        }
    }
 
</style>