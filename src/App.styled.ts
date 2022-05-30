import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  height: 100vh;
  padding: 1rem 2rem;
`;

export const Boards = styled.div`
  position: relative;
  display: flex;
  width: fit-content;
  max-height: 70%;
  max-width: 100%;
  overflow-x: scroll;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;
