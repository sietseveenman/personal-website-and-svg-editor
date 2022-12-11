<template>

    <div class="background"></div>

    <Artboard></Artboard>

    <div class="me">
        <h2 class="tags">[Dude, Dutch, Dad, <span class="strike">Designer</span>, Developer, ...]</h2>
        <div class="flex follow" style="color:{ $colors.two }">
            <span>Find me on</span>
            <span><a href="https://www.linkedin.com/in/sietse-veenman-6b791136/"><IconsPixedin /></a></span>
            <span><a href="https://www.instagram.com/sietse_veenman/"><IconsPixtagram /></a></span>
        </div>
    </div>  


</template>
<script>
    export default {
        mounted() {
            window.scrollTo(340, 615)
        },
    }
</script>
<style lang="scss" scoped>
    .me {
        position: absolute;
        left: 420px;
        top: 690px;
        z-index: 2;
        pointer-events: none;
        padding: 265px 20px 20px;
    }
    .follow a{
        pointer-events: all;
    }
</style>