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
      viewport: 'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1.0, user-scalable=no"',
      title: '<SietseVeenman />',
      meta: [
        { name: 'description', content: 'Hi there! I am a designer turned developer from the Netherlands. This site is the most pointless and useless vector editor on the web. Please have fun with it.' }
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: '/favicon/fav-light.svg',
        },
        {
          rel: 'icon',
          type: 'image/png',
          href: '/favicon/favicon.png',
        },
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