<template>
    <slot />
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
        mounted() {
            setTimeout(() => {
                window.scrollTo(this.artboardPos.x, this.artboardPos.y)
                document.body.classList.add('show')
            }, 350);
        }
    }
</script>
