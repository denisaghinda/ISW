const SessionManager = (function () {
    let user = null;
    let tasks = [];
  
    const loadUser = () => {
      user = localStorage.getItem("user");
    };
  
    const loadTasks = () => {
      const stored = localStorage.getItem("tasks");
      tasks = stored ? JSON.parse(stored) : [];
    };
  
    const saveTasks = () => {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    };
  
    return {
      init() {
        loadUser();
        loadTasks();
      },
      getUser() {
        return user;
      },
      setUser(u) {
        user = u;
        localStorage.setItem("user", u);
      },
      logout() {
        user = null;
        localStorage.removeItem("user");
      },
      getTasks() {
        return tasks;
      },
      addTask(task) {
        tasks.push(task);
        saveTasks();
      },
      deleteTask(id) {
        tasks = tasks.filter((t) => t.id !== id);
        saveTasks();
      },
    };
  })();
  
  export default SessionManager;
  