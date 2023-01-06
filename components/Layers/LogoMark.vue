<template>
    <g class="logomark" :transform="`translate(${logo.position.x}, ${logo.position.y})`" fill="transparent">
        <path :d="`M${logo.a.x} ${logo.a.y}L342.047 152.663C361.222 121.099 360.138 93.8604 349.407 74.8522C338.676 55.844 318.723 28.8516 318.723 28.8516L323.333 36.0451`" :stroke="`var(${color})`"  stroke-width="0.7" stroke-linecap="round" stroke-linejoin="round"/>
        <path :stroke-dasharray="dash" :stroke-dashoffset="dashOffset" :d="`
            M121.031 199.104
            L${logo.a.x} ${logo.a.y}
            L164.5 367.023
            L71.4216 199.577`" :stroke="`var(${color})`"  stroke-width="0.7" stroke-linecap="round" stroke-linejoin="round"/>
        
        <path :stroke-dasharray="dash" :stroke-dashoffset="dashOffset" d="M82.0322 32.7227L117.556 102.618" :stroke="`var(${color})`"  stroke-width="0.7" stroke-linecap="round" stroke-linejoin="round"/>
        <path :stroke-dasharray="dash" :stroke-dashoffset="dashOffset" d="M213.986 280.114L161.672 183.313" :stroke="`var(${color})`"  stroke-width="0.7" stroke-linecap="round" stroke-linejoin="round"/>
        <path :stroke-dasharray="dash" :stroke-dashoffset="dashOffset" d="M187.994 232.071C187.994 232.071 238.185 152.14 267.068 105.61C283.668 78.8727 277.094 56.5055 258.17 49.8808C244.167 44.982 218.122 49.0816 190.434 93.9409C154.838 151.606 100.736 174.696 51.5306 158.743C6.81473 144.243 -13.4496 99.0972 13.0969 52.9236L24.7053 32.3088L82.1661 32.723L76.0087 42.4702C54.8416 76.7592 54.3849 103.369 76.3805 111.239C98.3786 119.109 129.065 102.748 159.169 55.5496C165.677 45.3484 188.687 15.1616 215.007 5.88443C247.167 -5.45054 283.113 5.1516 285.529 5.93488C301.338 11.062 315.325 21.4279 323.233 36.1243C333.399 55.0186 335.404 80.7871 316.422 112.065L213.887 280.196L187.994 232.071Z" :stroke="`var(${color})`"  stroke-width="0.7" stroke-linecap="round" stroke-linejoin="round"/>
        <path :stroke-dasharray="dash" :stroke-dashoffset="dashOffset" d="M270.066 100.35C272.841 94.7157 263.457 88.9858 254.127 91.3463C240.939 94.6812 229.094 110.052 204.117 143.866C179.139 177.677 146.454 196.693 108.652 201.109C75.6642 204.961 55.7636 196.606 41.7734 183.595C33.5185 175.919 8.47482 124.013 8.47482 124.013L8.47217 124.008" :stroke="`var(${color})`"  stroke-width="0.7" stroke-linecap="round" stroke-linejoin="round"/>
    
        <rect class="handle" width="14" height="14"
            style="--hover-anchor-color: white; --hover-anchor-stroke-width: 0.4"
            :x="logo.a.x - 7" :y="logo.a.y - 7"
            :transform="`rotate(45 ${logo.a.x} ${logo.a.y})`"
            stroke-opacity="1"
            @mousedown.prevent="(e)=>appState.setActiveAnchor(e,'logoMark', 'a')"
            stroke-width="1"
            stroke="var(--c-three)"/>

    </g>
</template>
<style lang="scss" scoped>
    .logomark {
        path {
            transition: stroke 3s ease-in-out;
        }
    }
</style>
<script setup>
    import gsap from 'gsap'
    import { useAppState } from '@/stores/appState'
    import { useBaseLayers } from '@/stores/baseLayers'

    const appState = useAppState()
    const layers = useBaseLayers()
    const logo = computed( () => layers.logoMark )

    const color = ref('--c-six')
    const colors = ['--c-one','--c-two', '--c-three', '--c-four', '--c-five', '--c-six' ]
    setInterval(() => {
        color.value = colors[Math.floor(Math.random() * (5 - 0 + 1) + 0)]
    }, 3500)

    // function easeInOutCirc(t, b, c, d) {
    //     t /= d/2
    //     if (t < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b
    //     t -= 2
    //     return c/2 * (Math.sqrt(1 - t*t) + 1) + b
    // }

 </script>