<template>
    <g :transform="`translate(${rect.position.x}, ${rect.position.y})`">
        <rect x="0" y="0" fill="transparent"
            width="140" height="140" :rx="rect.radius <= 0 ? 0 : rect.radius"
            transform-origin="70 70"
            transform="rotate(-45  0 0)"
            stroke="var(--c-five)" />
        
        <circle class="handle handle--s"
            @mousedown.prevent="store.setActiveAnchor('rectRadius', 'h1')"
            fill="transparent"
            stroke="var(--c-four)"
            stroke-opacity="1"
            stroke-width="1" r="7"
            :cx="70" :cy="rect.h1.y" />
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

    const store = useGlobalStore()
    const rect = computed(() => store.rectRadius)

    watch(() => store.rectRadius.h1.y, (newY, oldY) => {
        store.rectRadius.radius += (oldY - newY) * 0.75
    }, {deep:true});


</script>