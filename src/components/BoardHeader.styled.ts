import styled from "styled-components";

export const Top = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 100%;
  padding: 0 0.5em;
`;

export const Title = styled.h1`
  max-width: 80%;
  font-size: 1.2em;
  font-weight: 600;
  text-transform: uppercase;
  overflow: hidden;
`;

export const Icon = styled.i`
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Handle = styled(Icon)``;

export const DeleteBtn = styled(Icon)`
  cursor: pointer;
`;

export const Form = styled.form`
  width: 100%;
  padding: 0.5em 0.5em;
`;

export const Input = styled.input`
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
