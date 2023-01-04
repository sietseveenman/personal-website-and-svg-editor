
import VueGtag from 'vue-gtag-next'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueGtag, {
    property: {
      id: 'G-DKKBR8GNY0',
      params: {
        anonymize_ip: true,
      },
    },
  })
})