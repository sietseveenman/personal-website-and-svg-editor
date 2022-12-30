import { defineStore } from 'pinia'
import gsap from 'gsap'

const initialLayers = JSON.stringify({
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
		h1: { x: 0, y: 12 }
	},
	
	rectRadiusTwo: {
		position: 	{ x: 500, y: 950 },
		size: 140,
		axis: 'x',
		h1: { x: 26, y: 0 }
	},

	skateboard: {
		position:{ x: 1300, y: 550 },
		
		_top:	 { x: 87, y: 0, joined: ['_top__h'], lockedAxis: 'x' },
		_top__h: { x: 39.8, y: 3.6 },

		_1: 	 { x: 0, y: 173, joined: ['_1__h_1', '_1__h_2'] },
		_1__h_1: { x: 0, y: 95, mirror: '_1__h_2' },
		_1__h_2: { x: 0, y: 251, mirror: '_1__h_1' },

		_2: 	 { x: 33, y: 550, joined: ['_2__h_1', '_2__h_2']  },
		_2__h_1: { x: 29, y: 543, mirror: '_2__h_2' },
		_2__h_2: { x: 37, y: 557, mirror: '_2__h_1' },

		_bot: 	 { x: 87, y: 520, joined: ['_bot__h'], lockedAxis: 'x' },
		_bot__h: { x: 78,  y: 520 },
	}
})

export const useBaseLayers = defineStore('base-layers', {
    state: () => ({ 
        isAltered: false,
		... JSON.parse( initialLayers )
	}),
	
	persist: true,

	actions: {
		rewind() {
			this.isAltered = false
			const initial = JSON.parse(initialLayers)
			
			// TODO Reset state after animation
			setTimeout(() => {
				this.$reset()
			}, 1200);

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
	}
})

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