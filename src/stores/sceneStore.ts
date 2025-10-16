import { defineStore } from "pinia";
import { ref, nextTick } from "vue";
import gameData from "../lib/pytania.json";
import pointsPosition from "../lib/pozycjaRamki.json";
import polozenieOdpowiedzi from "../lib/odpowiedziPozycje.json";
import { metodyPomocnicze } from "../lib/metody-pomocnicze";
import { useMainCompStore } from "../stores/mainCompStore";
import { useTimerStore } from "./timerStore";
import { useKolaStore } from "./storeKola";
import { useFocusStore } from "./focusStore";

export const useSceneStore = defineStore("storeScene1", () => {
  //dostęp do store'ów
  const storeSceneMain = useMainCompStore();
  const timerStore = useTimerStore();
  const storeKola = useKolaStore();
  const storeFocus = useFocusStore();

  //sterowanie komponentami sceny
  const ifPodpowiedz = ref(false);
  const ifPrawidlowaOdpowiedz = ref(false);
  const ifZlaOdpowiedz = ref(false);

  //widocznosc odpowiedzi

  const ifOdpowiedz1 = ref(true);
  const ifOdpowiedz2 = ref(true);
  const ifOdpowiedz3 = ref(true);
  const ifOdpowiedz4 = ref(true);

  //blokowanie odpowiedzi
  const ifZablokowanaOdpowiedz = ref(false);

  //refy do elementów
  const pytanieTempRef = ref<HTMLElement | null>(null);

  //położenie odpowiedzi, po zmianach położenie odpowiedzi jest stałe, ale na razie zostawiam...
  const nrKolekcjiPolozenPytan = ref(0);

  const odpowiedz1Polozenie = ref([
    polozenieOdpowiedzi.pozycjeOdpowiedzi[nrKolekcjiPolozenPytan.value]?.[0]
      ?.top ?? "",
    polozenieOdpowiedzi.pozycjeOdpowiedzi[nrKolekcjiPolozenPytan.value]?.[0]
      ?.left ?? "",
  ]);

  const odpowiedz2Polozenie = ref([
    polozenieOdpowiedzi.pozycjeOdpowiedzi[nrKolekcjiPolozenPytan.value]?.[1]
      ?.top ?? "",
    polozenieOdpowiedzi.pozycjeOdpowiedzi[nrKolekcjiPolozenPytan.value]?.[1]
      ?.left ?? "",
  ]);

  const odpowiedz3Polozenie = ref([
    polozenieOdpowiedzi.pozycjeOdpowiedzi[nrKolekcjiPolozenPytan.value]?.[2]
      ?.top ?? "",
    polozenieOdpowiedzi.pozycjeOdpowiedzi[nrKolekcjiPolozenPytan.value]?.[2]
      ?.left ?? "",
  ]);

  const odpowiedz4Polozenie = ref([
    polozenieOdpowiedzi.pozycjeOdpowiedzi[nrKolekcjiPolozenPytan.value]?.[3]
      ?.top ?? "",
    polozenieOdpowiedzi.pozycjeOdpowiedzi[nrKolekcjiPolozenPytan.value]?.[3]
      ?.left ?? "",
  ]);

  //położenie ramki punktacji
  const ramkaPunktacjaWysokosc = ref(pointsPosition.pozycjaRamki[0]);

  //liczik punktacji (sterownie ramką punktacji)
  const licznikPunktacja = ref(0);

  // właściwości dot pytań
  const kolekcjaPytan = ref(gameData.poziom1);
  const kolekcjaPytanB = ref(gameData.poziom1b);
  const kolekcjaPytanC = ref(gameData.poziom1c);
  const pytanie = ref("pytanie");
  const odpowiedz1 = ref("odpowiedz1");
  const odpowiedz2 = ref("odpowiedz2");
  const odpowiedz3 = ref("odpowiedz3");
  const odpowiedz4 = ref("odpowiedz4");
  const nrOdpowiedziDobrej = ref(0);
  const wybranaOdpowiedz = ref(0);

  const nrKolejki = ref(0);

  //właściwości koloru punktacji
  const backgroundColorOdpowiedz1 = ref("#D7E2F1");
  const backgroundColorOdpowiedz2 = ref("#D7E2F1");
  const backgroundColorOdpowiedz3 = ref("#D7E2F1");
  const backgroundColorOdpowiedz4 = ref("#D7E2F1");

  //metoda dodajaca losowo pytania
  async function addQuestionLevel1() {
    //await nextTick();
    ifOdpowiedz1.value = true;
    ifOdpowiedz2.value = true;
    ifOdpowiedz3.value = true;
    ifOdpowiedz4.value = true;
    backgroundColorOdpowiedz1.value = "#D7E2F1";
    backgroundColorOdpowiedz2.value = "#D7E2F1";
    backgroundColorOdpowiedz3.value = "#D7E2F1";
    backgroundColorOdpowiedz4.value = "#D7E2F1";
    //const kolekcjaPytan = gameData.poziom1;
    let iloscElementowKolekcjiPytan = gameData.poziom1.length - nrKolejki.value;
    let pytanieNr: number;
    pytanieNr = metodyPomocnicze.wybierzPytanie(iloscElementowKolekcjiPytan);
    console.log("wyswietlane pytanie:" + pytanieNr);

    await nextTick();
    nrKolejki.value++;
    pytanie.value = kolekcjaPytan.value[pytanieNr]?.pytanie ?? "";
    odpowiedz1.value = kolekcjaPytan.value[pytanieNr]?.odpowiedz1 ?? "";
    odpowiedz2.value = kolekcjaPytan.value[pytanieNr]?.odpowiedz2 ?? "";
    odpowiedz3.value = kolekcjaPytan.value[pytanieNr]?.odpowiedz3 ?? "";
    odpowiedz4.value = kolekcjaPytan.value[pytanieNr]?.odpowiedz4 ?? "";
    nrOdpowiedziDobrej.value =
      Number(kolekcjaPytan.value[pytanieNr]?.prawidlowa_odpowiedz) || 0;

    await nextTick();
    function pytanieNrindex(_: (typeof kolekcjaPytan.value)[0], index: number) {
      return index !== pytanieNr;
    }
    const result = kolekcjaPytan.value.filter(pytanieNrindex);
    kolekcjaPytan.value = result;
    console.log(kolekcjaPytan.value);
    await nextTick();
    console.log("oczekiwana odpowiedz:" + nrOdpowiedziDobrej.value);
    ifZablokowanaOdpowiedz.value = false;
    //to tylko informacyjne w wer developerskiej, na produkcji usunąć
    if (nrKolejki.value === 5) {
      console.log("koniec etapu1");
    }
  }

  //sprawdzanie odpoiwedzi
  function sprawdzOdpowiedz(nrWybranegoPytania: number) {
    storeKola.ifSkorzystałZKola = false;
    console.log("wybrana odpowiedz:" + nrWybranegoPytania);
    if (
      metodyPomocnicze.sprawdzOdpowiedz(
        nrWybranegoPytania,
        nrOdpowiedziDobrej.value
      ) === true
    ) {
      console.log("prawidłowa odpowiedz");
      ifPrawidlowaOdpowiedz.value = true;
    }
    if (
      metodyPomocnicze.sprawdzOdpowiedz(
        nrWybranegoPytania,
        nrOdpowiedziDobrej.value
      ) === false
    ) {
      console.log("zła odpowiedz");
      ifZlaOdpowiedz.value = true;
    }
  }

  //obsługa punktacji
  async function ramkaPunktyMove() {
    licznikPunktacja.value = licznikPunktacja.value + 1;
    await nextTick();
    ramkaPunktacjaWysokosc.value =
      pointsPosition.pozycjaRamki[licznikPunktacja.value];
  }

  //obsługa odpowiedzi
  async function Odpowiedz1(buttonNumber: number) {
    sprawdzOdpowiedz(buttonNumber);
    await nextTick();
    if (ifPrawidlowaOdpowiedz.value === true) {
      setTimeout(() => {
        addQuestionLevel1();
        ifPrawidlowaOdpowiedz.value = false;
        //obsluga focusa
        if (storeFocus.ifPytanieInFocus) {
          pytanieTempRef.value?.focus();
        }

        ramkaPunktyMove();
        timerStore.isPaused = false;
        timerStore.timeScene1Local = 20;
        if (licznikPunktacja.value === 5) {
          timerStore.isPaused = true;
          storeSceneMain.ifMain1 = false;
          storeSceneMain.ifWinSilver = true;
        }
      }, 3000);
    } else {
      setTimeout(() => {
        //obsluga focusa
        if (storeFocus.ifPytanieInFocus) {
          storeFocus.ifPrzegranaSilverInFocus = true;
        }
        ifZlaOdpowiedz.value = false;
        storeSceneMain.ifMain1 = false;
        storeSceneMain.ifPrzegranaSilver = true;
      }, 3000);
    }
  }

  //metoda podająca punktację do czytnika nvda

  function czytajPunkty() {
    let puntkyCzytaj = "";
    if (ramkaPunktacjaWysokosc.value === pointsPosition.pozycjaRamki[0]) {
      puntkyCzytaj = "odpowiedź za jedną srebrną monetę";
    }
    if (ramkaPunktacjaWysokosc.value === pointsPosition.pozycjaRamki[1]) {
      puntkyCzytaj = "odpowiedź za dwie srebrne monety";
    }
    if (ramkaPunktacjaWysokosc.value === pointsPosition.pozycjaRamki[2]) {
      puntkyCzytaj = "odpowiedź za trzy srebrne monety";
    }
    if (ramkaPunktacjaWysokosc.value === pointsPosition.pozycjaRamki[3]) {
      puntkyCzytaj = "odpowiedź za cztery srebrne monety";
    }
    if (ramkaPunktacjaWysokosc.value === pointsPosition.pozycjaRamki[4]) {
      puntkyCzytaj = "odpowiedź premiowana srebrnym pucharem";
    }
    return puntkyCzytaj;
  }

  //metoda resetująca scenę
  async function ResetScene() {
    await nextTick();
    licznikPunktacja.value = 0;
    ramkaPunktacjaWysokosc.value = pointsPosition.pozycjaRamki[0];
    nrKolejki.value = 0;
    await nextTick();
    kolekcjaPytan.value = gameData.poziom1;
    console.log(kolekcjaPytan.value);
  }

  return {
    ifPodpowiedz,
    ifPrawidlowaOdpowiedz,
    ifZlaOdpowiedz,
    ramkaPunktacjaWysokosc,
    kolekcjaPytan,
    kolekcjaPytanB,
    kolekcjaPytanC,
    pytanie,
    pytanieTempRef,
    ifOdpowiedz1,
    ifOdpowiedz2,
    ifOdpowiedz3,
    ifOdpowiedz4,
    odpowiedz1,
    odpowiedz2,
    odpowiedz3,
    odpowiedz4,
    ifZablokowanaOdpowiedz,
    backgroundColorOdpowiedz1,
    backgroundColorOdpowiedz2,
    backgroundColorOdpowiedz3,
    backgroundColorOdpowiedz4,
    nrKolekcjiPolozenPytan,
    odpowiedz1Polozenie,
    odpowiedz2Polozenie,
    odpowiedz3Polozenie,
    odpowiedz4Polozenie,
    nrOdpowiedziDobrej,
    wybranaOdpowiedz,
    licznikPunktacja,
    nrKolejki,
    addQuestionLevel1,
    sprawdzOdpowiedz,
    ramkaPunktyMove,
    Odpowiedz1,
    czytajPunkty,
    ResetScene,
  };
});
