import React, { useState } from 'react';// Importă biblioteca React și hook-ul useState pentru gestionarea stării.

const Login = ({ onLogin }) => { // Definirea componentei Login, care primește o funcție de callback onLogin ca proprietate.
    const [username, setUsername] = useState(''); // Stare pentru a stoca valoarea introdusă în câmpul de utilizator.
    const [password, setPassword] = useState(''); // Stare pentru a stoca valoarea introdusă în câmpul de parolă.
    const [isRegistered, setIsRegistered] = useState(true); // Stare pentru a comuta între modurile de login și înregistrare.
    const [users, setUsers] = useState( // Stare pentru a stoca lista utilizatorilor înregistrați.
        JSON.parse(localStorage.getItem('users')) || [] // Initializează cu utilizatorii din localStorage sau o listă goală.
    );


    // Funcție pentru gestionarea procesului de autentificare.
    const handleLogin = () => {
        // Verifică dacă utilizatorul și parola introduse corespund unui utilizator din lista stocată.
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            onLogin(username); // Apelează funcția onLogin cu numele utilizatorului dacă acreditările sunt valide.
        } else {
            alert('Invalid credentials!'); // Afișează un mesaj de eroare dacă datele sunt greșite.
        }
    };
      //Update branch//
     // Funcție pentru gestionarea procesului de înregistrare.
    const handleRegister = () => {
         // Verifică dacă numele de utilizator este deja folosit.
        if (users.find(u => u.username === username)) {
            alert('Username already taken!'); // Afișează un mesaj de eroare dacă utilizatorul există deja.
        } else {
            const newUser = { username, password }; // Creează un nou obiect pentru utilizator cu numele și parola introduse.
            const updatedUsers = [...users, newUser]; // Adaugă noul utilizator în lista existentă.
            setUsers(updatedUsers); // Actualizează starea utilizatorilor cu lista extinsă.
            localStorage.setItem('users', JSON.stringify(updatedUsers)); // Salvează lista actualizată în localStorage.
            onLogin(username); // Autentifică automat utilizatorul după înregistrare.
        }
    };

    return (
        <div className="container login-container"> {/* Container pentru formularul de login/înregistrare, cu clase de stilizare. */}
            <h2>{isRegistered ? 'Login' : 'Register'}</h2> {/* Afișează titlul "Login" sau "Register", în funcție de stare. */}
            <input
                type="text"
                placeholder="Username" // Câmp pentru introducerea numelui de utilizator.
                value={username} // Asociază valoarea câmpului cu starea username.
                onChange={(e) => setUsername(e.target.value)} // Actualizează starea username când valoarea câmpului se schimbă.
            />
            <input
                type="password"
                placeholder="Password" // Câmp pentru introducerea parolei.
                value={password} // Asociază valoarea câmpului cu starea password.
                onChange={(e) => setPassword(e.target.value)} // Actualizează starea password când valoarea câmpului se schimbă.
            />
            {isRegistered ? ( // Afișează formularul de login dacă starea isRegistered este adevărată.
                <>
                    <button onClick={handleLogin}>Login</button> {/* Buton pentru a iniția procesul de login. */}
                    <p>Don't have an account? <span onClick={() => setIsRegistered(false)}>Register here</span></p> {/* Link pentru a trece la formularul de înregistrare. */}
                </>
            ) : ( // Afișează formularul de înregistrare dacă starea isRegistered este falsă.
                <>
                    <button onClick={handleRegister}>Register</button> {/* Buton pentru a iniția procesul de înregistrare. */}
                    <p>Already have an account? <span onClick={() => setIsRegistered(true)}>Login here</span></p> {/* Link pentru a reveni la formularul de login. */}
                </>
            )}
        </div>
    );
};

export default Login; // Exportă componenta Login pentru a putea fi utilizată în alte fișiere.
