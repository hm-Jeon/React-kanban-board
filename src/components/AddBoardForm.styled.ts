import styled from "styled-components";

export const Form = styled.form`
  width: 17em;
  height: 55px;
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
  text-align: center;
  outline: 0;
`;

export const ErrorMsg = styled.div`
  margin-top: 0.5em;
  text-align: center;
  font-size: 0.8em;
  color: #e84118;
  -webkit-animation: shake-horizontal 0.8s
    cubic-bezier(0.455, 0.03, 0.515, 0.955) both;
  animation: shake-horizontal 0.8s cubic-bezier(0.455, 0.03, 0.515, 0.955) both;

  @-webkit-keyframes shake-horizontal {
    0%,
    100% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
    10%,
    30%,
    50%,
    70% {
      -webkit-transform: translateX(-10px);
      transform: translateX(-10px);
    }
    20%,
    40%,
    60% {
      -webkit-transform: translateX(10px);
      transform: translateX(10px);
    }
    80% {
      -webkit-transform: translateX(8px);
      transform: translateX(8px);
    }
    90% {
      -webkit-transform: translateX(-8px);
      transform: translateX(-8px);
    }
  }
  @keyframes shake-horizontal {
    0%,
    100% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
    10%,
    30%,
    50%,
    70% {
      -webkit-transform: translateX(-10px);
      transform: translateX(-10px);
    }
    20%,
    40%,
    60% {
      -webkit-transform: translateX(10px);
      transform: translateX(10px);
    }
    80% {
      -webkit-transform: translateX(8px);
      transform: translateX(8px);
    }
    90% {
      -webkit-transform: translateX(-8px);
      transform: translateX(-8px);
    }
  }
`;
