<template>
  <v-container>

    <v-row>
      <v-col class="text-center mt-4">
        <h3>MARCADOR PILOTA</h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6" offset="3">
        <v-row>
          <v-col cols="2" class="text-center border-md" offset="2">
            <h4>{{ marcador.equip_roig.jocs }}</h4>
          </v-col>
          <v-col cols="2" class="bg-red text-center border-md"
          :class="treta === 'equip_roig' ? 'text-decoration-underline' : 'text-decoration-none'"
          >
            <h4>{{ puntsStr[marcador.equip_roig.punts] }}</h4>
          </v-col>
          <v-col cols="2" class="bg-blue text-center border-md"
          :class="treta === 'equip_blau' ? 'text-decoration-underline' : 'text-decoration-none'"
          >
            <h4>{{ puntsStr[marcador.equip_blau.punts] }}</h4>
          </v-col>
          <v-col cols="2" class="text-center border-md">
            <h4>{{ marcador.equip_blau.jocs }}</h4>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="1" offset="2" class="text-center">
            <v-btn size="x-small" color="red"
            @click="punto('equip_roig', 1)"
            >+</v-btn>
          </v-col>
          <v-col cols="2" class="text-center">
            <v-btn size="x-small" color="red"
            @click="punto('equip_roig', -1)"
            >-</v-btn>
          </v-col>
          <v-col cols="1" offset="2" class="text-center">
            <v-btn size="x-small" color="blue"
            @click="punto('equip_blau', 1)"
            >+</v-btn>
          </v-col>
          <v-col cols="2" class="text-center">
            <v-btn size="x-small" color="blue"
            @click="punto('equip_blau', -1)"
            >-</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
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
  </v-container>
</template>

<script setup>

import { useMarcadorStore } from '@/stores/marcador'
import { usevMixStore } from '@/stores/vMix'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'

const marcadorStore = useMarcadorStore()
const vMixstore = usevMixStore()


const { marcador, puntsStr, treta, estadisticas } = storeToRefs(marcadorStore) 
const { tiempoPartida } = storeToRefs(vMixstore)

const punto = (equipo, val) => {
  const ganador = marcador.value[equipo]
  const perdedor = equipo == 'equip_roig' ? marcador.value.equip_blau : marcador.value.equip_roig 
  const equipo_perdedor = equipo == 'equip_roig' ? 'equip_blau' : 'equip_roig'
  if(ganador.punts == 0 && val < 0) {
    ganador.jocs -= 5
    ganador.punts = 3
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
    ganador.punts = 0
    perdedor.punts = 0
    ganador.jocs += 5

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





</script>

<style scoped>

</style>