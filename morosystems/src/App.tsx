import React, { useState, createContext } from "react";
import Todos from "./components/Todos";
import InputTodo from "./components/InputTodo";
import Controls from "./components/Controls";
import FallBack from "./components/FallBack";

interface ITodo {
  id: string;
  name: string;
  checked: boolean;
  editing: boolean;
}

interface IContext {
  todos: ITodo[];
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
}
export enum lastClickedState {
  All,
  Active,
  Completed,
}
export const MyContext = createContext<IContext>({
  todos: [],
  setTodos: () => {},
});

const App: React.FC = () => {
  const [lastClicked, setLastClicked] = useState<lastClickedState>(
    lastClickedState.All
  ); //saving chosen filter
  const [todos, setTodos] = useState<ITodo[]>([
    { id: "dqdwdqw", name: "Buy some food", checked: false, editing: false },
    {
      id: "dqdqwdqsa1",
      name: "Finish test task from MoroSystems",
      checked: false,
      editing: false,
    },
  ]);
  //updating chosen filter
  const onFilterHandler = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    const filterValue = event.currentTarget.value;
    if (filterValue === "All") {
      setLastClicked(lastClickedState.All);
    } else if (filterValue === "Active") {
      setLastClicked(lastClickedState.Active);
    } else if (filterValue === "Completed") {
      setLastClicked(lastClickedState.Completed);
    }
  };
  return (
    <MyContext.Provider value={{ todos, setTodos }}>
      <div className="appWrapper">
        <InputTodo />
        {todos.length != 0 && (
          <Controls onFilter={onFilterHandler} lastClicked={lastClicked} />
        )}
        {todos.length != 0 && <Todos lastClicked={lastClicked} />}

        {todos.length == 0 && <FallBack />}
      </div>
    </MyContext.Provider>
  );
};

export default App;
