<template>
  <div>
    <v-btn :color="!live ? 'success' : 'red'" size="x-small" @click="goLive()">LIVE</v-btn>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { usevMixStore } from '@/stores/vMix'

const vMixstore = usevMixStore()


const props = defineProps(['jugador', 'tipo', 'equipo'])
const emit = defineEmits(['goLive'])


const live = ref(false)
const capas = ['SUPERIOR', 'INFERIOR']

const estadistica = props.jugador.estadisticas


const goLive = async () => {
  live.value = !live.value
  const input = `${props.tipo.toUpperCase()}_${props.equipo.toUpperCase()}`
  if(live.value) {
    let i = 0
    await vMixstore.liveUpdate(input, 'NOMBRE', props.jugador.nombre)
    for (const key in estadistica[props.tipo]) {
        await vMixstore.liveUpdate(input, capas[i], estadistica[props.tipo][key])
        i++
    }
    await vMixstore.overLayIn(input, 2)
  } else {
    await vMixstore.overLayOut(input, 2)
  }
  
    


}

</script>

<style scoped>

</style>