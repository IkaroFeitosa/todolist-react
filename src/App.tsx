import { Header } from "@components/Header";
import styles from "./App.module.css";
import { PlusCircle } from "phosphor-react";
import { ITask, Tasks } from "./components/Tasks";
import { useState, FormEvent, InvalidEvent, ChangeEvent } from "react";

function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [newTask, setNewTask] = useState("");
  function handleSubimit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTasks((old) => [
      ...old,
      { id: old.length + 1, content: newTask, status: "new" },
    ]);
    setNewTask("");
  }
  function handleCheckDone(id: number) {
    const updatedStatusTask = tasks.map((t) => {
      if (t.id === id)
        return {
          ...t,
          status: t.status === 'new' ? 'done' : 'new',
        } as ITask;
      return t;
    });
    setTasks(updatedStatusTask);
  }
  function handleRemoveTask(id: number) {
    const updatedTasks = tasks.filter((t) => t.id !== id);
    setTasks(updatedTasks);
  }
  function handleNewTextTask(e: ChangeEvent<HTMLInputElement>) {
    setNewTask(e.target.value);
    e.target.setCustomValidity('');
  }
  function handleIsValid(event:InvalidEvent<HTMLInputElement>){
    event.target.setCustomValidity('Este campo é obrigatório')
  }
  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <form className={styles.searchContainer} onSubmit={handleSubimit}>
          <input
            type="text"
            value={newTask}
            onChange={handleNewTextTask}
            placeholder="Adicione uma nova tarefa"
            onInvalid={handleIsValid}
            required
          />
          <button type="submit">
            Criar
            <PlusCircle size={16} />
          </button>
        </form>
        <Tasks onRemoveTask={handleRemoveTask} tasks={tasks} onCheckDone={handleCheckDone}/>
      </div>
    </div>
  );
}

export default App;
