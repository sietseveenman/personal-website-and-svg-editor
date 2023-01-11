<template>
    <div id="theme" :class="[store.activeTheme]">
        <slot />
    </div>
</template>

<script> 
    import { useAppState } from '@/stores/appState'

    export default {
        setup() {
            const store = useAppState()
            return { store }
        },

        computed: {
            artboardPos() { return this.store.userPosition }
        },  

        beforeCreate() {
            const faviconEl = document.querySelector('link[rel="icon"][type="image/svg+xml"]')
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
            mediaQuery.addEventListener('change', (e) => themeChange(e.matches) )
            function themeChange(match) {
                match
                    ? faviconEl.setAttribute('href', '/favicon/fav-dark.svg')
                    : faviconEl.setAttribute('href', '/favicon/fav-light.svg')
            }
        },

        mounted() {
            
            setTimeout(() => {
                window.scrollTo(this.artboardPos.x, this.artboardPos.y)
                document.body.classList.add('show')
            }, 350)
        }
    }
</script>
