<template>
    <g :transform="`translate(${path.position.x}, ${path.position.y})`" fill="transparent">

        <path class="shape" ref="line"
            :d="`
                M ${path.a2.x} ${path.a2.y} 
                C ${path.c2.x} ${path.c2.y} ${path.c1.x} ${path.c1.y} ${path.a1.x} ${path.a1.y}
                `" 
            :stroke="lineColor"
            :stroke-dasharray="dashArray"
            :stroke-dashoffset="dashOffset" />
            
        <rect fill="transparent" v-if="gotRect" @click="test"
            stroke-dasharray="8" stroke="var(--c-two)" :stroke-opacity="0.4"
            :width="clickabelRectSize.width" :height="clickabelRectSize.height" 
            :x="clickabelRectSize.x" :y="clickabelRectSize.y" />
    
        <circle class="handle" id="c1"
            @mousedown.prevent="(e)=>appState.setActiveAnchor(e,pathName, 'c1')"
            @touchstart.prevent="(e)=>appState.setActiveAnchor(e,pathName, 'c1')"
            fill="transparent" 
            :stroke="handleColor" 
            stroke-opacity="1" 
            stroke-width="1" r="16"
            :cx="path.c1.x" :cy="path.c1.y" />
    
        <circle class="handle" id="c2"
            @mousedown.prevent="(e)=>appState.setActiveAnchor(e,pathName, 'c2')"
            @touchstart.prevent="(e)=>appState.setActiveAnchor(e,pathName, 'c2')"
            fill="transparent"
            :stroke="handleColor"
            stroke-opacity="1" 
            stroke-width="1" r="16"
            :cx="path.c2.x" :cy="path.c2.y" />
    
        <rect class="handle" id="a1"    
        :width="anchorSize" :height="anchorSize"  
            :x="path.a1.x - (anchorSize/2)" :y="path.a1.y - (anchorSize/2)" 
            :transform="`rotate(45 ${ path.a1.x } ${ path.a1.y })`"
            fill="transparent"
            @mousedown.prevent="(e)=>appState.setActiveAnchor(e,pathName, 'a1')"
            @touchstart.prevent="(e)=>appState.setActiveAnchor(e,pathName, 'a1')"
            stroke="var(--c-three)"
            stroke-opacity="1" 
            stroke-width="1"/>

        <rect class="handle" id="a2"    
            :width="anchorSize" :height="anchorSize"  
            :x="path.a2.x - (anchorSize/2)" :y="path.a2.y - (anchorSize/2)" 
            :transform="`rotate(45 ${ path.a2.x } ${ path.a2.y })`"
            @mousedown.prevent="(e)=>appState.setActiveAnchor(e,pathName, 'a2')"
            @touchstart.prevent="(e)=>appState.setActiveAnchor(e,pathName, 'a2')"
            stroke="var(--c-three)"
            fill="transparent"
            stroke-opacity="1" 
            stroke-width="1"/>
    </g>
</template>

<style>

</style>

<script setup>
    import { useAppState } from '@/stores/appState'
    import { useBaseLayers } from '@/stores/baseLayers'
    import { storeToRefs } from 'pinia'
    
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

    const anchorSize =  computed(  () => appState.windowSize.width < 786 ? 24 : 14 )

    const path = computed( () => layers[props.pathName] )
    const lineColor = computed( () => palets[props.palet]  )
    const handleColor = computed( () => Number(props.palet) >= 5  ? palets[1] : palets[Number(props.palet)+1]  )
    
    const dashOffset = ref(0)
    const line = ref(null)
    const gotRect = ref(false)
    
    const clickabelRectSize = ref({
        width:0,
        height:0,
        x:0,
        y:0
    })

    watch(path, () => {
        setClickable(line.value.getBoundingClientRect(), path.value.position)
    }, {deep:true})


    onMounted(() => {
        setClickable(line.value.getBoundingClientRect(), path.value.position)
        if( props.dashArray ) loop()
    })

    function test () {
        console.log('test')
    }

    function setClickable(rect, pos) {
        const { width, height, top, left } = rect
        clickabelRectSize.value = {
            width,
            height,
            x: left - (pos.x - window.scrollX),
            y: top  - (pos.y - window.scrollY),
        }
        gotRect.value = true
    }
    
    function loop() {
        if ( document.hasFocus() ) dashOffset.value += Number(props.speed)
        requestAnimationFrame(loop)
    }

</script>