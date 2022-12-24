<template>
    <div class="artboard">
        <svg width="2800" height="2560" viewBox="0 0 2800 2560" fill="" xmlns="http://www.w3.org/2000/svg">
        
            <LayersLogo />
            
            <LayersNose />

            <LayersRectRadius pathName="rectRadiusOne" style="--c-four: var(--c-six); --c-five: var(--c-three)"/>

            <LayersRectRadius pathName="rectRadiusTwo"/>
        

            <!-- 
                Circel waarvan je alleen de straal als lijn zichtbaar is. Die straal kun je rond draggen om de circel vol te laten lopen
                <PieSlice />
            -->

            <!-- 
               Lijn met een aantal anker punten, als je die versleept gebeurt het zelfde aan de spiegel zijde (zelfde als board)
                <Mirror />
            -->


            <LayersSkateboard />

            <!-- <RectStretch originalCoords={{x: 460, y: 1190}} />
        
        
            <Board originalCoords={{x:920, y:1290}} /> -->
        
        </svg>
    </div>
</template>

<script setup>


    // TODO: Double click to move layers

    import { onMounted } from 'vue'
    import { useGlobalStore } from '@/stores/globalStore'

    const store = useGlobalStore()
    let prev = null

    onMounted(() => {
        document.addEventListener('mouseup', resetDrag)
        document.addEventListener('mousedown', handleMouseDown)
        document.addEventListener('mousemove', handleDrag )

        window.addEventListener('keydown',(e)=> store.keyDown(e))
        window.addEventListener('keyup',(e)=> store.keyUp(e))
    })

    function handleMouseDown(e) {
        if (e.target.closest('.handle')) return
        e.preventDefault()
        if ( store.keysDown.includes('Space') ) document.body.classList.add('dragging')
        store.mouseDown = true
    }

    function resetDrag (e) {
        e.target.classList.remove('dragging')
        document.body.classList.remove('dragging')
        store.resetDrag(undefined)
        store.mouseDown = false
        prev = null
    }
    
    function handleDrag (e) {
        const mx = e.clientX
        const my = e.clientY
        
        store.mouse = {
            x: mx,
            y: my
        }
        
        if ( prev ) {
            let diff = {
                x: prev.x - mx,
                y: prev.y - my,

            }
            if ( store.activePath && store.activeAnchor ) {
                const point = store[store.activePath][store.activeAnchor]
                if ( store.lockedAxis !== 'x' )  point.x -= diff.x
                if ( store.lockedAxis !== 'y' )  point.y -= diff.y

                if ( store.joinedPoints ) {
                    store.joinedPoints.forEach(joinedPoint => {
                        const jp = store[store.activePath][joinedPoint]
                        if ( store.lockedAxis !== 'x' ) jp.x -= diff.x
                        if ( store.lockedAxis !== 'y' ) jp.y -= diff.y
                    });
                } 

                store.anchorsHaveChanged = true
            }
            
            else if ( store.mouseDown && store.keysDown.includes('Space')) {
                store.artBoardPosition.x += diff.x
                store.artBoardPosition.y += diff.y
                window.scrollTo(store.artBoardPosition.x, store.artBoardPosition.y)
            }
        }

        prev = {
            x: mx,
            y: my
        }
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