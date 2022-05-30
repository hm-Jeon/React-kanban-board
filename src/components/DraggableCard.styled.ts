import styled from "styled-components";

export const Card = styled.div<ICardProps>`
  padding: 1em;
  background-color: ${props =>
    props.isDragging ? "#364954" : props.theme.cardColor};
  margin: 0.4em 0;
  border-radius: 0.2em;
  opacity: ${props => (props.isDragging ? 0.5 : 1)};
`;

interface ICardProps {
  isDragging: boolean;
}
