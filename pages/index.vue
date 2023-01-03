<template>

    <div class="background"></div>

    <Artboard></Artboard>

    <div class="me">
        <h2 class="tags">[Dude, Dutch, Dad, Daft, <span class="strike">Designer</span>, Developer, ...]</h2>
        <div class="follow">
            <span>Find me on</span>
            <span><a aria-label="Visit my Github" target="_blank" href="https://github.com/sietseveenman?tab=repositories">GitHub</a></span>
            <span><a aria-label="Visit my Linkedin account" target="_blank" href="https://www.linkedin.com/in/sietse-veenman-6b791136/">LinkedIn</a></span>
            <span><a aria-label="Visit my Instagram account" target="_blank" href="https://www.instagram.com/sietse_veenman/">Instagram</a></span>
        </div>
       
    </div>  

    <Menu></Menu>

</template>

<style lang="scss">
    .me {
        color: var(--c-one);
    }
    .follow {
        padding: 1em 0 1.35em 0.075em;
        display: flex;
        gap: 0.75em; 
        color: var(--c-four);
        font-size: 85%;
        
        a {
            display: block;
            transform: translateY(0.04em);
            pointer-events: all;
            color: currentColor;
            
            &:hover{
                color: var(--c-one);
            }
            &:focus {
                color: var(--c-five);
                outline: none;
            }
        }
    }
</style>

<style lang="scss" scoped>
    .me {
        pointer-events: none;
        position: absolute;
        top: 400px;
        left: 400px;
        width: 100%;
        padding: 330px 10px 30px 30px;
        z-index: 2;
        
        @media only screen and (max-width: 786px) {
            top: 300px;
            font-size: 12px;
        }
    }

</style>