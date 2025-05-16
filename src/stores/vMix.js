import { defineStore } from 'pinia'
import axios from 'axios'

export const usevMixStore = defineStore('vMixStore', {
  state: () => ({
    url: "http://192.168.50.200:8088/", 
    inicioPartida: null,
    crono: null,
    tiempoPartida: "00:00:00",
    tiempoActual: null,
    tiempoPausa: null,
    status: 500,
    errorTxt: null,
    cargando: false
  }),
  actions: { 
    async pingVmix () {
      this.errorTxt = null
      this.status = 500
      this.cargando = true
      const nombre = "Colour"
      let dir = this.url +"API/?Function=ActiveInput&Input=" + nombre
        const send = await axios.post(dir)
          .catch(err => {
            console.log("Error de conexión " + err)
            this.errorTxt = err
          })
        if(send) this.status = send.status
        this.cargando = false

    },
    async liveUpdate (nombre, capa, val) {
      let dir = this.url +"API/?Function=SetText&Input=" + nombre + "&SelectedName=" + capa + ".Text&Value=" + val
      
      console.log(dir)
      // const send = await axios.post(dir)
      //   .catch(err => {
      //     console.log("Error de conexión " + err)
      //   })
    },
    async goLive (nombre) {
      let dir = this.url +"API/?Function=OverlayInput1&Input=" + nombre
      console.log(dir)
      // const send = await axios.post(dir)
      //   .catch(err => {
      //     console.log("Error de conexión " + err)
      //   })
    },
    async overLayIn (nombre, numero) {
      let dir = this.url +"API/?Function=OverlayInput"+ numero +"In&Input=" + nombre
      console.log(dir)
      // const send = await axios.post(dir)
      //   .catch(err => {
      //     console.log("Error de conexión " + err)
      //   })
    },
    async overLayOut (nombre, numero) {
      let dir = this.url +"API/?Function=OverlayInput"+ numero +"Out&Input=" + nombre
      console.log(dir)
      // const send = await axios.post(dir)
      //   .catch(err => {
      //     console.log("Error de conexión " + err)
      //   })
    },
    
    async iniciarCrono() {
      const nombre = "MARCADOR"
      const capa = "TEMPS_TXT"
      const dir = this.url +"API/?Function=StartCountdown&Input=" + nombre + "&SelectedName=" + capa + ".Text"
      const send = await axios.post(dir)
        .catch(err => {
          console.log("Error de conexión " + err)
        })

      // this.inicioPartida = Date.now()
      // Lógica para inicio o reanudación
      if (this.tiempoPausa !== null && this.inicioPartida !== null) {
        const pausaDuracion = Date.now() - this.tiempoPausa
        this.inicioPartida += pausaDuracion
        this.tiempoPausa = null // Limpiar la pausa
      } else {
        this.inicioPartida = Date.now()
      }
      this.crono = setInterval(() => {
        this.tiempoActual = Date.now()
        const tiempoTotal = this.tiempoActual - this.inicioPartida
        this.tiempoPartida = this.convertirMilisegundosAHHMMSS(tiempoTotal)
      }, 1000)
    },
    async pararCrono() {
      const nombre = "MARCADOR"
      const capa = "TEMPS_TXT"
      const dir = this.url +"API/?Function=StopCountdown&Input=" + nombre + "&SelectedName=" + capa + ".Text"
      const send = await axios.post(dir)
        .catch(err => {
          console.log("Error de conexión " + err)
        })
      clearInterval(this.crono)
      this.tiempoPartida = "00:00:00"
      this.tiempoActual = null
    },
    async pausarCrono() {
      const nombre = "MARCADOR"
      const capa = "TEMPS_TXT"
      const dir = this.url +"API/?Function=PauseCountdown&Input=" + nombre + "&SelectedName=" + capa + ".Text"
      const send = await axios.post(dir)
        .catch(err => {
          console.log("Error de conexión " + err)
        })
      clearInterval(this.crono)
      this.tiempoPausa = Date.now()
    },
    convertirMilisegundosAHHMMSS(ms) {
      const totalSegundos = Math.floor(ms / 1000);
      const horas = Math.floor(totalSegundos / 3600);
      const minutos = Math.floor((totalSegundos % 3600) / 60);
      const segundos = totalSegundos % 60;

      const formatoDosDigitos = (num) => String(num).padStart(2, '0');

      return `${formatoDosDigitos(horas)}:${formatoDosDigitos(minutos)}:${formatoDosDigitos(segundos)}`;
    },
      

  },
})