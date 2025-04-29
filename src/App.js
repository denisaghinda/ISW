import React, { useState, useEffect } from 'react'; // Importă React, useState și useEffect
import './App.css'; // Importă stilurile aplicației
import Login from './Login'; // Importă componenta de login
import TaskList from './TaskList'; // Importă componenta pentru lista de task-uri
import SessionManager from "./services/SessionManager"; // Importă Singleton-ul SessionManager

function App() {
    const [username, setUsername] = useState(''); // Stocăm numele utilizatorului
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Starea de autentificare

    // La montarea componentei, încărcăm datele din SessionManager
    useEffect(() => {
        SessionManager.init();
        const savedUser = SessionManager.getUser();
        if (savedUser) {
            setUsername(savedUser);
            setIsLoggedIn(true);
        }
    }, []);

    // Funcție pentru login
    const handleLogin = (user) => {
        setUsername(user);
        setIsLoggedIn(true);
        SessionManager.setUser(user); // Salvăm utilizatorul în SessionManager
    };

    // Funcție pentru logout
    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsername('');
        SessionManager.logout(); // Ștergem utilizatorul din SessionManager
    };

    return (
        <div className="App">
            <header className="app-header">
                <h1>PLANIFY</h1>
            </header>

            {/* Afișăm conținutul în funcție de autentificare */}
            {isLoggedIn ? (
                <div>
                    <TaskList username={username} />
                    <button className="logout-btn" onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <Login onLogin={handleLogin} />
            )}
        </div>
    );
}

export default App;
