import { defineStore } from 'pinia'

export const useMarcadorStore = defineStore('marcadorStore', {
  state: () => ({
    marcador: {
      equip_roig: {
        punts: 0,
        jocs: 0
      },
      equip_blau: {
        punts: 0,
        jocs: 0
      }
    },
    partidaA: 25,
    puntsStr: ["NET", "15", "30", "VAL"],
    test: "TEST123",
    estadisticas: {
      equip_roig: {
        vals: {
          treta: 0,
          rest: 0
        }
      },
      equip_blau: {
        vals: {
          treta: 0,
          rest: 0
        }
      },
    },
    treta: 'equip_roig',
    crono: null,
    cronoStr: "00:00:00",
    inicioPartida: null

  }),
  actions: { 
    cambioTreta() {
      this.treta === 'equip_roig' ? this.treta = 'equip_blau' : this.treta = 'equip_roig'
    },
    checkVals() {
      const rojos = this.marcador.equip_roig.punts
      const blaus = this.marcador.equip_blau.punts

      const valsRoig = this.estadisticas.equip_roig.vals
      const valsBlau = this.estadisticas.equip_blau.vals

      if(rojos == 3) {
        this.treta === 'equip_roig' ? valsRoig.treta += 1 : valsRoig.rest += 1
      }
      if(blaus == 3) {
        this.treta === 'equip_blau' ? valsBlau.treta += 1 : valsBlau.rest += 1
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
    }
  }
})