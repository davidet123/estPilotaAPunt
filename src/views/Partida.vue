<template>
  <div :class="status === 200 ? 'contenedorPartida' : 'sinBorde'">
    <v-container>
      <v-row>
        <v-col class="text-center mt-4">
          <h3>MARCADOR PILOTA</h3>
          <h4>Partida a {{ partidaA }}</h4>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6" >
          <v-row>
            <v-col class="text-center" cols="12">
              <v-btn color="success" size="x-small" @click="cambioTreta()">CAMBIO TRETA</v-btn>

            </v-col>
            <v-col cols="12">
              <v-row>
                <v-col cols="2" class="text-center border-md" offset="2">
                  <h4>{{ marcador.rojos.jocs }}</h4>
                </v-col>
                <v-col cols="2" class="bg-error text-center border-md"
                :class="treta === 'rojos' ? 'text-decoration-underline' : 'text-decoration-none'"
                >
                  <h4>{{ puntsStr[marcador.rojos.punts] }}</h4>
                </v-col>
                <v-col cols="2" class="bg-primary text-center border-md"
                :class="treta === 'blaus' ? 'text-decoration-underline' : 'text-decoration-none'"
                >
                  <h4>{{ puntsStr[marcador.blaus.punts] }}</h4>
                </v-col>
                <v-col cols="2" class="text-center border-md">
                  <h4>{{ marcador.blaus.jocs }}</h4>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="1" offset="2" class="text-center">
                  <v-btn size="x-small" color="error"
                  @click="punto('rojos', 1)"
                  >+</v-btn>
                </v-col>
                <v-col cols="2" class="text-center">
                  <v-btn size="x-small" color="error"
                  @click="punto('rojos', -1)"
                  >-</v-btn>
                </v-col>
                <v-col cols="1" offset="2" class="text-center">
                  <v-btn size="x-small" color="primary"
                  @click="punto('blaus', 1)"
                  >+</v-btn>
                </v-col>
                <v-col cols="2" class="text-center">
                  <v-btn size="x-small" color="primary"
                  @click="punto('blaus', -1)"
                  >-</v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="6">
          <v-row>
            <v-col class="text-center ma-0 pa-0 d-flex flex-column" cols="12">
              <h5>Crono</h5>
              <h5>{{ tiempoPartida }}</h5>
            </v-col>
            <v-col class="text-center d-flex align-center justify-center">
              <v-btn color="success" size="x-small" @click="iniciarCrono">INICIAR</v-btn>
              <v-btn color="error" size="x-small" @click="pararCrono">PARAR</v-btn>
              <v-btn color="primary" size="x-small" @click="pausarCrono">PAUSAR</v-btn>
            </v-col>
          </v-row>

        </v-col>
      </v-row>
      <v-divider class="my-4"></v-divider>
      <v-row>
        <v-col cols="6" v-for="(jugadores, key, index) in equipos" :key="index">
          <!-- <v-row>
            <v-col>
              {{ estadisticas[key].vals }}

            </v-col>
          </v-row> -->
          <v-row>
            <v-col class="text-center">
              <h4>{{ key.toUpperCase() }}</h4>
            </v-col>
          </v-row>
          <v-row v-for="jugador in jugadores" :key="jugador.id">
            <v-col cols="12">
              <EstadisticaIndividual :jugador="jugador" :equipo="key" @actualizar="actualizarEquipos()"/>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>

import { useMarcadorStore } from '@/stores/marcador'
import { usevMixStore } from '@/stores/vMix'
import { useEstadisticasStore } from '@/stores/estadisticas'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'
import EstadisticaIndividual from '@/components/EstadisticaIndividual.vue'

const marcadorStore = useMarcadorStore()
const vMixstore = usevMixStore()
const estadisticasStore = useEstadisticasStore()


const { marcador, puntsStr, treta, estadisticas, partidaA } = storeToRefs(marcadorStore) 
const { tiempoPartida, status } = storeToRefs(vMixstore)
const { equipos } = storeToRefs(estadisticasStore)

const punto = (equipo, val) => {
  const ganador = marcador.value[equipo]
  const perdedor = equipo == 'rojos' ? marcador.value.blaus : marcador.value.rojos 
  const equipo_perdedor = equipo == 'rojos' ? 'blaus' : 'rojos'
  
  if(ganador.punts == 0 && val < 0) {
    ganador.jocs -= 5
    ganador.punts = 3
    const tretaORest = treta.value !== equipo ? 'treta' : 'rest'
    estadisticas.value[equipo].vals[tretaORest].conseguidos -= 1
    if(ganador.jocs < 0) {
      ganador.punts = 0
      ganador.jocs = 0
    }
    vMixstore.liveUpdate("MARCADOR", `JOCS_${equipo.toUpperCase()}`, ganador.jocs)
    vMixstore.liveUpdate("MARCADOR", `PT_${equipo.toUpperCase()}`, puntsStr.value[ganador.punts])
    return
  }
  ganador.punts += val
  
  // a dos
  
  if(ganador.punts === 3 && perdedor.punts === 3) {
    perdedor.punts -= 1
    ganador.punts -= 1
    vMixstore.liveUpdate("MARCADOR", `PT_${equipo_perdedor.toUpperCase()}`, puntsStr.value[perdedor.punts])
  }
  
  // Acaba juego
  if(ganador.punts > 3) {
    const tretaORest = treta.value === equipo ? 'treta' : 'rest'
    ganador.punts = 0
    perdedor.punts = 0
    ganador.jocs += 5
    // Sumar val al equipo ganador
    console.log(tretaORest)

    estadisticas.value[equipo].vals[tretaORest].conseguidos += 1
    

    // Envio vmix todo
    // vMixstore.liveUpdate("MARCADOR", `PT_${equipo.toUpperCase()}`, puntsStr.value[ganador.punts])
    vMixstore.liveUpdate("MARCADOR", `JOCS_${equipo.toUpperCase()}`, ganador.jocs)
    vMixstore.liveUpdate("MARCADOR", `PT_${equipo_perdedor.toUpperCase()}`, puntsStr.value[perdedor.punts])
    // vMixstore.liveUpdate("MARCADOR", `JOCS_${equipo_perdedor.toUpperCase()}`, perdedor.jocs)
    marcadorStore.cambioTreta()
  }

  vMixstore.liveUpdate("MARCADOR", `PT_${equipo.toUpperCase()}`, puntsStr.value[ganador.punts])

  marcadorStore.checkVals()
  marcadorStore.guardarLocalStorage()

}

const iniciarCrono = () => vMixstore.iniciarCrono()
const pararCrono = () => vMixstore.pararCrono()
const pausarCrono = () => vMixstore.pausarCrono()

const cambioTreta = () => treta.value === 'rojos' ? treta.value = 'blaus' : treta.value = 'rojos'

const actualizarEquipos = () => estadisticasStore.guardarEquipos()





</script>

<style scoped>
.contenedorPartida {
  border: 1px solid red;
}

.sinborde {
  border: none;
}

</style>