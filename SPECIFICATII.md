# Time Management App – SPECIFICAȚII TEHNICE

## 1. Descriere generală
„PLANIFY” este o aplicație React care ajută utilizatorii să-și gestioneze eficient timpul prin crearea, vizualizarea și prioritizarea taskurilor zilnice. Aplicația are autentificare simplă, listă de activități și salvare locală.

## 2. Funcționalități implementate
- Autentificare cu username simplu (Login)
- Adăugare task (cu titlu și prioritate)
- Ștergere task
- Afișare listă taskuri
- Prioritizare vizuală (High/Medium/Low)
- Salvare date în localStorage
- Logout

## 3. Structură aplicație
- Frontend: React.js
- Salvare date: localStorage (fără backend)
- Organizare în componente: Login, TaskList, App

## 4. Tehnologii utilizate
- React + JSX
- JavaScript (ES6)
- HTML + CSS
- Git + GitHub (versionare)
- GitHub Actions (CI/CD)
- Jest (testare unitară)
- Trello (project management)

## 5. Design Patterns
- Singleton Pattern: `SessionManager.js` – păstrează sesiunea utilizatorului și lista de taskuri într-o singură instanță globală
- Separation of Concerns: componente separate pentru logică, prezentare și state management

## 6. Principii SOLID aplicate
- SRP (Single Responsibility): componente separate pentru autentificare și taskuri
- OCP (Open/Closed): codul permite ușor extinderea (ex: adăugare deadline)
- LSP & ISP: nu se aplică direct
- DIP: logica este separată de componentele UI

## 7. Testare
- Fișier: `sessionManager.test.js`
- Teste unitar funcțiile: `addTask`, `deleteTask`, `setUser`, `getUser`
- Rulate automat prin `npm test` și GitHub Actions

## 8. CI/CD – GitHub Actions
- Workflow automat (`test.yml`) care rulează `npm install` + `npm test`
- Protecție pe branch `main`: se folosește Pull Request, code review și testare automată
- PR-ul nu poate fi făcut merge fără testele să treacă

## 9. Versionare (Git)
- Repo GitHub privat → apoi public
- Branch principal protejat (`main`)
- Commituri clare: `Add login`, `Add task logic`, `Add SessionManager`, etc.

## 10. Project Management
- Taskuri gestionate pe Trello
- Coloane: To Do / In Progress / Done

## 11. Concluzie
Proiectul respectă cerințele de bază și multe din cele opționale. Aplicația este modulară, testabilă, bine organizată și pregătită pentru scalare.