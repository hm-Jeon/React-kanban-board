import styled from "styled-components";

export const Area = styled.div<IArea>`
  position: relative;
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

export const Icon = styled.i`
  position: absolute;
  font-size: 1.2em;
  color: ${props => props.theme.textColor};
`;

interface IArea {
  isDraggingOver: boolean;
}
