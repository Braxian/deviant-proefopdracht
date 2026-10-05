# DeviantProef

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.2.1.

## Development server

Pull het project naar je editor en navigeer in je terminal naar de deviant-proef map.

Daar run je vervolgens

```bash
npm i
```

Om de dependancies te installeren.
En vervolgens

```bash
ng serve
```

of

```bash
npm run start
```

Om de appplicatie te starten.

Navigeer vervolgens in de browser naar

http://localhost:4200/

De applicatie start meteen in het scherm van de oefening.

Signals worden in de applicatie gebruikt om reactief het component te beheren. Zodra de gebruiker een multiple choice keuze maakt of de textarea verlaat, wordt een functie getriggerd die de signal triggert om het gebruikersantwoord te updaten in de NgRx store.
Deze Store wordt vervolgens ook geupdate via actions als de oefeningdata succesvol geladen is, niet kan laden, een error krijgt, de user een oefening start, de oefening "inlevert" of de oefening opnieuw wil starten.

En de data wordt vervolgens opgehaald via de selectors om weer gebruikt te kunnen worden in het scherm van de gebruiker, ook al is deze data niet per se reactief, zoals de tekst van een vraag bijvoorbeeld.

De local storage wordt gebruikt om de data op te slaan in de browser van de gebruiker wanneer deze klaar is met het invoeren van de antwoorden. Zo kan deze data gebruikt worden als de gebruiker weer terugkomt in de applicatie. Persoonlijk zou ik dit opslaan per gegeven antwoord zodat de gebruiker niet per ongeluk zijn hele toets verwijderd voordat deze verstuurd is, maar dat was niet de scope van de opdracht.
