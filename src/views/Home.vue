<template>
  <div class="pa-3">
    <v-row>
      <v-col cols="12" class="text-center"><h5>Crear nueva partida</h5></v-col>
    </v-row>
    <v-row>
      <v-col cols="3">
        <v-text-field
          label="Fecha"
          v-model="fecha"
          density="compact"
        ></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-text-field
          label="Lugar"
          v-model="lugar"
          density="compact"
        ></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-text-field
          label="Partida a"
          v-model="partidaA"
          density="compact"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center" cols="12">
        <h4>Añadir jugadores</h4>
      </v-col>
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
      <v-col class="text-center" cols="6" offset="3">
        <v-text-field
          v-model="url"
          label="Url vMix"
        ></v-text-field>
        <div v-if="errorTxt" class="text-red">
          {{ errorTxt }}

        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center">
        <div v-if="cargando" class="text-center">
          <v-progress-circular
            color="primary"
            indeterminate
          ></v-progress-circular>
        </div>
        <div v-else>

          <v-btn color="primary" @click="empezarPartida()" size="small">EMPEZAR PARTIDA</v-btn>
        </div>
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
  import { useEstadisticasStore } from '@/stores/estadisticas'
  import { usevMixStore } from '@/stores/vMix';
  import { useMarcadorStore } from '@/stores/marcador';
  import ControlVmix from '@/components/ControlVmix.vue';
  import Jugador from '@/components/Jugador.vue';
  import NuevoJugador from '@/components/NuevoJugador.vue';
  import { storeToRefs } from 'pinia';
  import { computed, ref, watch } from 'vue';
  import router from '@/router';

  const estadisticasStore = useEstadisticasStore()
  const vMixStore = usevMixStore()
  const marcadorStore = useMarcadorStore()

  const { equipos } = storeToRefs(estadisticasStore)
  const { partidaA } = storeToRefs(marcadorStore)

  const { url, status, errorTxt, cargando } = storeToRefs(vMixStore)

  const statusWatcher = computed(() => status.value)

  const dialog = ref(false)

  const equipoElegido = ref(null)


  const fecha = ref(null)
  const lugar = ref(null)
  


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
    datosJugador.value = null
    // estadisticasStore.editarJugador(data)
    dialog.value = false
  }

  const empezarPartida = () => {
    marcadorStore.setPArtidaA(partidaA.value)
    marcadorStore.guardarLocalStorage()
    router.push("/partida")
    // vMixStore.pingVmix()
  }

  watch(() => equipos.value, val => {
    estadisticasStore.guardarEquipos()
  },{deep:true})
  watch(() => statusWatcher.value, (val) => {
    marcadorStore.resetMarcador()
    if(val === 200) router.push("/partida")
  });

  
  

</script>
