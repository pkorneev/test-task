import React from "react";
import styles from "./Controls.module.css";
import { useContext } from "react";
import { MyContext } from "../App";
import { lastClickedState } from "../App";

const Controls: React.FC<{
  onFilter: (event: React.MouseEvent<HTMLButtonElement>) => void;
  lastClicked: lastClickedState;
}> = ({ onFilter, lastClicked }) => {
  const { setTodos } = useContext(MyContext);
  //delete all completed (checked) elements
  const deleteHandler = () => {
    setTodos((prev) => prev.filter((todo) => !todo.checked));
  };

  return (
    <div className={styles.controlsWrapper}>
      <div className={styles.controlsContent}>
        <button className={styles.deleteBtn} onClick={deleteHandler}>
          Delete Completed
        </button>
        <div className={styles.filterButtons}>
          <button
            onClick={onFilter}
            value="All"
            className={
              lastClicked === lastClickedState.All
                ? `${styles.filterBtn} ${styles.chosen}`
                : styles.filterBtn
            }
          >
            All
          </button>
          <button
            onClick={onFilter}
            value="Active"
            className={
              lastClicked === lastClickedState.Active
                ? `${styles.filterBtn} ${styles.chosen}`
                : styles.filterBtn
            }
          >
            Active
          </button>
          <button
            onClick={onFilter}
            value="Completed"
            className={
              lastClicked === lastClickedState.Completed
                ? `${styles.filterBtn} ${styles.chosen}`
                : styles.filterBtn
            }
          >
            Completed
          </button>
        </div>
      </div>
    </div>
  );
};

export default Controls;
