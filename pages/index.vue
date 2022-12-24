<template>

    <div class="background"></div>

    <Artboard></Artboard>

    <div class="me">
        <h2 class="tags">[Dude, Dutch, Dad, <span class="strike">Designer</span>, Developer, ...]</h2>
        <div class="follow" style="color:{ $colors.two }">
            <span>Find me on</span>
            <span><a href="https://www.linkedin.com/in/sietse-veenman-6b791136/"><IconsPixedin /></a></span>
            <span><a href="https://www.instagram.com/sietse_veenman/"><IconsPixtagram /></a></span>
        </div>
        <small>hold down <span :style="{ color: store.keysDown.includes('Space') ? 'var(--c-three)' : 'currentColor' }">spacebar</span> and <span :style="{ color: store.keysDown.includes('Space') && store.mouseDown ? 'var(--c-three)' : 'currentColor' }">mouse</span> to drag the artboard</small><br/>
        <button @click="store.rewind()" :class="{'disabled': !store.anchorsHaveChanged}">reset anchors</button>
    </div>  


</template>
<script setup>

    import { useGlobalStore } from '@/stores/globalStore'
    const store = useGlobalStore()
    
</script>
<style lang="scss">
    .follow {
        padding: 0.75em 0 1.35em 0.075em;
        display: flex;
        gap: 0.5em; 
        a {
            display: block;
            transform: translateY(0.04em);
            pointer-events: all;
            &:hover svg path {
                fill: var(--c-one);
            }
        }
    }
</style>

<style lang="scss" scoped>
    .me {
        pointer-events: none;
        position: absolute;
        top: 400px;
        left: 400px;
        width: 100%;
        padding: 330px 10px 30px 30px;
        z-index: 2;
    }
    small {
        color: var(--c-two);
        opacity: 0.8;
    }
    button {
        border: none;
        background: transparent;
        color: var(--c-two);
        font-family: inherit;
        pointer-events: all;
        transition: opacity 0.4s ease-in-out;
        opacity: 0.8;

        &:not(.disabled):hover {
            cursor: pointer;
            color: red;
        }
        &.disabled {
            opacity: 0.15;
        }
    }
</style>