<template>
    <div class="artboard">
        <svg width="2800" height="2560" viewBox="0 0 2800 2560" fill="" xmlns="http://www.w3.org/2000/svg">
        
            <LayersLogo />
            
            <LayersNose />

            <LayersRectRadius />
        
            <!-- <RectStretch originalCoords={{x: 460, y: 1190}} />
        
        
            <Board originalCoords={{x:920, y:1290}} /> -->
        
        </svg>
    </div>
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

        const mx = e.clientX
        const my = e.clientY

        store.mouse = {
            x: mx,
            y: my
        }

        if ( !store.activePath && !store.activeAnchor ) return

        const point = store[store.activePath][store.activeAnchor]

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
    .artboard {
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 2;
    }
    .handle {
        z-index: 999;
        cursor: pointer;
        transition: 
            r 0.42s cubic-bezier(0.785, 0.220, 0.260, 1.420),
            stroke 0.2s ease-in-out,
            stroke-width 0.2s ease-in-out;
        &:hover {
            stroke: var(--hover-anchor-color);
            stroke-width: var(--hover-anchor-stroke-width);
        }
    }
</style>