import { memo } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";
import { useForm } from "react-hook-form";
import { IToDo, toDoOrderState, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 17em;
  max-width: 25em;
  min-height: 15em;
  height: fit-content;
  padding: 0.5em 0 0;
  margin: 0.5em;
  background-color: ${props => props.theme.boardColor};
  border-radius: 0.5em;
  user-select: none;
`;

const BoardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.5em 0.2em;
`;

const Title = styled.h1`
  font-size: 1.2em;
  font-weight: 600;
  text-transform: uppercase;
`;

const Handle = styled.i``;

const DeleteBtn = styled.i`
  cursor: pointer;
`;

const Area = styled.div<IAreaProps>`
  background-color: ${props =>
    props.isDraggingOver
      ? "#454b4e"
      : props.draggingFromThisWith
      ? "#454b4e"
      : "transparent"};
  flex-grow: 1;
  padding: 0 0.5em 0.5em;
  border-radius: 0 0 0.5em 0.5em;
  transition: background-color 0.3s ease-in-out;
`;

const AreaHeader = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 0.4em 0 0;
`;

const DeleteAllBtn = styled.i`
  cursor: pointer;
`;

const Form = styled.form`
  width: 100%;
  padding: 0.5em 0.5em;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5em;
  font-family: inherit;
  font-size: 1em;
  line-height: 1.2em;
  border: 0;
  border-radius: 0.2em;
  color: inherit;
  background-color: ${props => props.theme.inputColor};
  outline: 0;
`;

interface IBoardProps {
  toDos: IToDo[];
  boardId: string;
  index: number;
}

interface IAreaProps {
  isDraggingOver: boolean;
  draggingFromThisWith: boolean;
}

interface IForm {
  toDo: string;
}

function Board({ toDos, boardId, index }: IBoardProps) {
  // reference는 특정 HTML 요소를 가져와서 조작할 수 있도록 해준다.
  // const inputRef = useRef<HTMLInputElement>(null);
  const setToDos = useSetRecoilState(toDoState);
  const setToDosOrder = useSetRecoilState(toDoOrderState);

  const { register, setValue, handleSubmit } = useForm<IForm>();

  const onValid = ({ toDo }: IForm) => {
    const newToDo = { id: Date.now(), text: toDo };
    setValue("toDo", "");

    setToDos(allBoards => {
      return {
        ...allBoards,
        [boardId]: [...allBoards[boardId], newToDo],
      };
    });
  };

  const deleteBoard = () => {
    setToDos(allBoards => {
      const boards = { ...allBoards };
      delete boards[boardId];
      return { ...boards };
    });

    setToDosOrder(currentOrder =>
      currentOrder.filter(boardName => boardName !== boardId)
    );
  };

  const deleteAllTasks = () => {
    setToDos(allBoards => {
      return {
        ...allBoards,
        [boardId]: [],
      };
    });
  };

  return (
    <Draggable draggableId={boardId} index={index}>
      {provided => (
        <Wrapper ref={provided.innerRef} {...provided.draggableProps}>
          <BoardHeader>
            <Handle
              className="fa-solid fa-grip-lines-vertical"
              {...provided.dragHandleProps}
            ></Handle>
            <Title>{boardId}</Title>
            <DeleteBtn
              className="fa-solid fa-circle-xmark"
              onClick={deleteBoard}
            ></DeleteBtn>
          </BoardHeader>
          <Form onSubmit={handleSubmit(onValid)}>
            <Input
              {...register("toDo", { required: true })}
              type="text"
              placeholder={`Add task on ${boardId}`}
            />
          </Form>
          <Droppable droppableId={boardId} type="board">
            {/* Droppable의 Children인 함수는 인자로 provided과 info을 받는다. */}
            {(provided, info) => (
              // Droppable로 지정할 Element의 ref 속성에 provided.innerRef를 지정하고,
              // Element의 속성으로 provided.droppableProps를 전개연산자로 풀어놓는다.
              <Area
                // info의 isDraggingOver은 드래그하여 Droppable에 진입했을 때 true를 return하고,
                // draggingFromThisWith는 Droppable에서 시작되면 드래그가 끝날 때까지 true를 return한다.
                isDraggingOver={info.isDraggingOver}
                draggingFromThisWith={!!info.draggingFromThisWith}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {toDos.length > 0 ? (
                  <AreaHeader>
                    <DeleteAllBtn
                      className="fa-solid fa-eraser"
                      onClick={deleteAllTasks}
                    />
                  </AreaHeader>
                ) : null}
                {toDos.map((toDo, index) => (
                  // React.memo를 사용해 최적화(prop이 변경될 때만 rerendering)
                  <DraggableCard
                    key={toDo.id}
                    index={index}
                    toDoId={toDo.id}
                    toDoText={toDo.text}
                  />
                ))}
                {/* Draggable Element를 드래그할 때 Droppable Element의 크기를 유지하기 위해 provided.placeholder를 사용한다. */}
                {provided.placeholder}
              </Area>
            )}
          </Droppable>
        </Wrapper>
      )}
    </Draggable>
  );
}

export default memo(Board);
