<template>
    <div class="menu">

        <button class="toggle" @click="toggle" :class="{'is-open':open}">
            <div>{{ open ? '—' : 'i' }}</div>
        </button>
        
        <button class="btn" @click="store.rewind()" :class="{'disabled': !store.anchorsHaveChanged}">reset</button>
        
        <div class="content" ref="content">
            <div class="wrap">
                <small>My name is Sietse Veenman</small>.<small> I'm a designer turned <br/>developer from the Netherlands</small>.<small> Currently working<br/> as  fullstack developer at <a href="https://wearejust.com/nl" target="_blank">JUST</a></small>.<br/>
                <br/>
                <small>This website is probably the most useless and<br/> inefficient vector editor on the web</small>.<br/>
                <small style="color: currentColor">How does it work</small>:<br/>
                <small>Hold down <span :class="{'highlight': store.keysDown.includes('Space')}">Space</span> and <span :class="{'highlight': store.keysDown.includes('Space') && store.mouseDown}">Mouse</span> to drag the canvas</small>.<br/>
                <small>Grab anchor points and handles to manipulate shapes</small>.<br/>
                <small>Hold down <span :class="{'highlight': store.keysDown.includes('AltLeft')}">left Alt</span> to unlock mirrored handles</small>.<br/>
                <small>Your edits are saved for the next time you visit</small>.<br/><small>If you want, click the reset button to start over</small>.<br/>
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
        tween = gsap.timeline({paused: true, ease: "power4.inOut"})
        .to(content.value,{
            width: 'auto',
            duration: 0.16
        })
        .to(content.value,{
            height: 'auto',
            duration: 0.26
        }, '-=0.09')
        .from(content.value.firstElementChild, {
            opacity: 0,
            y: -4,
            duration: 0.17
        }, '-=0.15')

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

        --toggle-size: 32px;
    }

    .toggle {
        z-index: 1;
        transform: scale(0.88);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.4rem;
        width: var(--toggle-size);
        height: var(--toggle-size);
        position: absolute;
        right: 0;
        top: 0;
        color: var(--c-four);

        & > div {
            transform: translateY(-0.07em);
        }

        &:hover {
            color: var(--c-two);
            transform: scale(0.88);
            & + .content {
                color: var(--c-two);
            }
        }

    }
    .content {
        // direction: rtl;
        overflow: hidden;
        width: var(--toggle-size);
        height: var(--toggle-size);
        color: var(--c-four);
        border: 1px solid currentColor;
        border-radius: 10px;
        backdrop-filter: blur(3px) brightness(111%);
        white-space: nowrap;
        z-index: 3;
    }
    .wrap {
        padding: 30px 35px 35px 30px;
    }
    
    small {
        color: var(--c-three);
        opacity: 0.8;

        a {
            color: currentColor;
            &:hover {
                color: var(--c-five);
            }
        }
    }
    .highlight {
        color: var(--c-five);
    }
    .btn {
        position: absolute;
        right: 0;
        top: 30px;
        white-space: nowrap;
        margin-top: 1.25em;
        color: var(--c-four);
        font-size: 1.2rem;
        transition: opacity 0.4s ease-in-out;
        opacity: 0.65;
        padding: 0.4em 1em 0.65em;
        height: var(--toggle-size);
        border-radius: 10px;
        border: 1px solid currentColor;
        
        &:not(.disabled):hover {
            cursor: pointer;
            color: var(--c-two);
        }
        &.disabled {
            opacity: 0.3;
        }
    }
</style>