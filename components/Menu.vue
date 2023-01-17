<template>
    <div class="menu" ref="root">

        <button tabindex="1" class="toggle" @click="toggleInfo" :class="{'is-open':infoOpen}">
            <div>{{ infoOpen ? 'close' : 'info' }}</div>
        </button>

        <div class="content info" ref="info">
            <div class="wrap">
                <h3>Hi there!</h3>
                <p>
                    This website is the most pointless and useless vector editor out there<span class="o">.</span> Please have fun with it<span class="o">.</span> Use it on a desktop device for the best experience<span class="o">.</span>
                </p>

                <h3>How it works:</h3>
                <ul>
                    <li>
                        <span>Hold down <span :class="{'highlight': appState.keysDown.includes('Space')}">Space</span> and <span :class="{'highlight': appState.mouseDown }">Mouse</span> to drag around the canvas<span class="o">.</span></span>
                    </li>
                    <li>
                        <span>Use two fingers to drag around the canvas<span class="o">.</span></span>
                    </li>
                    <li>
                        <span>Grab and drag anchor points <svg width="12px" height="12px"  fill="transparent" style="transform: translateY(0.06em) rotate(45deg);"><rect width="12" height="12" x="0" y="0" stroke="var(--c-three)" stroke-width="2" ></rect></svg> or handles <svg width="16" height="16" fill="transparent" style="transform: translateY(0.25em);"><circle  stroke="var(--c-three)" stroke-width="1" r="7" cx="8" cy="8"></circle></svg> to manipulate paths<span class="o">.</span></span>
                    </li>
                    <li>
                        <span>Hold down <span :class="{'highlight': appState.keysDown.includes('AltLeft')}">Left Alt</span> to unlock mirrored handles<span class="o">.</span></span>
                    </li>
                    <li>
                        <span>Hold down <span :class="{'highlight': appState.keysDown.includes('ControlLeft')}">Left Control</span> to reach anchors that are blocked by overlapping paths<span class="o">.</span></span>
                    </li>
                    <li>
                        <span>Hold down <span :class="{'highlight': appState.keysDown.includes('ShiftLeft')}">Left Shift</span> to show path bounds and drag around the entire path<span class="o">.</span></span>
                    </li>
                    <li>
                        <span>Edits are saved for the next time you visit<span class="o">.</span> Click the reset button to clear all edits<span class="o">.</span></span>
                    </li>
                </ul>  

                <h3>About me:</h3>
                <p>
                    My name is Sietse Veenman<span class="o">.</span> I am a designer turned developer from the Netherlands<span class="o">,</span> currently holding the position of fullstack developer at <a href="https://wearejust.com/en" target="_blank" :tabindex="infoOpen ? '0' : '-1'">JUST</a><span class="o">.</span> I ❤️ working with <a href="https://vuejs.org/" target="__blank" :tabindex="infoOpen ? '0' : '-1'">VueJS</a> and <a href="https://getkirby.com/" target="_blank" :tabindex="infoOpen ? '0' : '-1'">Kirby</a><span class="o">.</span> When I am not writing code you can find me on my skateboard<span class="o">,</span> playing video games and mostly just spending time with the family<span class="o">.</span>
                </p>
                
            </div>
        </div>

        <div class="buttons">
            <button tabindex="2" class="btn themes" @click="toggleThemes" :class="{'is-open':themesOpen}">
                <div>{{ themesOpen ? 'close' : 'theme' }}</div>
            </button>
            <div class="content themes" ref="themes">
                <div class="wrap">
                    <ul>
                        <li v-for="theme in appState.themes" :key="theme.key">
                            <button :class="{ 'is-active': theme.key === appState.activeTheme }" @click="appState.$patch({ activeTheme: theme.key })" :tabindex="themesOpen ? '0' : '-1'">{{ theme.name }}</button>
                        </li>
                    </ul>
                </div>
            </div>
            <button class="btn" @click="appState.resetUserPosition()" :class="{ 'disabled': !appState.userPositionAltered }">center</button>
            <button class="btn" @click="baseLayers.rewind()" :class="{ 'disabled': !baseLayers.isAltered }">reset</button>
            <button class="btn save-svg" @click="downloadSvg">save svg</button>
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

        // document.addEventListener('click', (e) => { 
        //     if ( ! e.target.closest('.menu') ) {
        //         toggleInfo(e, false)
        //         toggleThemes(e, false)
        //     }
        // })

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
    h3, p, ul {
        font-size: 1.33rem;
        line-height: 1.575;
    }
    li + li {
        padding-top: 0.15em;
    }
    h3 {
        color: var(--c-five);
    }
    p {
        a {
            color: currentColor;
            &:hover,
            &:focus {
                color: var(--c-five);
            }
        }
        
        
    }
    p, ul {
        color: var(--c-three);
        &:not(:last-child) {
            padding-bottom: 1.45em;
        }
    }
    li span {
        line-height: 1.5;
        circle {
            stroke-width: 1!important;
        }
        rect {
            stroke-width: 2!important;
        }
    }
    .o { color: var(--c-four); }

    .menu {
        z-index: 10;
        position: fixed;
        right: 50px;
        top: 50px;
        --toggle-width: 60px;
        --toggle-height: 32px;
        
        right: 15px;
        top: 20px;

        @media only screen and (max-width: 786px) {
            // .save-svg {
            //     display: none;
            // }
            .content {
                backdrop-filter: blur(3px) brightness(45%);
            }
        }
        @media only screen and (min-width: 786px) {
            right: 50px;
            top: 50px;
        }
    }


    .toggle {
        z-index: 14;
        transform: scale(0.88);
        display: flex;
        align-items: center;
        justify-content: center;
        width: var(--toggle-width);
        height: var(--toggle-height);
        position: absolute;
        right: 0;
        top: 0;
        color: var(--c-four);

        & > div {
            transform: translateY(-0.07em);
        }

        &:hover,
        &:focus {
            color: var(--c-two);
            // transform: scale(0.88);
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
        backdrop-filter: blur(3px) brightness(45%);
        z-index: 13;
        max-width: 92vw;
        
    }
    .wrap {
        padding: 30px 35px 35px 30px;
        max-width: 92vw;
    }
    .info .wrap {
        width: 520px;
        ul {
            // max-width: 400px;
        }
    }
    .content.themes {
        top: 10px;
        position: absolute;
        z-index: 10;
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
        z-index: 11 ;
        border: none;
        backdrop-filter: none;
        &:hover,
        &:focus {
            & + .content {
                color: var(--c-two);
                border-color: currentColor;
            }
        }
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
        backdrop-filter: blur(3px) brightness(80%);

        // &:hover,
        // &:focus {
        //     color: rgba(red,1);
        // }
        
        &:not(.disabled) {
            outline: none;
            &:hover,
            &:focus {
                color: var(--c-two);
            }
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