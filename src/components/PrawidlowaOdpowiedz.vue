<script setup lang="ts">
import { onMounted,useTemplateRef } from 'vue'
import { useFocusStore } from '../stores/focusStore';
import ariatekst from '../lib/aria-texty.json'

const storeFocus = useFocusStore()

//referencje do el html używane do obsługi focusa
const prawidlowaOdpowiedzRef = useTemplateRef('prawidlowa-odpowiedz-info')

onMounted(()=>{
    if(storeFocus.ifPrawidlowaOdpowiedzInFocus){
        prawidlowaOdpowiedzRef.value?.focus()
    }
})
</script>

<template>
<div class="container-prawidlowa-odpowiedz" ref="prawidlowa-odpowiedz-info" tabindex="0" :aria-label="ariatekst.komunikatDobraOdpowiedz">
    <img class="ikona" src="../assets/dobra_odp.png" width="97px" height="93px"/>
    <p class="brawo">Brawo!</p>
    <p class="text">Prawidłowa odpowiedź.</p>
</div>
</template>

<style scoped>
.container-prawidlowa-odpowiedz{
    width: 737px;
    height: 306px;
    border-radius: 39px;
    background-color: #0BB717;
    border: 5px solid #1D5488;
    text-align: center;
    font-size: 40px;
    font-style:normal;
    font-weight: 400;
    font-family: "Proxima Nova", sans-serif;
    text-align: center;
    
}

.container-prawidlowa-odpowiedz:focus{
    outline: 5px solid black;
  outline-offset: 10px;
}

.brawo{
    font-size: 60px;
    margin-top: 0px;
    margin-bottom: 0px;
}

.text{
    margin-top: 5px;
}

.ikona{
    margin-top: 20px;
}

</style>