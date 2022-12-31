<template>
    <g class="this" :transform="`translate(${layer.position.x}, ${layer.position.y})`" fill="transparent">
       <g class="shape">
            <path :d="path" 
            :stroke="lineColor"
            :stroke-dasharray="dashArray"
            :stroke-dashoffset="dashOffset"/>
        </g>
        <g v-for="point in points" :key="point.key">
            <rect v-if="point.type === 'anchor'" 
                class="handle anchor"
                @mousedown.prevent="(e)=>appState.setActiveAnchor(e, pathName, point.key)"
                width="14" height="14"
                :x="point.data.x - 7" :y="point.data.y - 7"
                :transform="`rotate(45 ${ point.data.x } ${ point.data.y })`"
                :stroke="anchorColor"
                stroke-opacity="1"
                stroke-width="1"/>
        </g>
        <g v-for="point in points" :key="point.key">
            <circle v-if="point.type === 'handle'"
                class="handle"
                @mousedown.prevent="(e)=>appState.setActiveAnchor(e, pathName, point.key)"
                fill="transparent"
                :stroke="handleColor"
                stroke-opacity="1" 
                stroke-width="0.6" r="7"
                :cx="point.data.x" :cy="point.data.y" />
        </g>
    </g>
</template>
<style lang="scss" scoped>
    .handle:not(.anchor) {
        opacity: 0.2;
        transition: opacity 0.2s ease-in-out
    }
    .this {
        &:hover { 
            .handle {
                opacity: 0.9;
            }
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
        palet: String,
        speed: {
            type: Number,
            default: 1
        },
        dashArray: {
            type: String,
            default: undefined
        },
    })
    const palets = {
        1: 'var(--c-one)',
        2: 'var(--c-two)',
        3: 'var(--c-three)',
        4: 'var(--c-four)',
        5: 'var(--c-five)',
        6: 'var(--c-six)',
    }
    const lineColor = computed( () => palets[props.palet]  )
    
    const dashOffset = ref(0)

    function loop() {
        if ( document.hasFocus() ) dashOffset.value += Number(props.speed)
        requestAnimationFrame(loop)
    }
    if( props.dashArray ) loop()

    const anchorColor = computed( () => {
        let nr = Number(props.palet) + 5
        nr = nr > 6 ? (nr - 6) : nr
        return palets[nr]
    })

    const handleColor = computed( () => {
        let nr = Number(props.palet) + 1
        nr = nr > 6 ? (nr - 6) : nr
        return palets[nr]
    })

    const layer = computed(()=>layers[props.pathName])

    const points = computed( () => {
        const points = [];
        for (const [key, value] of Object.entries(layers[props.pathName])) {
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