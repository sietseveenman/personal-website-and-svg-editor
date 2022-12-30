<template>
    <div class="menu">

        <button class="toggle" @click="toggle" :class="{'is-open':open}">
            <div>{{ open ? '—' : 'i' }}</div>
        </button>
        
        <button class="btn" @click="baseLayers.rewind()" :class="{'disabled': !baseLayers.isAltered}">reset</button>
        
        <div class="content" ref="content">
            <div class="wrap">
                <small>Hi there<span class="o">!</span> My name is Sietse Veenman and I am a designer turned web developer from the Netherlands<span class="o">.</span> Currently I am holding the position of fullstack developer at <a href="https://wearejust.com/nl" target="_blank">JUST</a><span class="o">.</span>
                I ❤️ <a href="https://vuejs.org/" target="__blank">VueJS</a> and <a href="https://getkirby.com/" target="_blank">Kirby</a><span class="o">,</span> and have a strong foundation in technologies such as HTML5, (S)CSS, JS (Vanilla, Vue, jQuery, Gsap), Gulp, Webpack, Vite, PHP (Kirby, Laravel, Symfony, Statamic, Wordpress), Twig, Blade, SQL and Git<span class="o">.</span> In addition I have dipped my toes into other libraries such as Svelte, React and ThreeJS<span class="o">.</span> And have also dabbled in 3D modeling with Blender<span class="o">.</span>
                <br/>
                <br/>
                This site is probably the most useless, desktop only, vector editor on the web<span class="o">.</span> Please have fun with it<span class="o">.</span></small>
                <br/>
                <br/>
                <small style="color: var(--c-five)">How it works:</small><br/>
                <ul>
                    <li>
                        <small>Hold down <span :class="{'highlight': appState.keysDown.includes('Space')}">Space</span> and <span :class="{'highlight': appState.keysDown.includes('Space') && appState.mouseDown}">Mouse</span> to drag the canvas<span class="o">.</span></small>
                    </li>
                    <li>
                        <small>Grab anchor points or handles to manipulate paths<span class="o">.</span></small>
                    </li>
                    <li>
                        <small>Hold down <span :class="{'highlight': appState.keysDown.includes('AltLeft')}">left Alt</span> to unlock mirrored handles<span class="o">.</span></small>
                    </li>
                    <li>
                        <small>Edits are saved for the next time you visit<span class="o">.</span><br/>Click the reset button to start over<span class="o">.</span></small>
                    </li>
                </ul>
                
            </div>
        </div>

    </div>
</template>

<script setup>

    import gsap from 'gsap'
    import { useAppState } from '@/stores/appState'
    import { useBaseLayers } from '@/stores/baseLayers'
    
    const appState = useAppState()
    const baseLayers = useBaseLayers()

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
        z-index: 4;
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
        overflow: hidden;
        position: relative;
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
    ul {
        padding-top: 0.25em;
        list-style: none;
    }
    li {
        display: flex;
        line-height: 1.4;
        &:before {
            content: '•';
            color: var(--c-five);
            margin-right: 0.4em ;
            transform: translateY(-0.05em);
        }
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
        opacity: 1;
        padding: 0.4em 1em 0.65em;
        height: var(--toggle-size);
        border-radius: 10px;
        border: 1px solid var(--c-four);
        z-index: 1;
        &:not(.disabled):hover {
            cursor: pointer;
            color: var(--c-two);
        }
        &.disabled {
            cursor: auto;
            opacity: 0.3;
        }
    }
</style>