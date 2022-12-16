import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', {
		
	state: () =>  ({

		activePath: undefined,
		activeAnchor: undefined,
		mouse: null,
		// diff: null,

		logo: {
			a1: { x: 506, y: 218.168 }
		},

		nose: {
			position: 	{ x:800, y:590 },
			a1: 		{ x: 0, y: 640 },
			c1: 		{ x: 490, y: 550 },
			c2: 		{ x: 176, y: 158 },
		},
		
		rectRadiusOne: {
			position: 	{ x: 1380, y: 920 },
			size: 140,
			h1: { x: 0, y: 16 }
		},
		
		rectRadiusTwo: {
			position: 	{ x: 460, y: 1220 },

			size: 140,
			h1: { x: 16, y: 0 }
		}
	}),

	persist: true,

	actions: {
		resetDrag() {
			this.activePath = undefined
			this.activeAnchor = undefined
		},
		setActiveAnchor(path, id) {
			this.activePath = path
			this.activeAnchor = id
		},
		// updateLayer() {
		// }
	}
})