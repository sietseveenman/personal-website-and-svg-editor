<template>
    <div class="menu" ref="root">

        <button class="toggle" @click="toggleInfo" :class="{'is-open':infoOpen}">
            <div>{{ infoOpen ? 'close' : 'info' }}</div>
        </button>

        <div class="buttons">
            <button class="btn themes" @click="toggleThemes" :class="{'is-open':themesOpen}">
                <div>{{ themesOpen ? 'close' : 'theme' }}</div>
            </button>
            <button class="btn" @click="appState.resetUserPosition()" :class="{ 'disabled': !appState.userPositionAltered }">center</button>
            <button class="btn" @click="baseLayers.rewind()" :class="{ 'disabled': !baseLayers.isAltered }">reset</button>
            <button class="btn" @click="downloadSvg">save svg</button>

            <div class="content themes" ref="themes">
                <div class="wrap">
                    <ul>
                        <li v-for="theme in appState.themes" :key="theme.key">
                            <button :class="{ 'is-active': theme.key === appState.activeTheme }" @click="appState.$patch({ activeTheme: theme.key })">{{ theme.name }}</button>
                        </li>
                    </ul>
                </div>
            </div>

        </div>

        <div class="content info" ref="info">
            <div class="wrap">
                <small>Hi there<span class="o">!</span><br/>My name is Sietse Veenman and I am a designer turned web developer from the Netherlands<span class="o">.</span> Currently I am holding the position of fullstack developer at <a href="https://wearejust.com/nl" target="_blank">JUST</a><span class="o">.</span>
                I ❤️ <a href="https://vuejs.org/" target="__blank">VueJS</a> and <a href="https://getkirby.com/" target="_blank">Kirby</a><span class="o">,</span> and have a strong undestanding of technologies such as HTML5, (S)CSS, JS (Vanilla, Vue, jQuery, Gsap), Gulp, Webpack, Vite, PHP (Kirby, Laravel, Symfony, Statamic, Wordpress), Twig, Blade, SQL and Git<span class="o">.</span> In addition I have dipped my toes into other libraries such as Svelte, React and ThreeJS<span class="o">.</span>
                <br/>
                <br/>
                This site is probably the most pointless and useless (desktop only) vector editor on the web<span class="o">.</span> Please have fun with it<span class="o">.</span></small>
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

    const infoOpen = ref(false)
    const info = ref(null)

    const root = ref(null)
    const themesOpen = ref(false)
    const themes = ref(null)
    
    let infoTween = null
    let themesTween = null

    onMounted(() => {
        infoTween = gsap.timeline({paused: true, ease: "power4.inOut"})
            .to(info.value,{
                width: 'auto',
                duration: 0.16
            })
            .to(info.value, {
                height: 'auto',
                duration: 0.26
            }, '-=0.09')
            .from(info.value.firstElementChild, {
                opacity: 0,
                y: -4,
                duration: 0.17
            }, '-=0.16')

        themesTween = gsap.timeline({paused: true, ease: "power4.inOut"})
            .to(themes.value,{
                width: 'auto',
                duration: 0.16
            })
            .to(themes.value, {
                height: 'auto',
                duration: 0.26
            }, '-=0.09')
            .from(themes.value.firstElementChild, {
                opacity: 0,
                y: -4,
                duration: 0.17
            }, '-=0.16')
            .timeScale(1.4)

        document.addEventListener('click', (e) => { 
            if ( ! e.target.closest('.menu') ) {
                toggleInfo(e, false)
                toggleThemes(e, false)
            }
        })

        document.addEventListener('keyup', (e) => { 
            if (e.code === 'Escape') {
                toggleInfo(e, false)
                toggleThemes(e, false)
            }
        })
    })

    function toggleInfo(e, openOrClose = undefined) {
        if ( openOrClose !== undefined ) {
            infoOpen.value = openOrClose
        } else {
            infoOpen.value = !infoOpen.value
        }
        infoTween[infoOpen.value ? 'play':'reverse']()
    }

    function toggleThemes(e, openOrClose = undefined) {
        if ( openOrClose != undefined  ) {
            themesOpen.value = openOrClose
        } else {
            themesOpen.value = !themesOpen.value
        }
        themesTween[themesOpen.value ? 'play':'reverse']()
    }


    const colors = ['--c-background', '--c-one', '--c-two', '--c-three', '--c-four', '--c-five', '--c-six']
    
    function downloadSvg() {
        const rootStyles = window.getComputedStyle(document.getElementById('theme'))
        const artboard = document.getElementById('artboard')
        let templateString =`${artboard.outerHTML}`
        colors.forEach(color => {
            templateString = templateString.replaceAll(`var(${color})`, rootStyles.getPropertyValue(color))
        })
        let blob = new Blob([templateString], {type: 'image/svg+xml'})
        let url = URL.createObjectURL(blob)
        let link = document.createElement('a')
        link.href = url
        link.download = 'Sietse Veenman.svg'
        link.click()
        URL.revokeObjectURL(url)
    }
</script>

<style lang="scss" scoped>

    .menu {
        z-index: 10;
        position: fixed;
        right: 50px;
        top: 50px;
        --toggle-width: 60px;
        --toggle-height: 32px;
    }


    .toggle {
        z-index: 4;
        transform: scale(0.88);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.4rem;
        width: var(--toggle-width);
        height: var(--toggle-height);
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
        width: var(--toggle-width);
        height: var(--toggle-height);
        color: var(--c-four);
        border: 1px solid currentColor;
        border-radius: 10px;
        backdrop-filter: blur(3px) brightness(85%);
        z-index: 3;
        max-width: 80vw;
        .o { color: var(--c-four); }
    }
    .wrap {
        padding: 30px 35px 35px 30px;
        max-width: 80vw;
    }
    .info .wrap {
        width: 510px;
    }
    .content.themes {
        top: 10px;
        position: absolute;
        z-index: 1;
    }
    .themes .wrap {
        width: 180px;
        padding: 30px 15px 35px 30px;
        li {
            & + li {
                margin-top: 0.35em;
            }
            &:before { display: none; }
        }
        button {
            color: var(--c-three);
            opacity: 0.35;
            &:hover,
            &:focus {
                opacity: 1;
            }
            &.is-active {
                opacity: 1;
                color: var(--c-two)
            }
        }
    }
    .btn.themes {
        z-index: 2;
        border: none;
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

    .buttons {
        position: absolute;
        right: 0;
        top: 32px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }
    .btn {
        white-space: nowrap;
        margin-top: 10px;
        color: var(--c-four);
        font-size: 1.2rem;
        transition: 0.23s ease-in-out;
        opacity: 1;
        padding: 0.4em 1em 0.65em;
        height: var(--toggle-height);
        border-radius: 10px;
        border: 1px solid var(--c-four);
        z-index: 1;
        // backdrop-filter: blur(3px) brightness(85%);

        &:not(.disabled):hover {
            cursor: pointer;
            color: var(--c-two);
        }
        &.disabled {
            cursor: auto;
            opacity: 0.3;
        }
        &.is-active {
            color: var(--c-two);
            border-color: var(--c-two);
            
        }
        &.pen {
            opacity: 0.7;
            &.is-active,
            &:hover  {
                opacity: 1;
            }
        }
    }
</style>