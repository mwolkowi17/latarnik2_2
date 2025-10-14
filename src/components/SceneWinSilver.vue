<script setup lang="ts">
import { useMainCompStore } from '../stores/mainCompStore';
import { onMounted,onUnmounted,useTemplateRef,nextTick } from 'vue'
import { useFocusStore } from '../stores/focusStore';
import ariatekst from '../lib/aria-texty.json';

const storeFocus = useFocusStore()
const storeMainComp = useMainCompStore();

const silverWinRef = useTemplateRef('silver-win-ref')

onMounted(async()=>{
 if(storeFocus.ifWinSilverInFocus){
    silverWinRef.value?.focus()
 }
  const sound_wygrana = new Audio(new URL('../assets/fanfary.mp3', import.meta.url).href);
        await nextTick()
        sound_wygrana.play()

})

onUnmounted(()=>{
    storeFocus.ifWinSilverInFocus=false
})

function GrajJeszczeRaz() {
    storeMainComp.ifWinSilver = false
    storeMainComp.ifMain1 = true

}

function GrajDalej() {
    storeMainComp.ifWinSilver = false
    storeMainComp.ifMain1 = false
    storeMainComp.ifMain2 = true
}

</script>

<template>
    <div class="tlo">
        <div class="container-win-silver">
            <div class="circle">
                <img class="ikona" src="../assets/puchar_silver.png" width="191px" height="227px" />
            </div>
            <div class="text-container" ref="silver-win-ref" tabindex="0" :aria-label="ariatekst.komunikatSrebrny">
                <p class="brawo">Brawo! Nagroda – srebrny puchar.</p>
                <p class="text">Poziom łatwy - ukończony!</p>
                <p class="text">Przejdź do następnego poziomu.</p>
            </div>
            <div class="button-row">
                <button class="my-button button-win" @click="GrajJeszczeRaz">
                    Zagraj jeszcze raz
                </button>
                <button class="my-button button-win" @click="GrajDalej">
                    Graj dalej
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.tlo {
    background-image: url("../assets/latarnia.png");
    background-size: 1920px 1080px;
    height: 1080px;
    width: 1920px;
    top: 0px;
    left: 0px;
    position: absolute;
}

.circle {
    width: 289px;
    height: 289px;
    border-radius: 150px;
    background-color: #093343;
    position: relative;
    top: 25px;
    left: 555px;
}

.container-win-silver {
    width: 1400px;
    height: 778px;
    border-radius: 39px;
    background-color: #0BB717;
    border: 5px solid #1D5488;
    text-align: center;
    font-size: 48px;
    font-style: normal;
    font-weight: 400;
    font-family: "Proxima Nova", sans-serif;
    text-align: center;
    position: absolute;
    top: 145px;
    left: 267px;

}

.text-container {
    margin-left: 90px;
    margin-right: 90px;
}

.text-container:focus {
    outline: 3px solid black;
    outline-offset: 5px;
}

.brawo {
    font-size: 64px;
    margin-top: 32px;
    margin-bottom: 0px;
}

.text {
    margin-top: 20px;
    margin-bottom: 20px;
}

.ikona {
    margin-top: 20px;
}

.button-row {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-top: 50px;
}

.button-win {

    text-align: center;
    font-size: 36px;
    font-style: bold;
    font-weight: 400;
    font-family: "Proxima Nova", sans-serif;
    display: grid;
    place-content: center;
    width: 460px;
    height: 113px;
    border-radius: 39px;
    background-color: #093343;
    color: white;
    position: relative;
}

.button-win:focus {
    outline: 5px solid black;
    outline-offset: 10px;
}
</style>