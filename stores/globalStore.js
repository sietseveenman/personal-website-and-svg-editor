import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', {
		
	state: () =>  ({
		activePath: undefined,
		activeAnchor: undefined,
		
		logo: {
			a1: {
				x: 506, y: 218.168
			}
		},

		nose: {
			position: {
				x:800, y:590
			},
			a1: {
            x: 0, y: 640
			},
			c1: {
				x: 490, y: 550
			},
			c2: {
            x: 176, y: 158
			},
		}

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