<template>
  <v-card class="inputVmix">
    <v-card-text class="ma-0 pa-0 mt-2">
      <v-row>
        <v-col>
          <h4>{{ titulo }}</h4>
        </v-col>
      </v-row>
      <v-row class="ma-0 pa-0 mb-2">
        <v-col class="ma-0 pa-0">
          <v-btn :color="live ? 'red' : 'green'" size="x-small" @click="goLive">LIVE</v-btn>
        </v-col>
      </v-row>
      <v-row class="ma-0 pa-0">
        <v-col class="ma-0 pa-0">
          <v-btn-toggle
          v-model="overlay"
          mandatory>
            <v-btn size="x-small">1</v-btn>
            <v-btn size="x-small">2</v-btn>
            <v-btn size="x-small">3</v-btn>
            <v-btn size="x-small">4</v-btn>
    
          </v-btn-toggle>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
  import { ref, toRefs } from 'vue'

  const props = defineProps(["titulo"])
  const { titulo } = toRefs(props)
  

  const live = ref(false)


  const overlay = ref(1)


  const goLive = () => {
    const data = {
      input: titulo.value,
      overlay: overlay.value,
      live: live.value
    }
    console.log(data)
    live.value = !live.value
  }
</script>

<style scoped>
  .inputVmix {
    max-width: 200px;
    background-color: #d6d6d6;
  }

  .v-btn-group .v-btn {
    width: 10px !important;
    height: 20px !important;
  }

</style>