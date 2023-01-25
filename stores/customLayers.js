import { defineStore } from 'pinia'
import { useAppState } from '@/stores/appState'

const appState = useAppState()

export const useCustomLayers = defineStore('customLayers', {
	state: () => ({ 
        editingLayer: false,
        activeLayer: null,
        handleCount: null,
		layerObjects: {},
	}),

	// persist: {storage: localStorage },
    
    getters: {
        layers: (state) => {
            return Object.entries(state.layerObjects).map(layer => {
                return { key: layer[0], data: layer[1] }
            })
        },
        indexes: (state) => Object.keys(state.layerObjects).map(key => Number(key.replace('_','')) ),
        lastIndex: (state) => state.indexes.length
    },

	actions: {
        keyUp(e) {
            console.log(e.code)
            if (e.code === 'Escape') {
                delete this.layerObjects[ this.activeLayer ][`_${this.handleCount}__h_2`]
                delete this.layerObjects[ this.activeLayer ][`_${this.handleCount}__h_1`]
                delete this.layerObjects[ this.activeLayer ][`_${this.handleCount}`]
                this.editingLayer = false
                this.activeLayer = null
                this.handleCount = null
                appState.resetDrag()
                console.log('Stop editing custom path')
            }
        },
        previewNextPoint(e) {
            if ( this.editingLayer ) {  
                const prevPoint = this.layerObjects[ this.activeLayer ][`_${this.handleCount}__h_2`]
                const startPos = {
                    x: prevPoint.x,
                    y: prevPoint.y,
                } 
                const next = this.handleCount+1
                this.layerObjects[ this.activeLayer ][`_${next}__h_1`] = { ...startPos }
                this.layerObjects[ this.activeLayer ][`_${next}`] = {...startPos, ...{joined: [`_${next}__h_1`]} }
                this.handleCount++
                appState.setActiveAnchor(e, this.activeLayer, `_${next}`)
            }

        },
		addPathAnchor(e) {

            if ( ! this.editingLayer ) {  

                this.editingLayer = true
                const layerKey = `_${ this.lastIndex+1 }`

                const position = {
                    x: e.clientX + window.scrollX,
                    y: e.clientY + window.scrollY,
                } 

                this.layerObjects[ layerKey ] = {
                    position: position,
                    _1: { x:0, y:0 },
                    _1__h_2: { x: 0, y: 0 },
                }
                
                this.activeLayer = layerKey
                this.handleCount = 1,
                appState.setActiveAnchor(e, layerKey, '_1__h_2')
                console.log('Starting new layer at:', position)

            }

            else {
                // TODO already set the next point handle 1 and anchor on mouse move.
                const prevPos = this.layerObjects[ this.activeLayer ].position
                const position = {
                    x: (e.clientX + window.scrollX) - prevPos.x,
                    y: (e.clientY  + window.scrollY) - prevPos.y,
                }
                
                const next = this.handleCount
                
                // this.layerObjects[ this.activeLayer ][`_${next}__h_1`] = { ...position, ...{mirror: [`_${next}__h_2`]} }
                // this.layerObjects[ this.activeLayer ][`_${next}`] = {...position, ...{joined: [`_${next}__h_1`, `_${next}__h_2` ]} }
                this.layerObjects[ this.activeLayer ][`_${next}__h_2`] = { ...position, ...{mirror: [`_${next}__h_1`]} }
                
                appState.setActiveAnchor(e, this.activeLayer, `_${next}__h_2`)
                console.log('Adding next anchor point to the path', position)
            }
            
        }
	}
})
