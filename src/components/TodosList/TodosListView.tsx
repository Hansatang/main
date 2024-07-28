import { Col, Container, Row } from "react-bootstrap";
import CreateTodoView from "../CreateTodoView/CreateTodoView";
import TodoList from "../../domain/TodoList";
import TodoEntry from "../TodoEntry/TodoEntry";
import Todo from "../../domain/Todo";
import { useLists } from "../../hooks/hooks";

export type TodosListViewProps = {
  list: TodoList | null;
};

function TodosListView(props: TodosListViewProps) {
  const { updateList } = useLists();

  const addTodo: (title: string) => Promise<TodoList> = (title) => {
    if (!props.list) {
      return Promise.reject('List is empty');
    }

    const newList: TodoList = {
      id: props.list.id,
      name: props.list.name,
      todos: props.list.todos.concat({ title: title }),
    };
    console.log('ADDING', newList);

    return updateList(newList);
  };

  console.log(props.list);

  const updateTodo: (updated: Todo) => void = (updated) => {
    if (!props.list) {
      return;
    }

    const newList: TodoList = {
      id: props.list.id,
      name: props.list.name,
      todos: props.list.todos.map((t) => (t.id === updated.id ? updated : t)),
    };

    updateList(newList);
  };

  const deleteTodo: (id: string) => void = (id) => {
    if (!props.list) {
      return;
    }

    const newList: TodoList = {
      id: props.list.id,
      name: props.list.name,
      todos: props.list.todos.filter((t) => t.id !== id),
    };

    updateList(newList);
  };

  return (
    <Container className="bg-secondary h-100 d-flex flex-column">
      <Row className="bg-success">
        <Col>Todos</Col>
      </Row>
      {props.list && (
        <>
          <Row className="flex-grow-1">
            {props.list.todos.map((todo) => (
              <TodoEntry
                key={todo.id}
                todo={todo}
                onDelete={deleteTodo}
                onUpdate={updateTodo}
              />
            ))}
          </Row>
          <Row>
            <Col>
              <CreateTodoView onCreate={addTodo} />
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
}

export default TodosListView;
