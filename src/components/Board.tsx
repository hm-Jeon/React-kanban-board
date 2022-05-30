import { memo } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import DraggableCard from "./DraggableCard";
import { IToDo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";
import BoardHeader from "./BoardHeader";
import { Area, AreaHeader, DeleteAllBtn, Wrapper } from "./Board.styled";

interface IBoardProps {
  toDos: IToDo[];
  boardId: string;
  index: number;
}

function Board({ toDos, boardId, index }: IBoardProps) {
  // reference는 특정 HTML 요소를 가져와서 조작할 수 있도록 해준다.
  // const inputRef = useRef<HTMLInputElement>(null);
  const setToDos = useSetRecoilState(toDoState);

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
      {(provided, info) => (
        <Wrapper
          ref={provided.innerRef}
          {...provided.draggableProps}
          isDragging={info.isDragging}
        >
          <BoardHeader boardId={boardId} provided={provided} />
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
