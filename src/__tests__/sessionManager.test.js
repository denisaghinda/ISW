import SessionManager from "../services/SessionManager";

describe("SessionManager Tests", () => {
  beforeEach(() => {
    localStorage.clear();
    SessionManager.init();
  });

  test("Set and Get User", () => {
    SessionManager.setUser("testuser");
    expect(SessionManager.getUser()).toBe("testuser");
  });

  test("Add and Get Tasks", () => {
    SessionManager.addTask({ id: 1, title: "Test Task", priority: "High" });
    const tasks = SessionManager.getTasks();
    expect(tasks.length).toBe(1);
    expect(tasks[0].title).toBe("Test Task");
  });

  test("Delete Task", () => {
    SessionManager.addTask({ id: 2, title: "Task to Delete", priority: "Low" });
    const tasksBefore = SessionManager.getTasks();
    expect(tasksBefore.length).toBeGreaterThan(0);

    SessionManager.deleteTask(2);
    const tasksAfter = SessionManager.getTasks();
    expect(tasksAfter.find(task => task.id === 2)).toBeUndefined();
  });
});
