<script setup lang="ts">
import { useScene2Store } from '../stores/scene2Store';
import { useFocusStore } from '../stores/focusStore';
import { onMounted, onUnmounted, useTemplateRef } from 'vue';

const storeSceneMain = useScene2Store();
const focusStore = useFocusStore();

const podpowiedz = useTemplateRef('podpowiedz')

onMounted(()=>{
    if(focusStore.ifPodpowiedzInFocus){
     podpowiedz.value?.focus()
    }
})

onUnmounted(()=>{
    focusStore.ifPodpowiedzInFocus=false
})
</script>

<template>
    <div class="container-podpowiedz" ref="podpowiedz" tabindex="0" :aria-label="storeSceneMain.podpowiedzTresc">{{ storeSceneMain.podpowiedzTresc }}</div>
</template>

<style scoped>
.container-podpowiedz {
    width: 700px;
    height: 125px;
    border-radius: 39px;
    background-color: #F7C807;
    border: 5px solid #1D5488;
    text-align: center;
    font-size: 36px;
    font-style: bold;
    font-weight: 400;
    font-family: "Proxima Nova", sans-serif;
    display: grid;
    place-content: center
}

.container-podpowiedz:focus {
    outline: 5px solid black;
    outline-offset: 10px;
}
</style>