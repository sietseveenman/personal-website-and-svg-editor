<template>
    <div class="artboard">
        <svg width="2800" height="2560" viewBox="0 0 2800 2560" fill="" xmlns="http://www.w3.org/2000/svg">
        
            <LayersLogo />
            
            <LayersLine pathName="lineOne"/>

            <LayersRectRadius pathName="rectRadiusOne" style="--c-four: var(--c-six); --c-five: var(--c-three)"/>

            <LayersRectRadius pathName="rectRadiusTwo"/>
        
            <LayersSkateboard />

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

    onMounted(() => {
        document.addEventListener( 'mouseup', handleMouseUp )
        document.addEventListener( 'mousedown', handleMouseDown )
        document.addEventListener( 'mousemove', handleMouseMove )

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
    
    function handleMouseMove(e) {
        const mx = e.clientX, my = e.clientY
        appState.mouse = { x: mx, y: my }
        
        if ( prevMouse && appState.mouseDown ) {
                
            const diff = { x: prevMouse.x - mx, y: prevMouse.y - my }
            
            if ( appState.keysDown.includes('Space') ) {
                appState.userPosition.x += diff.x
                appState.userPosition.y += diff.y
                window.scrollTo(appState.userPosition.x, appState.userPosition.y)
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

        movePoint(point, diff)

        if ( point.joined ) {
            point.joined.forEach(joinedPoint => {
                const point = baseLayers[appState.activePath][joinedPoint]
                movePoint(point, diff)
            })
        }

        if ( point.mirror && ! appState.keysDown.includes('AltLeft') ) {
            const mirrorPoint = baseLayers[appState.activePath][point.mirror]
            if ( point.lockedAxis !== 'x' ) mirrorPoint.x += diff.x
            if ( point.lockedAxis !== 'y' ) mirrorPoint.y += diff.y
        } 
    }

    function movePoint(point, diff) {
        if ( point.lockedAxis !== 'x' )  point.x -= diff.x
        if ( point.lockedAxis !== 'y' )  point.y -= diff.y
    }

</script>

<style lang="scss">
    .artboard {
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 2;
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