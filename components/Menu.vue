<template>
    <div class="menu">

        <button class="toggle" @click="toggle" :class="{'is-open':open}">
            <div>{{ open ? '—' : 'i' }}</div>
        </button>
        
        <button class="btn" @click="store.rewind()" :class="{'disabled': !store.anchorsHaveChanged}">reset</button>
        
        <div class="content" ref="content">
            <div class="wrap">
                <small>Hey there<span class="o">!</span> My name is Sietse Veenman and I am a designer turned fullstack developer<span class="o">,</span> currently working at <a href="https://wearejust.com/nl" target="_blank">JUST</a> in the Netherlands<span class="o">.</span>
                I ❤️ <a href="https://vuejs.org/" target="__blank">VueJS</a> and <a href="https://getkirby.com/" target="_blank">Kirby</a><span class="o">,</span> and have a strong foundation in technologies such as HTML5<span class="o">,</span> (S)CSS<span class="o">,</span> JS (Vanilla<span class="o">,</span> Vue<span class="o">,</span> jQuery<span class="o">,</span> Gsap)<span class="o">,</span> Gulp<span class="o">,</span> Webpack<span class="o">,</span> Vite<span class="o">,</span> PHP (Kirby<span class="o">,</span> Laravel<span class="o">,</span> Symfony<span class="o">,</span> Statamic<span class="o">,</span> Wordpress)<span class="o">,</span> Twig<span class="o">,</span> Blade<span class="o">,</span> SQL and Git<span class="o">.</span> In addition I have dipped my toes into other libraries such as Svelte<span class="o">,</span> React and ThreeJS<span class="o">,</span> and even dabbled in 3D modeling with Blender<span class="o">.</span>
                <br/>
                <br/>
                This website is probably the most useless and inefficient vector editor on the web</small><span class="o">.</span>
                <br/>
                <br/>
                <small style="color: currentColor">What can you do:</small><br/>
                <small>Hold down <span :class="{'highlight': store.keysDown.includes('Space')}">Space</span> and <span :class="{'highlight': store.keysDown.includes('Space') && store.mouseDown}">Mouse</span> to drag the canvas</small>.
                <br/>
                <small>Grab anchor points and handles to manipulate shapes</small>.
                <br/>
                <small>Hold down <span :class="{'highlight': store.keysDown.includes('AltLeft')}">left Alt</span> to unlock mirrored handles</small>.
                <br/>
                <small>Your edits are saved for the next time you visit</small>.<small>If you want, click the reset button to start over</small>.
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
        .to(content.value, {
            height: 'auto',
            duration: 0.26
        }, '-=0.09')
        .from(content.value.firstElementChild, {
            opacity: 0,
            y: -4,
            duration: 0.17
        }, '-=0.16')

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
        // overflow: hidden;
        width: var(--toggle-size);
        height: var(--toggle-size);
        color: var(--c-four);
        border: 1px solid currentColor;
        border-radius: 10px;
        backdrop-filter: blur(3px) brightness(85%);
        z-index: 3;
        max-width: 80vw;
        .o {
            color: var(--c-four);
        }
    }
    .wrap {
        padding: 30px 35px 35px 30px;
        width: 520px;
        max-width: 80vw;
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