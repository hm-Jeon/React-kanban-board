import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoOrderState, toDoState } from "../atoms";

const Form = styled.form`
  position: absolute;
  top: 1em;
  width: 17em;
`;

const Input = styled.input`
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

interface IForm {
  boardName: string;
}

function AddBoardForm() {
  const setToDos = useSetRecoilState(toDoState);
  const [toDosOrder, setToDosOrder] = useRecoilState(toDoOrderState);
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const onValid = ({ boardName }: IForm) => {
    setValue("boardName", "");
    if (!toDosOrder.includes(boardName)) {
      setToDos(allBoards => {
        return { ...allBoards, [boardName]: [] };
      });
      setToDosOrder(currentOrder => {
        return [...currentOrder, boardName];
      });
    } else {
      alert("동일한 이름의 Board가 있습니다.");
    }
  };

  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <Input
        {...register("boardName", { required: true })}
        placeholder="Add Board"
      ></Input>
    </Form>
  );
}

export default AddBoardForm;
