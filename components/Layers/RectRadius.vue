<template>
    <g :transform="`translate(${path.position.x}, ${path.position.y})`">
        <rect x="0" y="0" fill="transparent"
            :width="path.size" :height="path.size" :rx="radius <= 0 ? 0 : radius"
            :transform-origin="`${half} ${half}`"
            transform="rotate(-45  0 0)"
            stroke="var(--c-five)" />
        
        <circle class="handle handle--s"
            @mousedown.prevent="(e)=>store.setActiveAnchor(e, pathName, 'h1')"
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

    import { useGlobalStore } from '@/stores/globalStore'

    const props = defineProps({
        pathName: String
    })
    
    const clamp = (num, min, max) => Math.min(Math.max(num, min), max)

    const store = useGlobalStore()
    const path = computed( () => store[props.pathName] )
    const half = computed( () => store[props.pathName].size / 2 )

    const radius = computed( () => {
        let path = store[props.pathName]
        return clamp( path.h1[path.axis], 0, path.size)
    } ) 

</script>