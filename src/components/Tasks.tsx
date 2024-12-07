import { Trash } from "phosphor-react";
import styles from "./Tasks.module.css";
import EmptyIcon from "@/assets/emptyList.svg";
export interface ITask {
  id: number;
  content: string;
  status: "new" | "done";
}
interface ITaskProps {
  tasks: ITask[];
  onCheckDone: (id: number) => void;
  onRemoveTask: (id: number) => void;
}
export function Tasks({ tasks, onCheckDone, onRemoveTask }: ITaskProps) {
  const taskCreated = tasks.length;
  const taskCompleted = tasks.filter((task) => task.status === "done").length;

  const renderTasks = () => {
    return (
      <div className={styles.taskList}>
        {tasks.map((task) => (
          <div className={styles.task} key={task.id}>
            <div>
              <input
                type="checkbox"
                checked={task.status === "done"}
                onChange={() => onCheckDone(task.id)}
              />
              <label>{task.content}</label>
            </div>
            <div role="button" onClick={() => onRemoveTask(task.id)}>
              <Trash size={24} />
            </div>
          </div>
        ))}
      </div>
    );
  };
  const renderEmptyList = () => {
    return (
      <div className={styles.emptyList}>
        <img src={EmptyIcon} />
        <p>
          <strong>Você ainda não tem tarefas cadastradas</strong>
          Crie tarefas e organize seus itens a fazer
        </p>
      </div>
    );
  };
  return (
    <div className={styles.container}>
      <div className={styles.progress}>
        <div>
          Tarefas cridas <span>{taskCreated}</span>
        </div>
        <div>
          Concluidas{" "}
          <span>
            {taskCompleted} de {taskCreated}
          </span>
        </div>
      </div>
      <div>{tasks.length === 0 ? renderEmptyList() : renderTasks()}</div>
    </div>
  );
}
