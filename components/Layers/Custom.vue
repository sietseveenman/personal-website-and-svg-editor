<template>
    <g :transform="`translate(${layer.data.position.x}, ${layer.data.position.y})`">
   
        <path :d="path" ref="line" stroke="var(--c-one)" fill="transparent" stroke-width="0.6"/>

         <g v-for="point in points" :key="point.key">
            <rect v-if="point.type === 'anchor'" 
                fill="transparent"
                class="anchor"
                :width="15" :height="15"
                :x="point.data.x - (15/2)" :y="point.data.y - (15/2)"
                :transform="`rotate(45 ${ point.data.x } ${ point.data.y })`"
                stroke="var(--c-five)"
                stroke-opacity="1"
                stroke-width="0.8"/>
        </g>
        <g v-for="point in points" :key="point.key">
            <circle v-if="point.type === 'handle'"
                class="handle"
                fill="transparent"
                stroke="var(--c-two)"
                stroke-opacity="1" 
                stroke-width="1" :r="6"
                :cx="point.data.x" :cy="point.data.y" />
        </g>

    </g>
</template>
<script setup>
    import { useAppState } from '@/stores/appState'
    import { useCustomLayers } from '@/stores/customLayers'

    const appState = useAppState()
    const customLayers = useCustomLayers()
    
    const props = defineProps({
        layer: Object,
    })

    const points = computed( () => {
        const points = [];
        for (const [key, value] of Object.entries(props.layer.data)) {
            if ( key === 'position' ) continue
            points.push({
                key: key, 
                data: value, 
                type: key.includes('h') ? 'handle' : 'anchor' 
            });
        }
        return points
    })

    const path = computed( () => {
        return points.value.reduce((path, point, index) => {
            const command = (index-1) % 3 === 0 ? 'C' : ''
            return path = `${path} ${command} ${point.data.x} ${point.data.y}`
        }, 'M')
    })
    
</script>