# PLANIFY – Time Management App

## Descriere proiect
PLANIFY este o aplicație web realizată în React pentru gestionarea eficientă a timpului. Utilizatorii pot adăuga, prioritiza și șterge taskuri personale, având posibilitatea de a gestiona activitățile zilnice într-un mod organizat.

## Funcționalități principale
- Autentificare simplă (Login)
- Adăugare și ștergere taskuri
- Prioritizare taskuri (High/Medium/Low)
- Logout
- Persistență a datelor cu localStorage

## Tehnologii utilizate
- React.js
- JavaScript (ES6)
- HTML5 + CSS3
- Git + GitHub
- GitHub Actions (CI/CD)
- Jest (testare unitară)
- Trello (Project Management)

## Structura aplicației
- `/src/App.js` – fluxul principal al aplicației
- `/src/Login.jsx` – componenta de autentificare
- `/src/TaskList.jsx` – gestionarea listei de taskuri
- `/src/services/SessionManager.js` – Singleton pentru gestionarea sesiunii
- `/src/__tests__/sessionManager.test.js` – teste unitare pentru logica aplicației

## Principii de programare aplicate
- Principiile SOLID
- Design Pattern: Singleton (`SessionManager`)
- Separarea responsabilităților între componente

## Testare
- Teste unitar scrise cu Jest
- Testarea funcțiilor din `SessionManager` (adăugare, ștergere taskuri, setare utilizator)
- Rulare automată a testelor la fiecare Pull Request prin GitHub Actions

## CI/CD
- Workflow `test.yml` care rulează automat `npm install` și `npm test`
- Branch principal protejat (`main`): Pull Request obligatoriu, rulare teste automată și code review

## Project Management
- Board Trello organizat în coloane (To Do, In Progress, Done)
- Taskuri și statusuri actualizate pentru fiecare etapă a proiectului

## Instrucțiuni de rulare
```bash
npm install
npm start
```
Accesează aplicația la `http://localhost:3000` după rulare.

## Autor
- Ghinda Denisa-Maria
- Jinga Oana-Alexandra
- Andrei Elena-Iuliana
- Roman Denise-Maria
