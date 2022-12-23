<template>
    <g class="logo" :transform="`translate(${layer.position.x}, ${layer.position.y})`" fill="transparent">

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
            @mousedown.prevent="(e)=>store.setActiveAnchor(e,'skateboard', 'a_top__h')"
            parent="T_A"
            fill="transparent" stroke="grey" stroke-opacity="0.8" stroke-width="0.8" 
            width="16" height="16" :transform="`rotate(45 ${ layer.a_top__h.x } ${ layer.a_top__h.y })`"
            :x="layer.a_top__h.x - 8" :y="layer.a_top__h.y - 8"/> 
    </g>
</template>

<script setup>
    import { useGlobalStore } from '@/stores/globalStore'

    const store = useGlobalStore()
    const layer = computed( () => store.skateboard )
    const boardPath = computed( () => {
        const path = store.skateboard
        return `
            M${ path.a_top.x    }  ${ path.a_top.y    }
            C${ path.a_top__h.x }  ${ path.a_top__h.y }  ${ path.a_1__h_1.x }  ${ path.a_1__h_1.y }  ${ path.a_1.x      }  ${ path.a_1.y }
            C${ path.a_1__h_2.x }  ${ path.a_1__h_2.y }  ${ path.a_2__h_1.x }  ${ path.a_top__h.y }  ${ path.a_2__h_1.x }  ${ path.a_top.y }
            C${ path.a_2__h_2.x }  ${ path.a_2__h_2.y }  ${ path.a_bot__h.x }  ${ path.a_bot__h.y }  ${ path.a_bot.x    }  ${ path.a_bot.y }
            
            C136.879 547.083 ${ path.a_1.x } 572.787 ${ path.a_1.x } 572.787
            C${ path.a_1.x } 572.787 37.2042 547.083 33.0956 ${ path.a_bot.y }
            C28.9871 ${ path.a_bot__h.y } 0.649801 ${ path.a_2__h_2.y } ${ path.a_top.x } ${ path.a_top.y }Z
        `
    })


</script>