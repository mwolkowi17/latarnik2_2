import { defineStore } from "pinia";
import { ref } from "vue";

export const useFocusStore = defineStore("focus1", () => {
  const ifPytanieInFocus = ref(false);
  const ifPrawidlowaOdpowiedzInFocus = ref(false);
  const ifZlaOdpowiedzInFocus = ref(false);
  const ifWinSilverInFocus = ref(false);
  const ifPrzegranaSilverInFocus = ref(false);
  const ifPodpowiedzInFocus = ref(false);

  function focusOn() {
    ifPrawidlowaOdpowiedzInFocus.value = true;
    ifZlaOdpowiedzInFocus.value = true;
    ifWinSilverInFocus.value = true;
    ifPrzegranaSilverInFocus.value = true;
  }

  function focusOff() {
    ifPrawidlowaOdpowiedzInFocus.value = false;
    ifZlaOdpowiedzInFocus.value = false;
    ifPytanieInFocus.value = false;
    ifWinSilverInFocus.value = false;
    ifPrzegranaSilverInFocus.value = false;
  }

  return {
    ifPytanieInFocus,
    ifPrawidlowaOdpowiedzInFocus,
    ifZlaOdpowiedzInFocus,
    ifWinSilverInFocus,
    ifPrzegranaSilverInFocus,
    ifPodpowiedzInFocus,
    focusOn,
    focusOff,
  };
});
