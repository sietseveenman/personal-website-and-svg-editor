<template>
    <g :transform="`translate(${path.position.x}, ${path.position.y})`" fill="transparent">
       <g class="shape">
            <path :d="`
                    M ${path.a2.x} ${path.a2.y} 
                    C ${path.c2.x} ${path.c2.y} ${path.c1.x} ${path.c1.y} ${path.a1.x} ${path.a1.y}
                `" 
                :stroke="lineColor"
                :stroke-dasharray="dashArray"
                :stroke-dashoffset="dashOffset"
                ref="line"/>
        </g>
        <circle class="handle" id="c1"
            @mousedown.prevent="(e)=>appState.setActiveAnchor(e,pathName, 'c1')"
            fill="transparent" 
            :stroke="handleColor" 
            stroke-opacity="1" 
            stroke-width="1" r="16"
            :cx="path.c1.x" :cy="path.c1.y" />
    
        <circle class="handle" id="c2"
            @mousedown.prevent="(e)=>appState.setActiveAnchor(e,pathName, 'c2')"
            fill="transparent"
            :stroke="handleColor"
            stroke-opacity="1" 
            stroke-width="1" r="16"
            :cx="path.c2.x" :cy="path.c2.y" />
    
        <rect class="handle" id="a1"    
            width="14" height="14"  
            :x="path.a1.x - 7" :y="path.a1.y - 7" 
            :transform="`rotate(45 ${ path.a1.x } ${ path.a1.y })`"
            @mousedown.prevent="(e)=>appState.setActiveAnchor(e,pathName, 'a1')"
            stroke="var(--c-three)"
            stroke-opacity="1" 
            stroke-width="1"/>

            <rect class="handle" id="a2"    
            width="14" height="14"  
            :x="path.a2.x - 7" :y="path.a2.y - 7" 
            :transform="`rotate(45 ${ path.a2.x } ${ path.a2.y })`"
            @mousedown.prevent="(e)=>appState.setActiveAnchor(e,pathName, 'a2')"
            stroke="var(--c-three)"
            stroke-opacity="1" 
            stroke-width="1"/>
    </g>
</template>

<script setup>
    import { useAppState } from '@/stores/appState'
    import { useBaseLayers } from '@/stores/baseLayers'

    const appState = useAppState()
    const layers = useBaseLayers()

    const props = defineProps({ 
        pathName: String,
        palet: String,
        reverse: {
            type: Boolean,
            default: false
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
    const palets = {
        1: 'var(--c-one)',
        2: 'var(--c-two)',
        3: 'var(--c-three)',
        4: 'var(--c-four)',
        5: 'var(--c-five)',
        6: 'var(--c-six)',
    }

    const dashOffset = ref(0)
    function loop() {
        props.reverse 
            ? (dashOffset.value -= Number(props.speed))
            : (dashOffset.value += Number(props.speed))
        requestAnimationFrame(loop)
    }
    if( props.dashArray ) loop()

    const path = computed( () => layers[props.pathName] )
    const lineColor = computed( () => palets[props.palet]  )
    const handleColor = computed( () => Number(props.palet) >= 5  ? palets[1] : palets[Number(props.palet)+1]  )

</script>