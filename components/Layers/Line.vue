<template>
    <g :transform="`translate(${path.position.x}, ${path.position.y})`" fill="transparent">
       <g class="shape">
            <path :d="`M${path.a2.x} ${path.a2.y} C${path.c2.x} ${path.c2.y} ${path.c1.x} ${path.c1.y} ${path.a1.x} ${path.a1.y}`" stroke="var(--c-one)"/>
        </g>

        <circle class="handle" id="c1"
            @mousedown.prevent="(e)=>store.setActiveAnchor(e,pathName, 'c1')"
            fill="transparent" 
            stroke="var(--c-two)" 
            stroke-opacity="1" 
            stroke-width="1" r="16"
            :cx="path.c1.x" :cy="path.c1.y" />
    
        <circle class="handle" id="c2"
            @mousedown.prevent="(e)=>store.setActiveAnchor(e,pathName, 'c2')"
            fill="transparent"
            stroke="var(--c-two)"
            stroke-opacity="1" 
            stroke-width="1" r="16"
            :cx="path.c2.x" :cy="path.c2.y" />
    
        <rect class="handle" id="a1"    
            width="14" height="14"  
            :x="path.a1.x - 7" :y="path.a1.y - 7" 
            :transform="`rotate(45 ${ path.a1.x } ${ path.a1.y })`"
            @mousedown.prevent="(e)=>store.setActiveAnchor(e,pathName, 'a1')"
            stroke="var(--c-three)"
            stroke-opacity="1" 
            stroke-width="1"/>

            <rect class="handle" id="a2"    
            width="14" height="14"  
            :x="path.a2.x - 7" :y="path.a2.y - 7" 
            :transform="`rotate(45 ${ path.a2.x } ${ path.a2.y })`"
            @mousedown.prevent="(e)=>store.setActiveAnchor(e,pathName, 'a2')"
            stroke="var(--c-three)"
            stroke-opacity="1" 
            stroke-width="1"/>
    </g>
</template>

<script setup>
    import { useGlobalStore } from '@/stores/globalStore'

    const store = useGlobalStore()

    const props = defineProps({
        pathName: String
    })

    const path = computed( () => store[props.pathName] )
    

</script>