import { useContext } from "react";
import { MyContext } from "../App";
import Wrapper from "../ui/Wrapper";
import styles from "./Todos.module.css";
import ListOfTodos from "./ListOfTodos";
import { lastClickedState } from "../App";
const Todos: React.FC<{ lastClicked: lastClickedState }> = ({
  lastClicked,
}) => {
  const { todos } = useContext(MyContext);
  //counting active elements
  let activeTodos = todos.reduce(
    (count, elem) => (elem.checked ? count : count + 1),
    0
  );
  return (
    <div>
      <Wrapper>
        <div className={styles.itemsLeftWrapper}>{activeTodos} items left</div>
        <div className={styles.todosContent}>
          <ul className={styles.list}>
            <ListOfTodos lastClicked={lastClicked} />
          </ul>
        </div>
      </Wrapper>
    </div>
  );
};
export default Todos;
