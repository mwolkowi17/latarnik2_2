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

  //sterowanie komponentami głównej sceny
  const ifPodpowiedz = ref(false);
  const ifPrawidlowaOdpowiedz = ref(false);
  const ifZlaOdpowiedz = ref(false);

  //widocznosc odpowiedzi

  const ifOdpowiedz1 = ref(true);
  const ifOdpowiedz2 = ref(true);
  const ifOdpowiedz3 = ref(true);
  const ifOdpowiedz4 = ref(true);

  //refy do elementów
  const pytanieTempRef = ref<HTMLElement | null>(null);

  //położenie odpowiedzi

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
  const pytanie = ref("pytanie");
  const odpowiedz1 = ref("odpowiedz1");
  const odpowiedz2 = ref("odpowiedz2");
  const odpowiedz3 = ref("odpowiedz3");
  const odpowiedz4 = ref("odpowiedz4");
  const nrOdpowiedziDobrej = ref(0);
  const wybranaOdpowiedz = ref(0);

  const nrKolejki = ref(0);

  //metoda dodajaca losowo pytania
  async function addQuestionLevel1() {
    nrKolekcjiPolozenPytan.value = metodyPomocnicze.losujPozycje();
    await nextTick();
    odpowiedz1Polozenie.value = [
      polozenieOdpowiedzi.pozycjeOdpowiedzi[nrKolekcjiPolozenPytan.value]?.[0]
        ?.top ?? "",
      polozenieOdpowiedzi.pozycjeOdpowiedzi[nrKolekcjiPolozenPytan.value]?.[0]
        ?.left ?? "",
    ];
    odpowiedz2Polozenie.value = [
      polozenieOdpowiedzi.pozycjeOdpowiedzi[nrKolekcjiPolozenPytan.value]?.[1]
        ?.top ?? "",
      polozenieOdpowiedzi.pozycjeOdpowiedzi[nrKolekcjiPolozenPytan.value]?.[1]
        ?.left ?? "",
    ];
    odpowiedz3Polozenie.value = [
      polozenieOdpowiedzi.pozycjeOdpowiedzi[nrKolekcjiPolozenPytan.value]?.[2]
        ?.top ?? "",
      polozenieOdpowiedzi.pozycjeOdpowiedzi[nrKolekcjiPolozenPytan.value]?.[2]
        ?.left ?? "",
    ];
    odpowiedz4Polozenie.value = [
      polozenieOdpowiedzi.pozycjeOdpowiedzi[nrKolekcjiPolozenPytan.value]?.[3]
        ?.top ?? "",
      polozenieOdpowiedzi.pozycjeOdpowiedzi[nrKolekcjiPolozenPytan.value]?.[3]
        ?.left ?? "",
    ];

    await nextTick();
    ifOdpowiedz1.value = true;
    ifOdpowiedz2.value = true;
    ifOdpowiedz3.value = true;
    ifOdpowiedz4.value = true;
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
    //wybranaOdpowiedz.value = nrWybranegoPytania;

    await nextTick();
    function pytanieNrindex(_: (typeof kolekcjaPytan.value)[0], index: number) {
      return index !== pytanieNr;
    }
    const result = kolekcjaPytan.value.filter(pytanieNrindex);
    kolekcjaPytan.value = result;
    console.log(kolekcjaPytan.value);
    await nextTick();
    console.log("oczekiwana odpowiedz:" + nrOdpowiedziDobrej.value);

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
        if (storeFocus.ifPytanieInFocus) {
          storeFocus.ifPrzegranaSilverInFocus = true;
        }
        ifZlaOdpowiedz.value = false;
        storeSceneMain.ifMain1 = false;
        storeSceneMain.ifPrzegranaSilver = true;
      }, 3000);
    }
  }

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
    ResetScene,
  };
});
