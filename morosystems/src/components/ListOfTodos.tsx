import deleteBtn from "../assets/delete.png";
import editBtn from "../assets/edit.png";
import { useContext, useState, ChangeEvent } from "react";
import { MyContext } from "../App";
import styles from "./ListOfTodos.module.css";
import { lastClickedState } from "../App";
const ListOfTodos: React.FC<{ lastClicked: lastClickedState }> = ({
  lastClicked,
}) => {
  const { todos, setTodos } = useContext(MyContext);
  const [editingModes, setEditingModes] = useState<boolean[]>(
    Array(todos.length).fill(false)
  );

  //filtering todos based on chosen filter
  const deleteTodo = (indexToDelete: number): void => {
    setTodos((prevTodos) =>
      prevTodos.filter((_, index) => index !== indexToDelete)
    );
  };

  const handleCheckboxClick = (todoName: string) => {
    const updatedTodos = todos.map((todo) =>
      todo.name === todoName ? { ...todo, checked: !todo.checked } : todo
    );
    setTodos(updatedTodos);
  };

  const onEditHandler = (index: number, value: boolean) => {
    const updatedEditingModes = [...editingModes];
    updatedEditingModes[index] = value;
    setEditingModes(updatedEditingModes);
  };

  const editInputHandler = (
    event: ChangeEvent<HTMLInputElement>,
    elemName: string
  ) => {
    const updatedTodos = todos.map((todo) =>
      todo.name === elemName ? { ...todo, name: event.target.value } : todo
    );

    setTodos(updatedTodos);
  };
  let filteredTodos = [...todos];

  if (lastClicked === lastClickedState.Active) {
    filteredTodos = todos.filter((todo) => !todo.checked);
  } else if (lastClicked === lastClickedState.Completed) {
    filteredTodos = todos.filter((todo) => todo.checked);
  }

  return filteredTodos.map((elem, index) => {
    return (
      <li key={`list-item-${elem.id}-${index}`} className={styles.li}>
        {!editingModes[index] ? (
          <div
            className={
              elem.checked
                ? `${styles.listElem} ${styles.checked}`
                : styles.listElem
            }
          >
            <div className={styles.checkboxWithText}>
              <input
                type="checkbox"
                checked={elem.checked}
                onChange={() => handleCheckboxClick(elem.name)}
              />
              <p>{elem.name}</p>
            </div>

            <div className={styles.buttons}>
              <button onClick={() => onEditHandler(index, true)}>
                <img src={editBtn} alt="Edit" />
              </button>
              <button onClick={() => deleteTodo(index)}>
                <img src={deleteBtn} alt="Delete" />
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.editModeWrapper}>
            <input
              type="text"
              value={elem.name}
              onChange={(event) => editInputHandler(event, elem.name)}
            />
            <button
              className={styles.saveBtn}
              onClick={() => onEditHandler(index, false)}
            >
              Save
            </button>
          </div>
        )}
      </li>
    );
  });
};
export default ListOfTodos;
