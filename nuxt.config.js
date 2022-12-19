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

  app: {
    rootId: '__cake', // replacing __nuxt id on root element
    head: {
      charset: 'UTF-8',
      viewport: 'width=device-width, initial-scale=1, minimum-scale=1',
      title: '<SietseVeenman />',
      description:`"{ "name": "Sietse Veenman", "gender": "Male", "age": 36, "job": "Developer" }"`,
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com'
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap',
          crossorigin: ''
        }
      ]
    }
  }
})