import React, { useState, useEffect } from 'react'; // Importă funcțiile useState și useEffect din React pentru gestionarea stării și efectelor.

const TaskList = ({ username }) => { // Componenta TaskList primește username ca proprietate (prop).
    const [tasks, setTasks] = useState([]); // Stare pentru a stoca lista de task-uri.
    const [taskName, setTaskName] = useState(''); // Stare pentru a stoca numele unui task.
    const [deadline, setDeadline] = useState(''); // Stare pentru a stoca termenul limită al unui task.
    const [priority, setPriority] = useState('Medium'); // Stare pentru a stoca nivelul de prioritate al unui task.
    const [editingTaskId, setEditingTaskId] = useState(null); // Stare pentru a identifica task-ul aflat în editare.
    const [editedTaskName, setEditedTaskName] = useState(''); // Stare pentru a stoca numele editat al unui task.
    const [editedTaskStatus, setEditedTaskStatus] = useState(''); // Stare pentru a stoca statusul editat al unui task.

    
    useEffect(() => { // Se execută la montarea componentei sau când username se schimbă.
        const savedTasks = JSON.parse(localStorage.getItem(username + '_tasks')) || []; // Încarcă task-urile salvate pentru utilizatorul curent din localStorage.
        setTasks(savedTasks); // Actualizează starea tasks cu valorile încărcate.
    }, [username]); // Efectul se execută când username se modifică.

    
    useEffect(() => { // Se execută ori de câte ori tasks sau username se schimbă.
        localStorage.setItem(username + '_tasks', JSON.stringify(tasks)); // Salvează task-urile curente în localStorage.
    }, [tasks, username]);

    
    useEffect(() => { // Se execută la montarea componentei.
        if (Notification.permission !== 'granted') { // Dacă permisiunea pentru notificări nu este acordată...
            Notification.requestPermission(); // Cere permisiunea pentru notificări.
        }
    }, []); // Efectul se execută o singură dată, la montare.

    
    const sendNotification = (message) => { // Funcție pentru trimiterea notificărilor.
        if (Notification.permission === 'granted') { // Dacă permisiunea este acordată...
            new Notification(message); // Trimite o notificare cu mesajul primit ca parametru.
        }
    };

    
    const addTask = () => { // Funcție pentru adăugarea unui task nou.
        if (taskName.trim() === '') { // Verifică dacă numele task-ului este gol.
            alert('Task name is required.'); // Afișează un mesaj de eroare.
            return;
        }
        if (deadline.trim() === '') { // Verifică dacă termenul limită este gol.
            alert('Deadline is required.'); // Afișează un mesaj de eroare.
            return;
        }

        const today = new Date(); // Obține data curentă.
        const taskDeadline = new Date(deadline); // Creează un obiect de tip Date din termenul limită.
        let status = 'Upcoming'; // Statusul implicit al task-ului.

        // Validare termen limită
        if (taskDeadline < today) { // Dacă termenul limită este depășit...
            status = 'Overdue'; // Setează statusul ca "Overdue".
            sendNotification(`The deadline for task "${taskName}" is already overdue!`); // Trimite o notificare.
        } else if (
            taskDeadline.toDateString() === 
            new Date(today.setDate(today.getDate() + 1)).toDateString() // Dacă termenul limită este mâine...
        ) {
            sendNotification(`Reminder: The deadline for task "${taskName}" is tomorrow.`); // Trimite o notificare.
        }

        const newTask = { // Creează un obiect pentru noul task.
            id: Date.now(), // Generează un ID unic folosind timestamp.
            name: taskName, // Atribuie numele task-ului.
            deadline, // Atribuie termenul limită.
            priority, // Atribuie nivelul de prioritate.
            status, // Atribuie statusul.
        };

        setTasks([...tasks, newTask]); // Adaugă noul task la lista de task-uri existente.
        setTaskName(''); // Resetează câmpul pentru numele task-ului.
        setDeadline(''); // Resetează câmpul pentru termenul limită.
        setPriority('Medium'); // Resetează nivelul de prioritate.
    };

    const deleteTask = (taskId) => { // Funcție pentru ștergerea unui task.
        setTasks(tasks.filter(task => task.id !== taskId)); // Filtrează task-urile pentru a le păstra pe cele care nu au ID-ul specificat.
    };

    const startEditingTask = (task) => { // Funcție pentru a iniția editarea unui task.
        setEditingTaskId(task.id); // Setează ID-ul task-ului în editare.
        setEditedTaskName(task.name); // Setează numele task-ului pentru editare.
        setEditedTaskStatus(task.status); // Setează statusul task-ului pentru editare.
    };

    const saveEditedTask = () => { // Funcție pentru a salva modificările unui task.
        setTasks(tasks.map(task =>
            task.id === editingTaskId
                ? { ...task, name: editedTaskName, status: editedTaskStatus }
                : task // Actualizează doar task-ul care are ID-ul egal cu cel în editare.
        ));
        setEditingTaskId(null); // Resetează ID-ul task-ului în editare.
        setEditedTaskName(''); // Resetează numele task-ului editat.
        setEditedTaskStatus(''); // Resetează statusul task-ului editat.
    };

    // Sortarea task-urilor în funcție de prioritate
    const sortedTasks = tasks.sort((a, b) => { // Sortează task-urile în funcție de prioritate.
        const priorityOrder = { High: 1, Medium: 2, Low: 3 }; // Definește ordinea priorităților.
        return priorityOrder[a.priority] - priorityOrder[b.priority]; // Compară prioritățile pentru sortare.
    });

    return (
        <div className="container tasklist-container"> {/* Containerul pentru componenta TaskList */}
            <h2>Welcome, {username}! Your Tasks</h2> {/* Mesaj de întâmpinare pentru utilizator */}
            <div> {/* Formular pentru adăugarea unui task nou */}
                <input
                    type="text"
                    placeholder="Task name"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                />
                <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                />
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
                <button onClick={addTask}>ADD TASK</button>
            </div>

            <ul>
                {/* Listă de task-uri sortate */}
                {sortedTasks.map((task) => (
                    <li className="task-item" data-priority={task.priority} key={task.id}>
                        {editingTaskId === task.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editedTaskName}
                                    onChange={(e) => setEditedTaskName(e.target.value)}
                                />
                                <select
                                    value={editedTaskStatus}
                                    onChange={(e) => setEditedTaskStatus(e.target.value)}
                                >
                                    <option value="Completed">Completed</option>
                                    <option value="Cancelled">Cancelled</option>
                                    <option value="Upcoming">Upcoming</option>
                                    <option value="Overdue">Overdue</option>
                                </select>
                                <button onClick={saveEditedTask}>SAVE</button>
                                <button onClick={() => setEditingTaskId(null)}>CANCEL</button>
                            </>
                        ) : (
                            <>
                                <span>
                                    <strong>{task.name}</strong> - {task.deadline} - {task.priority} - {task.status}
                                </span>
                                <button onClick={() => startEditingTask(task)}>EDIT</button>
                                <button onClick={() => deleteTask(task.id)}>DELETE</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList; // Exportă componenta TaskList.
