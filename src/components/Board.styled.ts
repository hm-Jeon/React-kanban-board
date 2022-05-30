import styled from "styled-components";

interface IWrapperProps {
  isDragging: boolean;
}

export const Wrapper = styled.div<IWrapperProps>`
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
  opacity: ${props => (props.isDragging ? 0.5 : 1)};
  user-select: none;
`;

interface IAreaProps {
  isDraggingOver: boolean;
  draggingFromThisWith: boolean;
}

export const Area = styled.div<IAreaProps>`
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

export const AreaHeader = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 0.4em 0 0;
`;

export const DeleteAllBtn = styled.i`
  cursor: pointer;
`;
