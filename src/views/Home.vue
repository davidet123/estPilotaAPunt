<template>
  <div class="pa-3">
    <v-row>
      <v-col cols="12" class="text-center"><h5>Crear nueva partida</h5></v-col>
    </v-row>
    <v-row>
      <v-col cols="6" v-for="(equipo, key, index) in equipos" :key="index">
        <v-row v-for="jugador in equipo" :key="jugador.id">
          <v-col cols="12">
            <Jugador
              :jugador="jugador"
              :color="key"
              @editar="editarJugador"
              @eliminar="eliminarJugador" />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="text-center">
            <v-btn color="success" @click="abrirDialog(key)" size="x-small">+</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center">
        <v-btn color="primary" to="/partida" size="small">EMPEZAR PARTIDA</v-btn>
        <!-- <ControlVmix :titulo="'TEST123'"/>
        <ControlVmix :titulo="'segundo'"/> -->
      </v-col>
    </v-row>

    <div class="text-center">
      <v-dialog v-model="dialog" width="400">
        <NuevoJugador :equipo="equipoElegido" :datosJugador="datosJugador"
        @aceptar="addJugador"
        @editar="aceptarEdicionJugador"/>
      </v-dialog>
    </div>

  </div>
</template>

<script setup>
  import { useEstadisticasStore } from '@/stores/estadisticas';
  import ControlVmix from '@/components/ControlVmix.vue';
  import Jugador from '@/components/Jugador.vue';
  import NuevoJugador from '@/components/NuevoJugador.vue';
  import { storeToRefs } from 'pinia';
  import { computed, ref } from 'vue';

  const estadisticasStore = useEstadisticasStore()

  const { equipos } = storeToRefs(estadisticasStore)

  const dialog = ref(false)

  const equipoElegido = ref(null)


  const abrirDialog = equipo => {
    equipoElegido.value = equipo
    dialog.value = true
  }

  const addJugador = data => {
    estadisticasStore.addJugador(data)
    dialog.value = false
  }

  const datosJugador = ref(null)

  const editarJugador = data => {
    datosJugador.value = data
    dialog.value = true
  }
  const eliminarJugador = data => estadisticasStore.eliminarJugador(data)
  const aceptarEdicionJugador = data => {
    // estadisticasStore.editarJugador(data)
    dialog.value = false
  }

  

</script>
