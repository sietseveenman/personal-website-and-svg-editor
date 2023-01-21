<style lang="scss" scoped>
   .pentool {
       position: absolute;
       bottom: 10px;
       left: 20px;
       display: flex;
       flex-direction: column;
       align-items: flex-start;
       gap: 20px;
   }
   small {
        color: var(--c-four);
        font-size: 1.1rem;
        display: flex;

        span { 
            display: block; 
            opacity: 0; 
            transform: translateY(5px);
        }
   }
   button {
        z-index: 20;
        color: var(--c-five);
        border: 1px solid currentColor;
        font-size: 1.2rem;
        padding: 0.55em 1em 0.65em;
        border-radius: 10px;

        &:hover {
            color: var(--c-four);
        }

        &.is-active {
            position: fixed;
            bottom: 10px;
            left: 20px;
            color: black;
            background: var(--c-four);
        }
    }
</style>

<template>
    <div class="pentool">
        <small ref="yay"><span v-for="letter, index in text" :key="index" v-html="letter"></span></small>
        <button ref="btn" @click="appState.penToolActive = !appState.penToolActive" :class="{ 'is-active' : appState.penToolActive }">
            pen tool
        </button>
    </div>
</template>

<script setup>
    import { useAppState } from '@/stores/appState'
    import gsap from 'gsap'

    const appState = useAppState()

    const text = `You've found the pen button. Yay! Have fun!`.split('').map(letter=>letter === ' ' ? '&nbsp;' : letter)
    const btn = ref(null)
    const yay = ref(null)

    const observer = new IntersectionObserver( (entries, observer) => {
        entries.forEach((entry) => {
            if ( entry.isIntersecting ) {
                gsap.timeline()
                .to(yay.value.children, {
                    opacity: 1,
                    stagger: 0.02,
                    duration: 0.12,
                    y: 0,
                    delay: 0.3,
                })
                .to(yay.value.children, {
                    y: 5,
                    stagger: 0.02,
                    duration: 0.3
                }, '-=0.7')
                .to(yay.value.children,{
                    stagger: 0.01,
                    y: 0,
                    opacity: 0,
                    duration: 0.2,
                }, '+=2.2')
                observer.unobserve(entry.target)
            }
        })
    }, { threshold: 0.9 })

    onMounted(() => {
        observer.observe(btn.value);
    })

</script>