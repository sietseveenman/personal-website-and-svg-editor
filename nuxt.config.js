import { resolve } from 'path'
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
      robots: 'index,follow',
      meta: [
        { name: 'description', content: 'Hi there! I am a designer turned developer from the Netherlands. This site is the most pointless and useless vector editor on the web. Please have fun with it.' },
        { name: 'og:title', content: '<SietseVeenman />' },
        { name: 'og:description', content: 'Hi there! I am a designer turned developer from the Netherlands. This site is the most pointless and useless vector editor on the web. Please have fun with it.' },
        { name: 'og:type', content: 'website' },
        { name: 'og:url', content: 'https://sietseveenman.nl' },
        { name: 'og:image', content: 'https://sietseveenman.nl/share-square.png' },
        { name: 'og:site_name', content: 'Sietse Veenman' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: '<SietseVeenman />' },
        { name: 'twitter:image', content: 'https://sietseveenman.nl/share-landscape.png' },
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