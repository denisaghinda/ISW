# Coding Principles și Ghid de Programare

## 1. Principii Generale de Coding

- **Naming clar:** nume de variabile, funcții și componente descriptive (`handleLogin`, `TaskList`)
- **Organizare modulară:** fiecare funcționalitate separată în propriul fișier sau componentă
- **Single Responsibility:** fiecare componentă sau serviciu are o singură responsabilitate
- **Consistență:** folosirea acelorași convenții de indentare, acolade, spațiere
- **Comentarii:** utilizarea de comentarii explicative unde logica poate deveni complexă
- **Separarea logicii și UI-ului:** logica de business este separată de componentele de interfață

## 2. Structura Proiectului

- `/src/App.js` - Componente principale și fluxul aplicației
- `/src/Login.jsx` - Componenta de autentificare
- `/src/TaskList.jsx` - Componenta pentru lista de taskuri
- `/src/services/SessionManager.js` - Gestionare sesiune utilizator și taskuri (Singleton)
- `/src/__tests__/sessionManager.test.js` - Teste unitare pentru logica principală

## 3. Aplicarea Principiilor SOLID

- **S (Single Responsibility Principle):** fiecare componentă gestionează doar o funcționalitate (ex: Login.jsx doar login).
- **O (Open/Closed Principle):** componentele pot fi extinse fără a fi modificate fundamental (ex: adăugare de deadline-uri la taskuri).
- **L (Liskov Substitution Principle):** componentele pot fi înlocuite fără a afecta restul aplicației (ex: Login poate fi înlocuit cu altă metodă de autentificare).
- **I (Interface Segregation Principle):** fiecare componentă utilizează doar datele de care are nevoie prin props.
- **D (Dependency Inversion Principle):** logica de salvare (SessionManager) este separată de UI (App.js, TaskList).

## 4. Standardizare commituri Git

- Mesaje clare și scurte pentru fiecare commit (`[feature] Added login`, `[fix] Bug la task delete`)
- Commituri logice pentru funcționalități complete, nu bucăți incomplete
- Pull Request-uri obligatorii pentru integrare pe `main`

## 5. CI/CD și Automatizare

- Testele rulează automat la fiecare Pull Request
- Branch-ul `main` protejat prin reguli stricte (PR + teste obligatorii)
- Refuz automat al codului care nu trece testele

---