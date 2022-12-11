export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@vueuse/nuxt',
  ],

  buildModules: [
    '@nuxtjs/google-fonts'
  ],
  
  app: {
    rootId: '__cake', // replacing __nuxt id on root element
  },

  googleFonts: {
    families: {
      'Roboto+Mono': true,
    },
    prefetch: true
  }
})