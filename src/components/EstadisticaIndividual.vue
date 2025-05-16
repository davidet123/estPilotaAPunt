<template>
  <v-card :color="equipo === 'rojos' ? 'error' : 'primary'">
    <v-card-title class="mb-2">
      <h6>{{ jugador.nombre }} - {{ jugador.posicion }}</h6>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="6" class="text-center cajaEstadistica">
          <h5>Colps</h5>
          <v-row>
            <v-col cols="6" class="text-center">
              <h6>Guanyadors - {{ jugador.estadisticas.colps.guanyadors }}</h6>
              <v-row>
                <v-col class="text-center d-flex align-center justify-center">
                  <v-btn size="x-small" color="success" @click="cambioEstadistica('colps','guanyadors', 1)">+</v-btn>
                  <v-btn size="x-small" color="red" @click="cambioEstadistica('colps','guanyadors', -1)">-</v-btn>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="6" class="text-center">
              <h6>Errades - {{ jugador.estadisticas.colps.errades }}</h6>
              <v-row>
                <v-col class="text-center d-flex align-center justify-center">
                  <v-btn size="x-small" color="success" @click="cambioEstadistica('colps','errades', 1)">+</v-btn>
                  <v-btn size="x-small" color="red" @click="cambioEstadistica('colps','errades', -1)">-</v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row class="ma-0 pa-0">
            <v-col cols="12" class="ma-0 pa-0 mt-1">
              <LiveBtn :jugador="jugador" :tipo="'colps'" :equipo="equipo" @goLive="goLive"/>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="6" class="text-center cajaEstadistica">
          <h5>Tretes</h5>
          <v-row>
            <v-col cols="6" class="text-center">
              <h6>Directes - {{ jugador.estadisticas.tretes.directes }}</h6>
              <v-row>
                <v-col class="text-center d-flex align-center justify-center">
                  <v-btn size="x-small" color="success" @click="cambioEstadistica('tretes','directes', 1)">+</v-btn>
                  <v-btn size="x-small" color="red" @click="cambioEstadistica('tretes','directes', 1)">-</v-btn>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="6" class="text-center">
              <h6>Faltes - {{ jugador.estadisticas.tretes.faltes }}</h6>
              <v-row>
                <v-col class="text-center d-flex align-center justify-center">
                  <v-btn size="x-small" color="success" @click="cambioEstadistica('tretes','faltes', 1)">+</v-btn>
                  <v-btn size="x-small" color="red" @click="cambioEstadistica('tretes','faltes', 1)">-</v-btn>
                </v-col>
              </v-row>
            </v-col>
            
          <v-row class="ma-0 pa-0">
            <v-col cols="12" class="ma-0 pa-0 mt-1">
              <LiveBtn :jugador="jugador" :tipo="'tretes'" :equipo="equipo" @goLive="goLive"/>
            </v-col>
          </v-row>

          </v-row>
        </v-col>
      </v-row>
    </v-card-text>

  </v-card>
</template>

<script setup>
  import { computed, toRefs } from 'vue'
  import LiveBtn from './LiveBtn.vue'

  const emit = defineEmits(["actualizar"])


  const props = defineProps(["jugador", "equipo"])
  const { jugador } = toRefs(props)

  const cambioEstadistica = (tipo, acierto, val) => {
    const est = jugador.value.estadisticas
    est[tipo][acierto] += val
    console.log(jugador.value.estadisticas)

    emit('actualizar')



  }

  const goLive = data => {
    console.log(data)
  }

</script>

<style scoped>

  .cajaEstadistica {
    border: 1px solid white;
  }

</style>