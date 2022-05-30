import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const Area = styled.div<IArea>`
  position: absolute;
  bottom: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: ${props =>
    props.isDraggingOver ? props.theme.cardColor : "transparent"};
  transition: background-color 0.3s ease-in-out;
`;

const Icon = styled.i`
  position: fixed;
  font-size: 1.2em;
  color: ${props => props.theme.textColor};
`;

interface IArea {
  isDraggingOver: boolean;
}

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
