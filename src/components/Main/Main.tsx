import { Col, Container, Row } from "react-bootstrap";
import ListsView from "../ListsView/ListsView";
import TodosListView from "../TodosList/TodosListView";
import TodoList from "../../domain/TodoList";
import { useEffect, useState } from "react";
import { useLists } from "../../hooks/hooks";

function Main() {
  const [selected, setSelected] = useState<TodoList | null>(null);
  const { todoLists } = useLists();

  useEffect(() => {
    setSelected((s) => todoLists?.find((ls) => ls.id === s?.id) ?? null);
  }, [todoLists]);

  return (
    <Container className="h-100">
      <Row className="h-100">
        <Col sm={6}>
          <ListsView onSelection={setSelected} />
        </Col>
        <Col sm={6}>
          <TodosListView list={selected} />
        </Col>
      </Row>
    </Container>
  );
}

export default Main;
