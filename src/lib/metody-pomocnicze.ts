export class metodyPomocnicze {
  constructor() {}

  //metoda losująca zestaw pytań
  static wybierzZestawPytan() {
    let numerZestawuPytan;
    numerZestawuPytan = Math.floor(Math.random() * 3);
    return numerZestawuPytan;
  }

  //metoda losująca pytanie w etapie1
  static wybierzPytanie(n: number) {
    let numerPytania;
    numerPytania = Math.floor(Math.random() * n);
    return numerPytania;
  }

  //metoda losująca położenie(współrzędne) odpowiedzi
  static losujPozycje() {
    let numerZestawu;
    numerZestawu = Math.floor(Math.random() * 4);
    return numerZestawu;
  }

  //metoda sprawdzająca poprawność odpowiedzi
  static sprawdzOdpowiedz(
    wybranaOdpowiedz: number,
    prawidlowaOdpowiedz: number
  ) {
    if (wybranaOdpowiedz === prawidlowaOdpowiedz) {
      return true;
    } else {
      return false;
    }
  }
}
