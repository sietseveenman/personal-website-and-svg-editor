export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    
  ],
  buildModules: [
    '@nuxtjs/google-fonts'
  ],
  
  googleFonts: {
    families: {
      'Roboto+Mono': true,
    },
    prefetch: true
  }
})