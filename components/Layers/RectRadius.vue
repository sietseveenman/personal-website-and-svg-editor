<template>
    <g :transform="`translate(${path.position.x}, ${path.position.y})`">
        <rect x="0" y="0" fill="transparent"
            :width="path.size" :height="path.size" :rx="radius <= 0 ? 0 : radius"
            :transform-origin="`${half} ${half}`"
            transform="rotate(-45  0 0)"
            stroke="var(--c-five)"
            :stroke-dasharray="dashArray"
            :stroke-dashoffset="dashOffset"
            :stroke-width="strokeWidth" />
        
        <circle class="handle handle--s"
            @mousedown.prevent="(e)=>appState.setActiveAnchor(e, pathName, 'h1')"
            @touchstart.prevent="(e)=>appState.setActiveAnchor(e, pathName, 'h1')"
            fill="transparent"
            stroke="var(--c-four)"
            stroke-opacity="1"
            stroke-width="1" r="7"
            :cx="'x' === path.axis ? path.h1.x : half" 
            :cy="'y' === path.axis ? path.h1.y : half" />
    </g>
</template>
<!-- :cx="path.axis === 'x' ? path.h1.x : half" 
:cy="path.axis === 'y' ? path.h1.y : half" /> -->

<style scoped lang="scss">
    .handle--s {
        &:hover {
            r: 10
        }
    }
</style>

<script setup>
    import { useAppState } from '@/stores/appState'
    import { useBaseLayers } from '@/stores/baseLayers'

    const appState = useAppState()
    const layers = useBaseLayers()

    const props = defineProps({
        pathName: String,
        strokeWidth: {
            type: Number,
            default: 1,
        },
        speed: {
            type: Number,
            default: 1
        },
        dashArray: {
            type: String,
            default: undefined
        },
    })
    
    const clamp = (num, min, max) => Math.min(Math.max(num, min), max)

    const path = computed( () => layers[props.pathName] )
    const half = computed( () => layers[props.pathName].size / 2 )

    const radius = computed( () => {
        let path = layers[props.pathName]
        return clamp( path.h1[path.axis], 0, path.size)
    }) 

    const dashOffset = ref(0)
    function loop() {
        if ( document.hasFocus() ) dashOffset.value += Number(props.speed)
        requestAnimationFrame(loop)
    }
    if( props.dashArray ) loop()

</script>