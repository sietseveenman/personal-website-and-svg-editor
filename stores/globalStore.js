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

	nose: {
		position: 	{ x: 760, y: 260 },
		a1: 		{ x: 0, y: 640 },
		a2: 		{ x: 590, y: 0 },
		c1: 		{ x: 330, y: 800 },
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
})

export const useGlobalStore = defineStore('global', {
	
	state: () => ({ 
		hasChanged: false,
		activePath: undefined,
		activeAnchor: undefined,
		mouseDown: false,

		mouse: null,
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
		},

		setActiveAnchor(e, path, id) {
			document.body.classList.add('dragging')
			this.activePath = path
			this.activeAnchor = id
		},
		
		rewind() {
			
			this.hasChanged = false

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
									
									

									const start = this[layer][property][subProperty]
									const end = obj[subProperty]
									const diff = end - start
									const duration = 1 + Math.abs(diff*0.0005)
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

// window.addEventListener('blur', () => useGlobalStore().keysDown = []);
// document.addEventListener('load', useGlobalStore().keysDown = []);

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