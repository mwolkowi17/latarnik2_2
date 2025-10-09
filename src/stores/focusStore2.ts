import { defineStore } from "pinia";
import { ref } from "vue";

export const useFocusStore = defineStore("focus2", () => {
  const ifPytanieInFocus = ref(false);
  const ifPrawidlowaOdpowiedzInFocus = ref(false);
  const ifZlaOdpowiedzInFocus = ref(false);
  const ifWinGoldInFocus = ref(false);
  const ifPrzegranaGoldInFocus = ref(false);
  const ifPodpowiedzInFocus = ref(false);

  function focusOn() {
    ifPrawidlowaOdpowiedzInFocus.value = true;
    ifZlaOdpowiedzInFocus.value = true;
    ifWinGoldInFocus.value = true;
    ifPrzegranaGoldInFocus.value = true;
  }

  function focusOff() {
    ifPrawidlowaOdpowiedzInFocus.value = false;
    ifZlaOdpowiedzInFocus.value = false;
    ifPytanieInFocus.value = false;
    ifWinGoldInFocus.value = false;
    ifPrzegranaGoldInFocus.value = false;
  }

  return {
    ifPytanieInFocus,
    ifPrawidlowaOdpowiedzInFocus,
    ifZlaOdpowiedzInFocus,
    ifWinGoldInFocus,
    ifPrzegranaGoldInFocus,
    ifPodpowiedzInFocus,
    focusOn,
    focusOff,
  };
});
