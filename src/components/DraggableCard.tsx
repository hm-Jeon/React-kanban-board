import { memo } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Card } from "./DraggableCard.styled";

interface IDraggableCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
}

function DraggableCard({ toDoId, toDoText, index }: IDraggableCardProps) {
  return (
    // Draggable의 key와 draggabledId는 동일해야 한다!
    <Draggable draggableId={String(toDoId)} index={index}>
      {/* Draggble의 Children인 함수도 마찬가지로 인자로 provided를 받는다. */}
      {(provided, info) => (
        // Draggble로 지정할 Element의 ref 속성에 provided.innerRef를 지정하고,
        // Element의 속성으로 provided.draggableProps를 전개연산자로 풀어놓는다.
        // Element 내에서 드래그할 수 있는 Handle을 지정할 때 지정할 Element의 속성으로 provide.dragHandleProps를 전개연산자로 풀어놓으면 된다.
        <Card
          isDragging={info.isDragging}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          {toDoText}
        </Card>
      )}
    </Draggable>
  );
}

export default memo(DraggableCard);
