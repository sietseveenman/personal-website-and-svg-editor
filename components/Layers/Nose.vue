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
    }

</script>