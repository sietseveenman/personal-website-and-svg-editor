import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', {
	persist: true,
	
	state: () =>  ({

		activePath: undefined,
		activeAnchor: undefined,
		mouse: null,

		logo: {
			position: { x: 430, y: 460 },
			a1: { x: 506, y: 218.168 }
		},

		nose: {
			position: 	{ x: 760, y: 260 },
			a1: 		{ x: 0, y: 640 },
			a2: 		{ x: 590, y: 0 },
			c1: 		{ x: 508, y: 557 },
			c2: 		{ x: 124, y: 184 },
		},
		
		rectRadiusOne: {
			position: 	{ x: 1420, y: 540 },
			size: 180,
			axis: 'x',
			h1: { x: 18, y: 0 }
		},
		
		rectRadiusTwo: {
			position: 	{ x: 500, y: 960 },
			size: 140,
			axis: 'y',
			h1: { x: 0, y: 18 }
		}
	}),

	actions: {
		resetDrag() {
			document.body.classList.remove('dragging')
			this.activePath = undefined
			this.activeAnchor = undefined
		},
		setActiveAnchor(e, path, id) {
			document.body.classList.add('dragging')
			this.activePath = path
			this.activeAnchor = id
		},
		// updateLayer() {
		// }
	}
})