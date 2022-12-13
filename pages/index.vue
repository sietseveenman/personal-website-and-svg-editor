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
        <button @click="store.$reset()">reset</button>
    </div>  


</template>
<script setup>

    import { useGlobalStore } from '@/stores/globalStore'
    const store = useGlobalStore()
   
</script>
<style lang="scss">
    .follow {
        padding: 0.75em 0;
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
        top: 690px;
        left: 400px;
        width: 100%;
        padding: 265px 20px 20px;
        z-index: 2;
    }
    
    button {
        cursor: pointer;
        border: none;
        background: transparent;
        color: var(--c-two);
        font-family: inherit;
        pointer-events: all;

        &:hover {
            color: red;
        }
    }
</style>