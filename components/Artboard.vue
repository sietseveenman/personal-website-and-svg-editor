<template>
    <div class="artboard" :class="{'grabbing': isGrabbing, 'can-grab': canGrab }"
        @mousedown.prevent="handleMouseDown"
        @mousemove.prevent="handleMouseMove"
        @mouseup.prevent="handleMouseUp"
        @wheel.prevent="handleWheel"
        >
        <svg width="3200" height="3200" viewBox="0 0 3200 3200" xmlns="http://www.w3.org/2000/svg" id="artboard">
            <rect width="100%" height="100%" fill="var(--c-background)"></rect>
            
            <LayersLine pathName="lineOne" palet="1"/>

            <LayersLine pathName="lineTwo" palet="4"/>

            <LayersPath pathName="curveOne" palet="3" :speed="-0.6" dashArray="10 10 10"/>

            <LayersPath pathName="boobs" palet="1"/>
            
            <LayersRectRadius pathName="rectRadiusOne" style="--c-four: var(--c-six); --c-five: var(--c-three)"/>
            
            <LayersRectRadius pathName="rectRadiusTwo"/>
            
            <LayersSkateboard />
            
            <LayersLogoMark />

            <LayersLogo />

        </svg>
    </div>
</template>

<script setup>

    import { onMounted } from 'vue'
    import { useAppState } from '@/stores/appState'
    import { useBaseLayers } from '@/stores/baseLayers'

    const appState = useAppState()
    const baseLayers = useBaseLayers()

    let prevClient = null
    let lockedAxis = undefined

    const isGrabbing = computed( () => appState.mouseDown && (appState.activeAnchor || appState.keysDown.includes('Space')) )
    const canGrab = computed( () => ! appState.mouseDown && appState.keysDown.includes('Space') )
    
    onMounted(() => {

        // Handle Touch
        // ---------------------

        document.addEventListener('touchstart', handleTouchStart )
        document.addEventListener('touchmove', handleTouchMove )
        document.addEventListener('touchend', handleTouchEnd )
      
        // Handle Trackpad
        // ---------------------
        document.addEventListener('wheel', handleWheel)

        // Hanlde Keys
        // ---------------------
        window.addEventListener( 'keydown', (e) => appState.keyDown(e) )
        window.addEventListener( 'keyup', (e) => appState.keyUp(e) )

        window.addEventListener( 'blur', () => appState.keysDown = [] )
    })

    function handleTouchStart (e) {
        e.preventDefault()
        const touches = e.changedTouches   
        for (let i = 0; i < touches.length; i++) {
            appState.ongoingTouches.push( copyTouch(touches[i]) )
        }
    }

    function handleTouchMove (e) {
        // e.preventDefault()
        const touches = e.changedTouches
        const one = appState.ongoingTouches[ongoingTouchIndexById(touches[0].identifier)]

        if ( touches.length === 2 ) {
            const two = appState.ongoingTouches[ongoingTouchIndexById(touches[1].identifier)]
            const distance = {
                x: - ((touches[0].clientX - one.clientX) + (touches[1].clientX - two.clientX)) / 2,
                y: - ((touches[0].clientY - one.clientY) + (touches[1].clientY - two.clientY)) / 2,
            }
            appState.updateUserPosition(distance)
        }

        else if ( appState.activePath ) {
            const point = baseLayers[appState.activePath][appState.activeAnchor]
            const distance = {
                x: - (touches[0].clientX - one.clientX),
                y: - (touches[0].clientY - one.clientY),
            }
            handleDrag(point, distance)
            baseLayers.isAltered = true
        }

        for (let i = 0; i < touches.length; i++) {
            const idx = ongoingTouchIndexById(touches[i].identifier)
            if (idx >= 0) appState.ongoingTouches.splice(idx, 1, copyTouch(touches[i]))
        }
    }
  
    function handleTouchEnd(e) {
        // e.preventDefault()
        appState.ongoingTouches.length = 0
        appState.resetDrag()
    }

    function copyTouch({ identifier, clientX, clientY }) {
        return { identifier, clientX, clientY }
    }

    function ongoingTouchIndexById(idToFind) {
        for (let i = 0; i < appState.ongoingTouches.length; i++) {
            const id = appState.ongoingTouches[i].identifier
            if (id === idToFind) return i
        }
        return -1
    }

    function handleMouseDown (e) {
        appState.mouseDown = true
    }

    function handleMouseUp (e) {
        appState.resetDrag()
        appState.mouseDown = false
        prevClient = null
    }
    
    function handleWheel(e) {
        if ( appState.activeAnchor ) return
        const strength = 0.35
        appState.updateUserPosition({
            x:e.deltaX*strength, 
            y:e.deltaY*strength
        })
    }

    function handleMouseMove(e) {
        const mx = e.clientX, my = e.clientY
        appState.mouse = { x: mx, y: my }
        
        if ( prevClient && appState.mouseDown ) {
                
            const diff = { x: prevClient.x - mx, y: prevClient.y - my }
            
            if ( appState.keysDown.includes('Space') ) {
                appState.updateUserPosition(diff)
            }

            else if ( appState.activePath ) {
                const point = baseLayers[appState.activePath][appState.activeAnchor]
                handleDrag(point, diff)
                baseLayers.isAltered = true
            }
        }

        prevClient = { x: mx, y: my }
    }

    function handleDrag(point, diff) {
        lockedAxis = point.lockedAxis

        movePoint(point, diff)

        if ( point.joined ) {
            point.joined.forEach(joinedPoint => {
                const point = baseLayers[appState.activePath][joinedPoint]
                movePoint(point, diff)
            })
        }

        if ( point.mirror && ! appState.keysDown.includes('AltLeft') ) {
            point.mirror.forEach(mirrorPoint => {
                const point = baseLayers[appState.activePath][mirrorPoint]
                if ( lockedAxis !== 'x' ) point.x += diff.x
                if ( lockedAxis !== 'y' ) point.y += diff.y
            })
        } 
    }

    function movePoint(point, diff) {
        if ( lockedAxis !== 'x' )  point.x -= diff.x
        if ( lockedAxis !== 'y' )  point.y -= diff.y
    }

</script>

<style lang="scss">
    .artboard {
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 2;
        
        &.can-grab {
            * { cursor: grab !important; }
        }
        &.grabbing {
            * { cursor: grabbing !important; }
        }
        
        svg {
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            overflow: hidden;
        }
    }

    .handle {
        cursor: grab;
        z-index: 999;

        transition: 
            r 0.42s cubic-bezier(0.785, 0.220, 0.260, 1.420),
            stroke 0.2s ease-in-out,
            stroke-width 0.2s ease-in-out;

        &:hover {
            stroke: var(--hover-anchor-color);
            stroke-width: var(--hover-anchor-stroke-width);
        }
    }
</style>