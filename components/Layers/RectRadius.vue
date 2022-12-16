<template>
    <g :transform="`translate(${path.position.x}, ${path.position.y})`">
        <rect x="0" y="0" fill="transparent"
            :width="path.size" :height="path.size" :rx="radius <= 0 ? 0 : radius"
            transform-origin="70 70"
            transform="rotate(-45  0 0)"
            stroke="var(--c-five)" />
        
        <circle class="handle handle--s"
            @mousedown.prevent="store.setActiveAnchor(pathName, 'h1')"
            fill="transparent"
            stroke="var(--c-four)"
            stroke-opacity="1"
            stroke-width="1" r="7"
            :cx="axis === 'x' ? path.h1.x : 70" :cy="axis === 'y' ? path.h1.y : 70" />
    </g>
</template>


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
        axis: String,
        pathName: String
    })
    
    const clamp = (num, min, max) => Math.min(Math.max(num, min), max)

    const store = useGlobalStore()
    const path = computed( () => store[props.pathName] )

    const radius = computed( () => clamp( store[props.pathName].h1[props.axis], 0, 160) ) 

</script>