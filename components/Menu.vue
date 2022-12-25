<template>
    <div class="menu">

        <button class="toggle" @click="toggle" :class="{'is-open':open}">
            <div>i</div>
        </button>
        
        <div class="content" ref="content">
            <div class="wrap">
                <small>hold down <span :style="{ color: store.keysDown.includes('Space') ? 'var(--c-three)' : 'currentColor' }">spacebar</span> and <span :style="{ color: store.keysDown.includes('Space') && store.mouseDown ? 'var(--c-three)' : 'currentColor' }">mouse</span> to drag the artboard</small><br/>
                <small>hold down <span :style="{ color: store.keysDown.includes('AltLeft') ? 'var(--c-three)' : 'currentColor' }">left Alt</span> to unlock mirrored handles</small><br/>
                <button class="btn" @click="store.rewind()" :class="{'disabled': !store.anchorsHaveChanged}">reset anchors</button>
            </div>
        </div>

    </div>
</template>

<script setup>

import gsap from 'gsap'
    import { useGlobalStore } from '@/stores/globalStore'
    
    const store = useGlobalStore()
    const open = ref(false)
    
    const content = ref(null)
    let tween = null

    onMounted(() => {
        tween = gsap.timeline({paused: true})
        .to(content.value,{
            width: 'auto',
            height: 'auto',
        })

    })

    function toggle() {
        if ( tween ) tween.play()
        open.value = !open.value
        tween[open.value ? 'play':'reverse']()
    }
</script>

<style lang="scss" scoped>

    .menu {
        z-index: 10;
        position: fixed;
        right: 50px;
        top: 50px;
    }
    .toggle {
        z-index: 1;
        transform: scale(0.88);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.4rem;
        width: 28px;
        height: 28px;
        position: absolute;
        right: 0;
        top: 0;
        border: 1px solid currentColor;
        border-radius: 10px;

        & > div {
            transform: translateY(-0.07em);
        }

        &:hover {
            color: var(--c-three);
            transform: scale(0.88);
        }

    }
    .content {
        direction: rtl;
        overflow: hidden;
        width: 28px;
        height: 28px;
        
        backdrop-filter: blur(5px);
        white-space: nowrap;
    }
    .wrap {
        padding: 40px 10px;
    }
    
    small {
        color: var(--c-two);
        opacity: 0.8;
    }
    .btn {
        color: var(--c-two);
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