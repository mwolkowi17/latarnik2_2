<script setup lang="ts">
import { onMounted,useTemplateRef } from 'vue'
import { useFocusStore } from '../stores/focusStore';

const storeFocus = useFocusStore()

//referencje do el html używane do obsługi focusa
const zlaOdpowiedzRef = useTemplateRef('zla-odpowiedz-info')

onMounted(()=>{
    if(storeFocus.ifZlaOdpowiedzInFocus){
        zlaOdpowiedzRef.value?.focus()
    }
})


</script>

<template>
    <div class="container-zla-odpowiedz" ref="zla-odpowiedz-info" tabindex="0">
    <img class="ikona" src="../assets/zla_odp.png" width="100px" height="104px"/>
    <p class="brawo">Niestety!</p>
    <p class="text">Zła odpowiedź.</p>
</div>

</template>

<style scoped>
.container-zla-odpowiedz{
      width: 737px;
    height: 306px;
    border-radius: 39px;
    background-color: #F48506;
    border: 5px solid #1D5488;
    text-align: center;
    font-size: 40px;
    font-style:normal;
    font-weight: 400;
    font-family: "Proxima Nova", sans-serif;
    text-align: center;
}

.container-zla-odpowiedz:focus{
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