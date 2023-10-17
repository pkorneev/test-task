import React from "react";
import { useContext, useState, ChangeEvent, FormEvent } from "react";
import { MyContext } from "../App";
import Wrapper from "../ui/Wrapper";
import styles from "./InputTodo.module.css";
import { v4 as uuidv4 } from "uuid";

const InputTodo: React.FC = () => {
  const { setTodos } = useContext(MyContext);
  const [todo, setTodo] = useState<string>("");

  //2-way binding with input field
  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTodo(event.target.value);
  };
  //at the start of todos array in context and clearing an input-field
  const onSubmitHandler = (event: FormEvent) => {
    event.preventDefault();
    if (todo.trim().length >= 1) {
      const newTodo = {
        id: uuidv4(),
        name: todo,
        checked: false, //assuming a new todo is unchecked by default
        editing: false, //assuming a new todo is not in edit mode by default
      };

      setTodos((prevTodos) => [newTodo, ...prevTodos]);
    }
    setTodo("");
  };
  return (
    <Wrapper>
      <>
        <h1 className={styles.h1}>Todos</h1>
        <div className={styles.inputContent}>
          <form onSubmit={onSubmitHandler}>
            <input
              type="text"
              placeholder="What needs to be done?"
              value={todo}
              onChange={inputChangeHandler}
              required
              name="input"
              id="inputTodo"
            />
            <button type="submit" className={styles.button} id="addBtn">
              Add
            </button>
          </form>
        </div>
      </>
    </Wrapper>
  );
};

export default InputTodo;
