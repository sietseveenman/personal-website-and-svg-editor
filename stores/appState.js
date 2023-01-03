import { defineStore } from 'pinia'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin( ScrollToPlugin )

const initialPosition = JSON.stringify({
	x: window.innerWidth >= 786 ? 375 : 410,
	y: 355
})

const clamp = (num, min, max) => Math.min(Math.max(num, min), max)

export const useAppState = defineStore('appState', {
    state: () => ({ 
		themes: [
			{
				key: 'default',
				name: 'Default',
			}, 
			{
				key: 'dull',
				name: "Dull",
			}, 
			{
				key: 'matt',
				name: 'Matt',
			}, 
			{
				key: 'neon',
				name: 'Neon Knight',
			},
			{
				key: 'banana',
				name: "Banana's",
			},
			{
				key: 'pink-panther',
				name: 'Pink Panther',
			},
			{
				key: 'white',
				name: 'Bleached',
			},
		],
        activeTheme: useLocalStorage('piniaTheme', 'default'),
        userPosition: useLocalStorage('piniaPosition', JSON.parse(initialPosition)),
		userPositionAltered: useLocalStorage('piniaPositionAltered', false),
		activePath: undefined,
		activeAnchor: undefined,
				
		mouse: null,
		mouseDown: false,
		keysDown: [],
	}),

	actions: {

		updateUserPosition(diff) {
			if ( ! diff ) {
				console.error('No coordinates provided')
				return
			}
			this.userPositionAltered = true
			const x = this.userPosition.x + diff.x
			const y = this.userPosition.y + diff.y
			this.userPosition.x = clamp(x, 0, 2800)
			this.userPosition.y = clamp(y, 0, 2560)
			window.scrollTo(this.userPosition.x, this.userPosition.y)
		},

		resetUserPosition() {
			this.userPositionAltered = false
			gsap.to(window, {
				duration: 1, 
				ease: "power4.inOut", 
				scrollTo: JSON.parse(initialPosition),
				onComplete: () => { this.userPosition = JSON.parse(initialPosition) }
			})
		},

		keyDown(e) {
	        // prevent scrolling on space press
			if (e.keyCode == 32 && e.target == document.body) e.preventDefault()

            // Add Key code to store state
			if ( ! this.keysDown.includes(e.code) ) this.keysDown.push(e.code) 
		},

		keyUp(e) {
            // Remove the key from the store
			this.keysDown.splice( this.keysDown.indexOf(e.code), 1 )
		},

		resetDrag() {
			this.activePath = undefined
			this.activeAnchor = undefined
		},

		setActiveAnchor(e, path, anchorId) {
			this.activePath = path
			this.activeAnchor = anchorId
		}
	},
})