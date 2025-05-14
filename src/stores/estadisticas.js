import { defineStore } from 'pinia'

export const useEstadisticasStore = defineStore('estadisticasStore', {
  state: () => ({
    equipos: {
      rojos: [],
      blaus: [],
    },
    plantilla: {
      id: null,
      nombre: null,
      posicion: null,
      estadisticas: {
        colps: {
          guanyadors: 0,
          errades: 0
        },
        tretes: {
          directes: 0,
          faltes: 0
        }
      }
    }
    
  }),
  actions: { 
    addJugador(payload) {
      const j = JSON.parse(JSON.stringify(this.plantilla))
      j.nombre = payload.jugador.nombre
      j.posicion = payload.jugador.posicion
      j.id = payload.jugador.id
      this.equipos[payload.equipo].push(j)
    },
    editarJugador(payload) {
      console.log(payload)
    },
    eliminarJugador(payload) {
      console.log(payload)
    }
    
  }
})