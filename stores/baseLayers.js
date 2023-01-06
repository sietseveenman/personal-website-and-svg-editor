import { defineStore } from 'pinia'
import gsap from 'gsap'

const initialLayers = JSON.stringify({
	logo: {
		position: { x: 430, y: 460 },
		a1: { x: 506, y: 218.168 },
		a2: { x: 1, y: 84 },
	},

	logoMark: {
		position: { x: 2580, y: 2450 },
		a: { x: 213.134, y: 367.023 },
	},

	lineOne: {
		position: 	{ x: 810, y: 260 },
		a1: 		{ x: -30, y: 642 },
		a2: 		{ x: 633, y: 144 },
		c1: 		{ x: 352, y: 798 },
		c2: 		{ x: 100, y: 99 },
	},
	
	lineTwo: {
		position: 	{ x: 210, y: 1260 },
		a1: 		{ x: 0, y: 115 },
		a2: 		{ x: 260, y: 115 },
		c1: 		{ x: 50, y: 0 },
		c2: 		{ x: 210, y: 0 },
	},

	curveOne: {
		position: 	{ x: 1700, y: 560 },
		
		_1: 		{ x: 0, y: 0, joined: ['_1__h_2'] },
		_1__h_2: 	{ x: 190, y: 35 }, 
		
		_2__h_1: 	{ x: 65, y: 310, mirror: ['_2__h_2']  },
		_2: 		{ x: 335, y: 295,joined: ['_2__h_1', '_2__h_2' ] },
		_2__h_2: 	{ x: 600, y: 270, mirror: ['_2__h_1'] },
		
		_3__h_1: 	{ x: 480, y: 565 },
		_3: 		{ x: 745, y: 580 , joined: ['_3__h_1'] },
		
	},

	boobs: {
		position: 	{ x: 1390, y: 1620 },
		
		_1: 		{ x: 0, y: 0, joined: ['_1__h_2'] },
		_1__h_2: 	{ x: 0, y: 25 },
		
		_2__h_1: 	{ x: 25, y: 135, mirror: ['_2__h_2', '_4__h_2'], joined: ['_4__h_1']  },
		_2: 		{ x: 135, y: 135, joined: ['_2__h_1', '_2__h_2', '_4', '_4__h_1', '_4__h_2'] },
		_2__h_2: 	{ x: 245, y:  135, mirror: ['_2__h_1', '_4__h_1'], joined: ['_4__h_2'] },
		
		_3__h_1: 	{ x: 260, y: 0, mirror: ['_3__h_2'] },
		_3: 		{ x: 270, y: 0, joined: ['_3__h_1', '_3__h_2'] },
		_3__h_2: 	{ x: 280, y: 0 , mirror: ['_3__h_1']},

		_4__h_1: 	{ x: 295, y: 135, mirror: ['_4__h_2', '_2__h_2'], joined: ['_2__h_1'] },
		_4: 		{ x: 405, y: 135, joined: ['_4__h_1', '_4__h_2', '_2', '_2__h_1', '_2__h_2'] },
		_4__h_2: 	{ x: 515, y: 135, mirror: ['_4__h_1', '_2__h_1'], joined: ['_2__h_2'] },
		
		_5__h_1: 	{ x: 540, y: 25 },
		_5: 		{ x: 540, y: 0, joined: ['_5__h_1'] },
	},
	
	rectRadiusOne: {
		position: 	{ x: 800, y: 1130 },
		size: 200,
		axis: 'y',
		h1: { x: 0, y: 12 }
	},
	
	rectRadiusTwo: {
		position: 	{ x: 500, y: 950 },
		size: 140,
		axis: 'x',
		h1: { x: 26, y: 0 }
	},

	skateboard:  {
		position:{ x: 1310, y: 600 },
		
		_top:	 { x: 87, y: 0, joined: ['_top__h'], lockedAxis: 'x' },
		_top__h: { x: 39.8, y: 3.6 },

		_1: 	 { x: 0, y: 173, joined: ['_1__h_1', '_1__h_2'] },
		_1__h_1: { x: 0, y: 95, mirror: ['_1__h_2'] },
		_1__h_2: { x: 0, y: 251, mirror: ['_1__h_1'] },

		_2: 	 { x: 33, y: 550, joined: ['_2__h_1', '_2__h_2']  },
		_2__h_1: { x: 29, y: 543, mirror: ['_2__h_2'] },
		_2__h_2: { x: 37, y: 557, mirror: ['_2__h_1'] },

		_bot: 	 { x: 87, y: 520, joined: ['_bot__h'], lockedAxis: 'x' },
		_bot__h: { x: 78,  y: 520 },
	}
})

export const useBaseLayers = defineStore('baseLayers', {
	state: () => ({ 
        isAltered: useLocalStorage('piniaLayersAltered', false),
		... JSON.parse( initialLayers )
	}),
	// persist: {
	// 	storage: localStorage
	// },
	actions: {
		rewind() {
			this.isAltered = false
			const initial = JSON.parse(initialLayers)
			
			// TODO Reset the state in a better way (after last rewind animation has played)
			setTimeout(() => { this.$reset()}, 1100)

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