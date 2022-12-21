<template>
    <slot />
</template>

<script> 
    import { useGlobalStore } from '@/stores/globalStore'

    export default {
        setup() {
            const store = useGlobalStore()
            return { store }
        },
        computed: {
            artboardPos() { return this.store.artBoardPosition }
        },  
        mounted() {
            setTimeout(() => {
                window.scrollTo(this.artboardPos.x, this.artboardPos.y)
                document.body.classList.add('show')
            }, 350);
        }
    }
</script>
