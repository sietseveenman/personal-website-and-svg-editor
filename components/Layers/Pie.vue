<template>
    <g :transform="`translate(${position.x}, ${position.y})`" fill="transparent" ref="pie">
        
        <circle
            transform-origin="180 180"
            :stroke="color" r="180"
            cx="180" cy="180"
            stroke-dasharray="1130"
            :stroke-dashoffset="-(1130 / 360) * arc" />
            
        <line transform-origin="180 180"
            stroke="var(--c-six)" x1="180" y1="180" x2="360" y2="180" />
        
        <g :transform="`rotate(${arc})`" transform-origin="180 180">
            <line :stroke="color" x1="180" y1="180" x2="360" y2="180" />
            <circle stroke="var(--c-five)" r="10" class="handle"
                @mousedown="active=true"
                @touchstart.prevent="active=true"
                :cx="handle" cy="180"/>
        </g>

            
    </g>
</template>

<script setup>
    import { useAppState } from '@/stores/appState'
    import { useBaseLayers } from '@/stores/baseLayers'

    const appState = useAppState()
    const layers = useBaseLayers()

    const position = computed( () => layers.pie.position )
    const arc = computed( () => layers.pie.arc.degrees )
    const handle = computed( () => layers.pie.arc.handle )
    const color = computed( () => {
        return appState.activeTheme === 'default' 
            ? `hsl(${layers.pie.arc.degrees - 45} 100% 50%)`
            :  'var(--c-four)'
    })

    const pie = ref(null)
    
    let active = false

    document.addEventListener('mousemove', mouseMove)
    document.addEventListener('mouseup', () => active = false)
    document.addEventListener('touchmove', handleTouchMove )
    document.addEventListener('touchend', () => active = false)

    let prev = null

    function handleTouchMove (e) {

        if ( ! active ) return

        const one = e.changedTouches[0]

        if ( e.changedTouches.length === 1 ) {
            moveHandle(one.clientX, one.clientY)
        }

    }

    function moveHandle(clientX, clientY) {
        layers.isAltered = true

        const rect = pie.value.getBoundingClientRect()

        const dx = clientX - (rect.x + (rect.width/2))
        const dy = clientY - (rect.y + (rect.width/2))

        const clientDistanceFromCenter = distanceBetweenPoints(
            clientX, 
            clientY, 
            (rect.x + (rect.width/2)), 
            (rect.y + (rect.height/2))
        ) + 180

        const angle = Math.atan2(dy, dx)
        const angleInDegrees = angle * 180 / Math.PI
        const full = (angleInDegrees + 360) % 360
        layers.pie.arc.degrees = full
        layers.pie.arc.handle = clientDistanceFromCenter >= 360 ? 360 : clientDistanceFromCenter
    }

    function mouseMove (e) {
        e.preventDefault()
        if ( ! active ) return
        moveHandle(e.clientX, e.clientY)
    }

    function distanceBetweenPoints(p1x, p1y, p2x, p2y) {
        if( p1x === undefined || p1y === undefined || p2x === undefined || p2y === undefined ) {
            console.error('not all coördinates have been defined', p1x, p1y, p2x, p2y)
            return false
        }
        return Math.sqrt( Math.pow(p1x - p2x, 2) + Math.pow(p1y - p2y, 2) )  
    }

</script>