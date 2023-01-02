import { defineStore } from 'pinia'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin( ScrollToPlugin )

const initialPosition = JSON.stringify({
	x: 375,
	y: 355
})

export const useAppState = defineStore('appState', {
    state: () => ({ 
		themes: [
			{
				key: 'default',
				name: 'Default',
			}, 
			{
				key: 'dull',
				name: "Dim",
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
				key: 'pink-panther',
				name: 'Pink Panther',
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
		},
	},
})