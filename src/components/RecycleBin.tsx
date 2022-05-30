import { Droppable } from "react-beautiful-dnd";
import { Area, Icon } from "./RecycleBin.styled";

function RecycleBin() {
  return (
    <Droppable droppableId="recycleBin" type="board">
      {(provided, info) => {
        return (
          <Area ref={provided.innerRef} isDraggingOver={info.isDraggingOver}>
            <Icon className="fa-solid fa-trash"></Icon>
            {provided.placeholder}
          </Area>
        );
      }}
    </Droppable>
  );
}

export default RecycleBin;
