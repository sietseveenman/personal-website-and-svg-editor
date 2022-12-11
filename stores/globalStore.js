import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', {
  state: () =>  ({
    activePath: undefined,
    activeAnchor: undefined,
    logo: {
      a1: {
        x: 506,
        y: 218.168
      }
    },
  }),
  actions: {
    resetDrag() {
      this.activePath = undefined
      this. activeAnchor = undefined
    },
    setActiveAnchor(path, id) {
      this.activePath = path
      this.activeAnchor = id
    }
  }
})