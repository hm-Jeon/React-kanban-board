import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import { toDoOrderState, toDoState } from "../atoms";
import { ErrorMsg, Form, Input } from "./AddBoardForm.styled";

interface IForm {
  boardName: string;
}

function AddBoardForm() {
  const setToDos = useSetRecoilState(toDoState);
  const [toDosOrder, setToDosOrder] = useRecoilState(toDoOrderState);
  const { register, handleSubmit, setValue, setError, formState } =
    useForm<IForm>();

  console.log(formState.errors);

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
      setError("boardName", { message: "Board 이름 중복" });
    }
  };

  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <Input
        {...register("boardName", {
          required: true,
          maxLength: {
            value: 10,
            message: "Board 이름은 최대 10자까지 가능합니다.",
          },
        })}
        placeholder="Add Board"
      ></Input>
      {formState.errors.boardName ? (
        <ErrorMsg>{formState.errors.boardName?.message}</ErrorMsg>
      ) : null}
    </Form>
  );
}

export default AddBoardForm;
