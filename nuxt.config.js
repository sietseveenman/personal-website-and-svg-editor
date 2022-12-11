export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    // '@nuxtjs/svg'
  ],
  // svg: {
  //   vueSvgLoader: {
  //   },
  // },
  buildModules: [
    '@nuxtjs/google-fonts'
  ],
  
  app: {
    rootId: '__cake', // replacing __nuxt
  },

  googleFonts: {
    families: {
      'Roboto+Mono': true,
    },
    prefetch: true
  }
})