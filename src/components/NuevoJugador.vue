<template>
  <div class="text-center">
    <v-row>
      <v-col class="text-center" max-width="400">
        <v-card>
            <v-card-text>
              <v-row>
                <v-col class=text-center>
                  Nuevo jugador {{ equipo }}
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="8" offset="2">
                  <v-text-field
                    v-model="nombre"
                    label="nombre"
                    density="compact"
                  ></v-text-field>
                  <v-select
                    label="posicion"
                    :items="posiciones"
                    v-model="posicion"
                  ></v-select>

                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-btn color="red" @click="crearJugador()">ACEPTAR</v-btn>
            </v-card-actions>
          </v-card>
        
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
  import { ref, toRefs } from 'vue';

  const props = defineProps(["equipo", "datosJugador"])
  const { equipo, datosJugador } = toRefs(props)
  

  
  const emit = defineEmits(["aceptar", "editar"])
  
  const nombre = ref(null)
  const posicion = ref(null)
  let editar = false


  if(datosJugador.value) {
    nombre.value = datosJugador.value.nombre
    posicion.value = datosJugador.value.posicion
    editar = true
  }

  const posiciones = ref(["REST", "MITGER", "PUNTER", "FERIDOR"])

  const crearJugador = () => {
    if(!editar) {

      const jugador = {
        nombre: nombre.value,
        posicion: posicion.value,
        id: Date.now()
      }
      const data = {
        jugador,
        equipo: equipo.value
      }
      emit("aceptar", data)
    } else {
      datosJugador.value.nombre = nombre.value
      datosJugador.value.posicion = posicion.value
      emit('editar', datosJugador.value)
    }
  }

</script>

<style lang="scss" scoped>

</style>