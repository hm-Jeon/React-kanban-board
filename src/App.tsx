import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";

import { toDoOrderState, toDoState } from "./atoms";
import Board from "./components/Board";
import AddBoardForm from "./components/AddBoardForm";
import RecycleBin from "./components/RecycleBin";
import { Boards, Wrapper } from "./App.styled";

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [toDosOrder, setToDosOrder] = useRecoilState(toDoOrderState);

  localStorage.setItem("trelloToDos", JSON.stringify(toDos));
  localStorage.setItem("trelloToDosOrder", JSON.stringify(toDosOrder));

  const onDragEnd = ({ destination, source }: DropResult) => {
    // 이동하지 않음. destination 정보 없음
    if (!destination) return;

    // 같은 Droppable 안에서 이동했을 때
    if (source.droppableId === destination.droppableId) {
      // boards Droppable 안에서 Board의 순서를 변경했을 때
      if (destination.droppableId === "boards") {
        setToDosOrder(currentOrder => {
          const order = [...currentOrder];
          const movedBoard = order.splice(source.index, 1);
          order.splice(destination.index, 0, ...movedBoard);

          return order;
        });
      }
      // Board 내에서 Task의 순서를 변경했을 때
      else {
        setToDos(allBoards => {
          const board = [...allBoards[source.droppableId]];
          const obj = board[source.index];
          board.splice(source.index, 1);
          board.splice(destination.index, 0, obj);
          // const item = board.splice(source.index, 1);
          // board.splice(destination.index, 0, ...item);

          return {
            ...allBoards,
            [source.droppableId]: board,
          };
        });
      }
    }
    // Task를 Recycle bin에 Drop 했을 때(삭제)
    else if (destination.droppableId === "recycleBin") {
      setToDos(allBoards => {
        const board = [...allBoards[source.droppableId]];
        board.splice(source.index, 1);

        return {
          ...allBoards,
          [source.droppableId]: board,
        };
      });
    }
    // Task를 다른 Board로 이동했을 때
    else {
      setToDos(allBoards => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const destinationBoard = [...allBoards[destination.droppableId]];
        const obj = sourceBoard[source.index];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination.index, 0, obj);
        // const item = sourceBoard.splice(source.index, 1);
        // destinationBoard.splice(destination.index, 0, ...item);

        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };

  return (
    // react-beautiful-dnd
    // DragDropContext -> Droppable -> Draggable
    // Droppable, Draggable의 Children은 함수여야 한다.
    <Wrapper>
      <AddBoardForm />
      {/* DragDropContext의 onDragEnd 속성으로 드래그가 끝난 뒤 실행할 함수를 지정한다. */}
      <DragDropContext onDragEnd={onDragEnd}>
        {toDos ? (
          <Droppable droppableId="boards" direction="horizontal" type="boards">
            {provided => (
              <>
                <Boards ref={provided.innerRef}>
                  {toDosOrder.map((boardName, index) => {
                    return (
                      <Board
                        key={boardName}
                        boardId={boardName}
                        toDos={toDos[boardName]}
                        index={index}
                      />
                    );
                  })}
                  {provided.placeholder}
                </Boards>
                <RecycleBin />
              </>
            )}
          </Droppable>
        ) : null}
      </DragDropContext>
    </Wrapper>
  );
}

export default App;
