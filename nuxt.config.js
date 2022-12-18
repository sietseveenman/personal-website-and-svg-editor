export default defineNuxtConfig({

  ssr: false,

  css: [
    '@/assets/css/main.scss'
  ],

  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@vueuse/nuxt',
  ],

  buildModules: [
    '@nuxtjs/google-fonts'
  ],

  googleFonts: {
    families: { 'Roboto+Mono': true  },
    prefetch: true
  },

  app: {
    rootId: '__cake', // replacing __nuxt id on root element
    head: {
      charset: 'UTF-8',
      viewport: 'width=device-width, initial-scale=1, minimum-scale=1',
      title: '<SietseVeenman />',
      description:`"{ "name": "Sietse Veenman", "gender": "Male", "age": 36, "job": "Developer" }"`
    }
  }
})