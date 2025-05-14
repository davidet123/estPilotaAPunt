<template>
  <v-card
    :color="color === 'rojos' ? 'red' : 'blue'"
  >
    <v-card-title>
      <div class="text-center">
        <h6>{{ jugador.nombre }}</h6>
      </div>
      
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="6">
          <p>{{ jugador.posicion }}</p>

        </v-col>
        <v-col cols="6">
          <div class="text-right">
            <v-btn color="primary" size="x-small" variant="flat"
              @click="emit('editar', jugador)"
            >EDITAR</v-btn>
            <v-btn color="error" size="x-small" variant="flat"
              @click="emit('eliminar', jugador)"
            >X</v-btn>
          </div>

        </v-col>
      </v-row>
      
    </v-card-text>
  </v-card>
</template>

<script setup>
  import { toRefs } from 'vue';


  const props = defineProps(["jugador", "color"])
  const { jugador, color } = toRefs(props)

  const emit = defineEmits(["editar", "eliminar"])

</script>

<style lang="scss" scoped>

</style>