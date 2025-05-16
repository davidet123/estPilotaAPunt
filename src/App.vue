<template>
  <router-view />
</template>

<script setup>

import { useMarcadorStore } from './stores/marcador'
import { useEstadisticasStore } from './stores/estadisticas'

const marcadorStore = useMarcadorStore()
const estadisticasStore = useEstadisticasStore()

// marcadorStore.cargarLocalStorage()
estadisticasStore.cargarEquipos()
// import {  onMounted, onBeforeMount } from "vue";

// import { useAppStore } from "./store/app.js"



// const appStore = useAppStore()

// appStore.getDatosCarrera() // CARGAR DATOS DESDE LOCALSTORAGE

// // appStore.loadData() // CARGAR DATOS DESDE SALIDA FORMATO JSON
// // appStore.loadXML() // CARGAR XML PARA CREAR TIEMPOS PARCIALES
// appStore.conectarWS() // PARA RECIBIR PICADAS DESDE RADIO
// appStore.getClasificación() // CARGAR CLASIFICACION DESDE JSON-SERVER
// appStore.getClasificaciónRelevos() // CARGAR CLASIFICACION DE RELEVOS DESDE JSON-SERVER
// appStore.getIntermedios() // CARGAR INTERMEDIOS DESDE JSON-SERVER
// appStore.getSalidas() // CARGAR SALIDAS DESDE JSON-SERVER

 


</script>
