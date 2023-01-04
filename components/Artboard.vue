<template>
    <div class="artboard" :class="{'grabbing': isGrabbing, 'can-grab': canGrab }">
        <svg width="2800" height="2560" viewBox="0 0 2800 2560" xmlns="http://www.w3.org/2000/svg" id="artboard">
            <rect width="100%" height="100%" fill="var(--c-background)"></rect>
            
            <LayersLine pathName="lineOne" palet="1"/>

            <LayersLine pathName="lineTwo" palet="4"/>

            <LayersPath pathName="curveOne" palet="3" speed="-0.6" dashArray="10 10 10"/>

            <LayersPath pathName="boobs" palet="1"/>
            
            <LayersRectRadius pathName="rectRadiusOne" style="--c-four: var(--c-six); --c-five: var(--c-three)"/>
            
            <LayersRectRadius pathName="rectRadiusTwo"/>
            
            <LayersSkateboard />
            
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

    let prevMouse = null
    let lockedAxis = undefined

    const isGrabbing = computed( () => appState.mouseDown && (appState.activeAnchor || appState.keysDown.includes('Space')) )
    const canGrab = computed( () => ! appState.mouseDown && appState.keysDown.includes('Space') )
    
    onMounted(() => {

        // Handle Mouse
        // ---------------------
        document.addEventListener( 'mousedown', handleMouseDown )
        document.addEventListener( 'mousemove', handleMouseMove )
        document.addEventListener( 'mouseup', handleMouseUp )


        // Handle Touch
        // ---------------------

        // document.querySelector('.artboard').addEventListener('touchmove', (event) => {
        //     // Get the touch points
        //     const touch1 = event.touches[0];
        //     const touch2 = event.touches[1];

        //     // Calculate the distance between the two touch points
        //     const distance = Math.sqrt(Math.pow(touch2.clientX - touch1.clientX, 2) +
        //         Math.pow(touch2.clientY - touch1.clientY, 2));

        //     console.log(distance);
        // });


        // Handle Trackpad
        // ---------------------
        // document.addEventListener('wheel', handleWheel)


        // Hanlde Keys
        // ---------------------
        window.addEventListener( 'keydown', (e) => appState.keyDown(e) )
        window.addEventListener( 'keyup', (e) => appState.keyUp(e) )
        window.addEventListener( 'blur', () => appState.keysDown = [] )
    })

    function handleMouseDown (e) {
        appState.mouseDown = true
    }

    function handleMouseUp (e) {
        appState.resetDrag()
        appState.mouseDown = false
        prevMouse = null
    }
    
    function handleWheel(e) {
        const strength = 0.35
        appState.updateUserPosition({
            x:e.deltaX*strength, 
            y:e.deltaY*strength
        })
    }

    function handleMouseMove(e) {
        const mx = e.clientX, my = e.clientY
        appState.mouse = { x: mx, y: my }
        
        if ( prevMouse && appState.mouseDown ) {
                
            const diff = { x: prevMouse.x - mx, y: prevMouse.y - my }
            
            if ( appState.keysDown.includes('Space') ) {
                appState.updateUserPosition(diff)
            }

            else if ( appState.activePath ) {
                const point = baseLayers[appState.activePath][appState.activeAnchor]
                handleDrag(point, diff)
                baseLayers.isAltered = true
            }
        }

        prevMouse = { x: mx, y: my }
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