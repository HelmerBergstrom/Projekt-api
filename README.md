# Projekt - Backend-baserad Webbutveckling

Projektet är uppdelat i tre separata GitHub-repositorys.
Denna del av projektet avser en REST-webbtjänst som används i de två andra delarna av projektet. Projektet går ut på att 
skapa en fullständig webbplats, med denna REST-webbtjänst och ett admingränssnitt i form av en webbplats, där inloggning krävs för att nå sidan.

De andra delarna av projektet finns här:
länkar till github repos

## Funktionalitet

- Skapa, hämta & radera bokningar.
- Skapa, hämta, uppdatera & radera menyobjekt.
- Logga in med hjälp av användarnamn & lösenord.

## Teknik

- Node.js
- Express
- MongoDB & Mongoose
- JSON Web Token (JWT)
- dotenv
- bcrypt
- Cors
- Body-parser
- Router
- Nodemon
- GitHub för versionshantering av kod.

## Installation 

För att kunna ta del av denna REST-webbtjänst kan du följa stegen nedan.

```bash
1. Klona ned projektet till din dator:

git clone <>
cd Projekt-API

2. Installera npm:
npm install

3. Skapa .env-fil i projektmappen:
JWT_KEY=HemligNyckel

4. Starta servern:
npm start

Kör efter start på http://localhost:3001/api
```

## API-endpoints

#### Auth

- POST /api/auth/

Logga in som admin och får en JWT-token som är giltlig i två timmar.

```bash
{
    "username": "admin",
    "password": "lösenord
}
```

#### Bokningar
###### /api/bookings

- GET / Hämtar alla bokningar (kräver JWT-token).
- POST / Skapar en ny bokning.

```bash
{
  "fullName": "Helmer Andersson",
  "phone": "0701234567",
  "date": "2025-07-01",
  "time": "18:30",
  "guests": 4
}
```

- DELETE /:id - Raderar bokning (kräver JWT-token).

#### Meny
###### /api/menu

- GET / - Hämta alla menyobjekt.
- GET /:id - Hämta specifikt menyobjekt.
- POST / – Skapa nytt menyobjekt (kräver token).
- PUT /:id – Ändra menyobjekt (kräver token).
- DELETE /:id – Radera menyobjekt (kräver token).

## Autentisering

Admin kräver JWT-token i Authorization-headern likt följande:

```bash
Authorization: bearer < token >
```

## Övrigt - bra att veta

- Bokningar tillåts endast mellan 15:00 och 21:00.
- Max 6 gäster per bokning.
- Framtida datum eller samma dag vid bokning.