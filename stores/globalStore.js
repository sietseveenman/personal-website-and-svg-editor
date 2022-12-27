import { defineStore } from 'pinia'
import gsap from 'gsap'

const initialLayers = JSON.stringify({
	artBoardPosition: {
		x: 375,
		y: 355
	},

	logo: {
		position: { x: 430, y: 460 },
		a1: { x: 506, y: 218.168 }
	},

	lineOne: {
		position: 	{ x: 760, y: 260 },
		a1: 		{ x: 0, y: 640 },
		a2: 		{ x: 590, y: 0 },
		c1: 		{ x: 360, y: 740 },
		c2: 		{ x: 124, y: 184 },
	},
	
	rectRadiusOne: {
		position: 	{ x: 800, y: 1130 },
		size: 180,
		axis: 'y',
		h1: { x: 12, y: 0 }
	},
	
	rectRadiusTwo: {
		position: 	{ x: 500, y: 950 },
		size: 140,
		axis: 'x',
		h1: { x: 0, y: 26 }
	},

	skateboard: {
		position:{ x: 1300, y: 550 },
		
		_top:	 { x: 87, y: 0, joined: ['_top__h'] },
		_top__h: { x: 39.8, y: 3.6 },

		_1: 	 { x: 0, y: 173, joined: ['_1__h_1', '_1__h_2'] },
		_1__h_1: { x: 0, y: 95, mirror: '_1__h_2' },
		_1__h_2: { x: 0, y: 251, mirror: '_1__h_1' },

		_2: 	 { x: 33, y: 550, joined: ['_2__h_1', '_2__h_2']  },
		_2__h_1: { x: 29, y: 543, mirror: '_2__h_2' },
		_2__h_2: { x: 37, y: 557, mirror: '_2__h_1' },

		_bot: 	 { x: 87, y: 520, joined: ['_bot__h']  },
		_bot__h: { x: 78,  y: 520 },
	}
})

export const useGlobalStore = defineStore('global', {
	
	state: () => ({ 
		anchorsHaveChanged: false,

		activePath: undefined,
		activeAnchor: undefined,
		lockedAxis: undefined,
		mirrorPoint: undefined,
				
		mouse: null,
		mouseDown: false,
		keysDown: [],

		... JSON.parse(initialLayers)
	}),
	
	persist: true,

	actions: {
		keyDown(e) {
	
			if (e.keyCode == 32 && e.target == document.body) { // prevent scrolling on space press
				e.preventDefault()
			} 

			if ( ! this.keysDown.includes(e.code) ) {
				this.keysDown.push(e.code) 
			}
			
			if (e.keyCode == 32 && !this.activePath ) {
				document.body.classList.add('grabbable')
			}

		},
		
		keyUp(e) {
			this.keysDown.splice( this.keysDown.indexOf(e.code), 1 )
			document.body.classList.remove('grabbable')
		},

		resetDrag() {
			document.body.classList.remove('dragging')
			this.mouse = undefined
			this.activePath = undefined
			this.activeAnchor = undefined
			this.lockedAxis = []
		},

		setActiveAnchor(e, path, anchorId, lockAxis = undefined) {
			document.body.classList.add('dragging')
			this.activePath = path
			this.activeAnchor = anchorId
			this.lockedAxis = lockAxis
		},
		
		rewind() {
			
			this.anchorsHaveChanged = false

			const initial = JSON.parse(initialLayers)

			
			for (const layer in initial) {
			
				const layerObj = initial[layer]
				for (const property in layerObj) {
					
					if ( 'number' === typeof layerObj[property] ) {
						// console.log(property, layerObj[property], this[layer][property])
					}
					
					else if ( 'object' === typeof layerObj[property] ) {
				
						const obj = layerObj[property]
						for (const subProperty in  obj ) {
							
							if ( 'number' === typeof obj[subProperty] ) {
								
								if ( obj[subProperty] !== this[layer][property][subProperty] ) {

									const 
										start = this[layer][property][subProperty],
										end = obj[subProperty],
										diff = end - start,
										duration = 1 + Math.abs(diff*0.0005)

									let tween = gsap.to( obj, {
										[subProperty]: end,
										duration: duration,
										onUpdate: () => {
											// this[layer][property][subProperty] = easeInOutExpo(tween.time(), start, diff, duration )
											this[layer][property][subProperty] = easeOutElastic(tween.time(), start, diff, duration )
										},
									})
								}
							}
						}

					}
									
				}
			}
		},
	},
})

function easeInOutExpo (t, b, c, d) {
    if (t == 0) return b
    if (t == d) return b + c
    if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b
    return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b
}
function easeOutElastic (t, b, c, d, s = 1.70158) {
    var p = 0
    var a = c
    if (t == 0) return b
    if ((t /= d) == 1) return b + c
    if (!p) p = d * .3
    if (a < Math.abs(c)) {
        a = c
        var s = p / 4
    }
    else var s = p / (2 * Math.PI) * Math.asin(c / a)
    return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b
}