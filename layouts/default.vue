<template>
    <slot />
</template>

<script> 
    export default{
        mounted() {
            setTimeout(() => {
                window.scrollTo(375, 355)
                document.body.classList.add('show')
            }, 350);
        }
    }
</script>