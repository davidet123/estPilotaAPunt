import { defineStore } from 'pinia'

export const useMarcadorStore = defineStore('marcadorStore', {
  state: () => ({
    marcador: {
      rojos: {
        punts: 0,
        jocs: 0
      },
      blaus: {
        punts: 0,
        jocs: 0
      }
    },
    partidaA: 25,
    puntsStr: ["NET", "15", "30", "VAL"],
    test: "TEST123",
    estadisticas: {
      rojos: {
        vals: {
          treta: {
            conseguidos: 0,
            totales: 0
          },
          rest: {
            conseguidos: 0,
            totales: 0
          }
        }
      },
      blaus: {
        vals: {
          treta: {
            conseguidos: 0,
            totales: 0
          },
          rest: {
            conseguidos: 0,
            totales: 0
          }
        }
      },
    },
    treta: 'rojos',
    crono: null,
    cronoStr: "00:00:00",
    inicioPartida: null

  }),
  actions: { 
    setPArtidaA (val) {
      this.partidaA = parseInt(val)
    },
    cambioTreta() {
      this.treta === 'rojos' ? this.treta = 'blaus' : this.treta = 'rojos'
    },
    checkVals() {
      const rojos = this.marcador.rojos.punts
      const blaus = this.marcador.blaus.punts

      const valsRoig = this.estadisticas.rojos.vals
      const valsBlau = this.estadisticas.blaus.vals

      if(rojos == 3) {
        this.treta === 'rojos' ? valsRoig.treta.totales += 1 : valsRoig.rest.totales += 1
      }
      if(blaus == 3) {
        this.treta === 'blaus' ? valsBlau.treta.totales += 1 : valsBlau.rest.totales += 1
        console.log("val blau")
      }
    },
    guardarLocalStorage() {
      const datosPartidaPilota = {
        marcador: this.marcador,
        partidaA: this.partidaA,
        estadisticas: this.estadisticas
      }
      localStorage.setItem("datosPartidaPilota", JSON.stringify(datosPartidaPilota))
    },
    cargarLocalStorage() {
      const datosPartidaPilota = JSON.parse(localStorage.getItem('datosPartidaPilota'))
      if(!datosPartidaPilota) return
      // console.log(datosPartidaPilota)
      this.marcador = datosPartidaPilota.marcador
      this.partidaA = datosPartidaPilota.partidaA
      this.estadisticas = datosPartidaPilota.estadisticas
    },
    resetMarcador() {
      this.marcador = {
        rojos: {
          punts: 0,
          jocs: 0
        },
        blaus: {
          punts: 0,
          jocs: 0
        }
      }
      this.guardarLocalStorage()
    }
  }
})