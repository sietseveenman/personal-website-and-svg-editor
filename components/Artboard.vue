<template>
    <div class="artboard">
        <svg width="2800" height="2560" viewBox="0 0 2800 2560" fill="" xmlns="http://www.w3.org/2000/svg">
        
            <LayersLogo />
            
           <!-- 
            <RectRadius originalCoords={{x: 1380, y: 920}} />
        
            <RectStretch originalCoords={{x: 460, y: 1190}} />
        
            <Nose originalCoords={{x:800, y:590}} />
        
            <Board originalCoords={{x:920, y:1290}} /> -->
        
        </svg>
    </div>
</template>
<script>
// export default {
    
// }
</script>
<style lang="scss">
    .artboard {
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 2;
    }
    .handle {
        z-index: 999;
        cursor: pointer;
        transition: 
            stroke 0.2s ease-in-out,
            stroke-width 0.2s ease-in-out;
        &:hover {
            stroke: var(--hover-anchor-color);
            stroke-width: var(--hover-anchor-stroke-width);
        }
    }
</style>