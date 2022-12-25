<template>
    <g class="skateboard" :transform="`translate(${layer.position.x}, ${layer.position.y})`" fill="transparent">

        <g style="opacity: 0.75">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M70.4031 462.193L72.7738 464.564L73.3007 464.037L70.9299 461.666L73.3007 459.296L72.7738 458.769L70.4031 461.14L68.032 458.769L67.5051 459.295L69.8762 461.666L67.5051 464.038L68.032 464.564L70.4031 462.193Z" fill="var(--c-six)"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M70.4029 421.482L72.7737 423.853L73.3006 423.326L70.9298 420.955L73.3006 418.584L72.7737 418.057L70.4029 420.428L68.0319 418.057L67.505 418.584L69.8761 420.955L67.505 423.326L68.0319 423.853L70.4029 421.482Z" fill="var(--c-six)"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M103.681 421.481L106.052 423.852L106.578 423.325L104.208 420.955L106.578 418.584L106.052 418.057L103.681 420.428L101.31 418.057L100.783 418.584L103.154 420.955L100.783 423.326L101.31 423.853L103.681 421.481Z" fill="var(--c-six)"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M103.681 462.194L106.052 464.565L106.579 464.038L104.208 461.667L106.579 459.296L106.052 458.769L103.681 461.14L101.31 458.769L100.783 459.296L103.154 461.667L100.783 464.038L101.31 464.565L103.681 462.194Z" fill="var(--c-six)"/>
        </g>
        <g style="opacity: 0.75">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M70.9297 150.342L73.3006 147.971L72.7737 147.444L70.4029 149.815L68.032 147.444L67.5051 147.971L69.876 150.342L67.505 152.713L68.0319 153.24L70.4029 150.869L72.7739 153.24L73.3007 152.713L70.9297 150.342Z" fill="var(--c-six)"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M70.9295 109.629L73.3006 107.258L72.7737 106.731L70.4027 109.103L68.0318 106.732L67.5049 107.258L69.8758 109.629L67.505 112L68.0319 112.527L70.4027 110.156L72.7736 112.527L73.3005 112L70.9295 109.629Z" fill="var(--c-six)"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M104.207 109.629L106.578 107.258L106.051 106.731L103.68 109.102L101.31 106.732L100.783 107.258L103.154 109.629L100.783 112L101.31 112.527L103.68 110.156L106.051 112.527L106.578 112L104.207 109.629Z" fill="var(--c-six)"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M104.207 150.342L106.578 147.971L106.052 147.444L103.681 149.815L101.31 147.444L100.783 147.971L103.154 150.342L100.783 152.713L101.31 153.24L103.681 150.869L106.052 153.24L106.578 152.713L104.207 150.342Z" fill="var(--c-six)"/>
        </g>

        <path :d="boardPath" stroke="var(--c-six)" stroke-width="0.8"/>

        <rect  class="handle" 
            @mousedown.prevent="(e)=>store.setActiveAnchor(e,'skateboard', '_top', 'x', ['_top__h'])"
            fill="transparent" stroke="var(--c-two)" stroke-opacity="0.8" stroke-width="0.8" 
            width="12" height="12" :transform="`rotate(45 ${ layer._top.x } ${ layer._top.y })`"
            :x="layer._top.x - 6" :y="layer._top.y - 6"/> 

        <circle class="handle" 
            @mousedown.prevent="(e)=>store.setActiveAnchor(e,'skateboard', '_top__h')"
            fill="transparent" stroke="var(--c-three)" stroke-opacity="0.8" stroke-width="0.8" r="6"
            :cx="layer._top__h.x" :cy="layer._top__h.y" />


        <rect class="handle" 
            @mousedown.prevent="(e)=>store.setActiveAnchor(e,'skateboard', '_1', undefined)"
            fill="transparent" stroke="var(--c-two)" stroke-opacity="0.8" stroke-width="0.8" 
            width="12" height="12" :transform="`rotate(45 ${ layer._1.x } ${ layer._1.y })`"
            :x="layer._1.x - 6" :y="layer._1.y - 6"/> 

        <circle class="handle" 
            @mousedown.prevent="(e)=>store.setActiveAnchor(e,'skateboard', '_1__h_1', undefined)"
            fill="transparent" stroke="var(--c-three)" stroke-opacity="0.8" stroke-width="0.8" r="6"
            :cx="layer._1__h_1.x" :cy="layer._1__h_1.y" />

        <circle class="handle" 
            @mousedown.prevent="(e)=>store.setActiveAnchor(e,'skateboard', '_1__h_2', undefined)"
            fill="transparent" stroke="var(--c-three)" stroke-opacity="0.8" stroke-width="0.8" r="6"
            :cx="layer._1__h_2.x" :cy="layer._1__h_2.y" />


        <rect class="handle" 
            @mousedown.prevent="(e)=>store.setActiveAnchor(e,'skateboard', '_2', undefined)"
            fill="transparent" stroke="var(--c-two)" stroke-opacity="0.8" stroke-width="0.8" 
            width="12" height="12" :transform="`rotate(45 ${ layer._2.x } ${ layer._2.y })`"
            :x="layer._2.x - 6" :y="layer._2.y - 6"/> 

        <circle class="handle" 
            @mousedown.prevent="(e)=>store.setActiveAnchor(e,'skateboard', '_2__h_1', undefined)"
            fill="transparent" stroke="var(--c-three)" stroke-opacity="0.8" stroke-width="0.8" r="6"
            :cx="layer._2__h_1.x" :cy="layer._2__h_1.y" />

        <circle class="handle" 
            @mousedown.prevent="(e)=>store.setActiveAnchor(e,'skateboard', '_2__h_2', undefined)"
            fill="transparent" stroke="var(--c-three)" stroke-opacity="0.8" stroke-width="0.8" r="6"
            :cx="layer._2__h_2.x" :cy="layer._2__h_2.y" />


        <rect  class="handle" 
            @mousedown.prevent="(e)=>store.setActiveAnchor(e,'skateboard', '_bot', 'x')"
            fill="transparent" stroke="var(--c-two)" stroke-opacity="0.8" stroke-width="0.8" 
            width="12" height="12" :transform="`rotate(45 ${ layer._bot.x } ${ layer._bot.y })`"
            :x="layer._bot.x - 6" :y="layer._bot.y - 6"/> 

        <circle class="handle" 
            @mousedown.prevent="(e)=>store.setActiveAnchor(e,'skateboard', '_bot__h')"
            fill="transparent" stroke="var(--c-three)" stroke-opacity="0.8" stroke-width="0.8" r="6"
            :cx="layer._bot__h.x" :cy="layer._bot__h.y" />


    </g>
</template>
<style lang="scss" scoped>
.handle {
    opacity: 0.2;
    transition: opacity 0.2s ease-in-out

}
.skateboard {
    &:hover {
        .handle {
            opacity: 0.9;
        }
    }
}
</style>
<script setup>
    import { useGlobalStore } from '@/stores/globalStore'

    const store = useGlobalStore()
    const layer = computed( () => store.skateboard )
    const boardPath = computed( () => {
        const path = store.skateboard
        const width = path._top.x * 2 
        return `
            M ${ path._top.x    }  ${ path._top.y    }
            C ${ path._top__h.x }  ${ path._top__h.y }  ${ path._1__h_1.x }  ${ path._1__h_1.y }  ${ path._1.x   }  ${ path._1.y   }
            C ${ path._1__h_2.x }  ${ path._1__h_2.y }  ${ path._2__h_1.x }  ${ path._2__h_1.y }  ${ path._2.x   }  ${ path._2.y   }
            C ${ path._2__h_2.x }  ${ path._2__h_2.y }  ${ path._bot__h.x }  ${ path._bot__h.y }  ${ path._bot.x }  ${ path._bot.y }
            
            C ${ width - path._bot__h.x }  ${ path._bot__h.y }  ${ width - path._2__h_2.x }  ${ path._2__h_2.y }  ${ width - path._2.x   }  ${ path._2.y   }
            C ${ width - path._2__h_1.x }  ${ path._2__h_1.y }  ${ width - path._1__h_2.x }  ${ path._1__h_2.y }  ${ width - path._1.x   }  ${ path._1.y   }
            C ${ width - path._1__h_1.x }  ${ path._1__h_1.y }  ${ width - path._top__h.x }  ${ path._top__h.y }  ${ width - path._top.x }  ${ path._top.y }
        `
    
    })


</script>