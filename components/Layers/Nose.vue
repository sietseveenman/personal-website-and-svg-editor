<template>
    <g :transform="`translate(${nose.position.x}, ${nose.position.y})`" fill="transparent">
       <g class="shape">
            <path :d="`M600 0C${nose.c2.x} ${nose.c2.y} ${nose.c1.x} ${nose.c1.y} ${nose.a1.x} ${nose.a1.y}`" stroke="var(--c-one)"/>
        </g>

        <circle class="handle" id="c1"
            @mousedown.prevent="store.setActiveAnchor('nose', 'c1')"
            fill="transparent" 
            stroke="var(--c-two)" 
            stroke-opacity="1" 
            stroke-width="1" r="16"
            :cx="nose.c1.x" :cy="nose.c1.y" />
    
        <circle class="handle" id="c2"
            @mousedown.prevent="store.setActiveAnchor('nose', 'c2')"
            fill="transparent"
            stroke="var(--c-two)"
            stroke-opacity="1" 
            stroke-width="1" r="16"
            :cx="nose.c2.x" :cy="nose.c2.y" />
    
        <rect class="handle" id="a1"    
            width="14" height="14"  
            :x="nose.a1.x - 7" :y="nose.a1.y - 7" 
            :transform="`rotate(45 ${ nose.a1.x } ${ nose.a1.y })`"
            @mousedown.prevent="store.setActiveAnchor('nose', 'a1')"
            stroke="var(--c-three)"
            stroke-opacity="1" 
            stroke-width="1"/>
    </g>
</template>

<script>
    import { useGlobalStore } from '@/stores/globalStore'

    export default {
        setup() {
            const store = useGlobalStore()
            return { store }
        },
        computed: {
            nose(){ return this.store.nose }
        },
        // mounted() {
        //     // console.log(this)
        // }
    }

    // import { colors } from '../../../stores/state.js'
    // import { onMount } from 'svelte'

    // export let originalCoords = { x: 0, y: 0}

    // let handles = {
    //     c1: {
    //         x: 490,
    //         y: 550
    //     },
    //     c2: {
    //         x: 176,
    //         y: 158
    //     },
    //     a1: {
    //         x: 0,
    //         y: 640
    //     }
    // }

    // let prev = null
    // let draggingPoint = false
    // let dragTarget = null

    // function handleDown (e) {
    //     dragTarget = e.target.id
    //     draggingPoint = true
    // }

    // function handleDrag (e) {
    //     if ( draggingPoint && dragTarget ) {
            
    //         let mx = e.clientX
    //         let my = e.clientY

    //         if ( prev ) {
    //             handles[dragTarget].x -= (prev.x - mx)
    //             handles[dragTarget].y -= (prev.y - my)
    //         }

    //         prev = {
    //             x: mx,
    //             y: my
    //         }
    //     }
    // }
    
    // function resetDrag(){
    //     draggingPoint = false
    //     prev = null
    // }

    // onMount(() => {
    //     document.addEventListener('mouseup', resetDrag)
    //     document.addEventListener('mousemove', handleDrag)
	// })


</script>