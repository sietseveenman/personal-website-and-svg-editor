import { defineStore } from 'pinia'


export const useAppState = defineStore('app', {
    state: () => ({ 
        
        userPosition: {
            x: 375,
            y: 355
        },

		activePath: undefined,
		activeAnchor: undefined,
				
		mouse: null,
		mouseDown: false,
		keysDown: [],
	}),

	actions: {

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