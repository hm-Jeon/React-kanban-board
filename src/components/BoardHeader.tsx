import { DraggableProvided } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoOrderState, toDoState } from "../atoms";
import {
  DeleteBtn,
  Form,
  Handle,
  Input,
  Title,
  Top,
} from "./BoardHeader.styled";

interface IBoardHeaderProps {
  boardId: string;
  provided: DraggableProvided;
}

interface IForm {
  toDo: string;
}

function BoardHeader({ boardId, provided }: IBoardHeaderProps) {
  const setToDos = useSetRecoilState(toDoState);
  const setToDosOrder = useSetRecoilState(toDoOrderState);
  const { register, setValue, handleSubmit } = useForm<IForm>();

  const onValid = ({ toDo }: IForm) => {
    const newToDo = { id: Date.now(), text: toDo };
    setValue("toDo", "");

    setToDos(allBoards => {
      return {
        ...allBoards,
        [boardId]: [...allBoards[boardId], newToDo],
      };
    });
  };

  const deleteBoard = () => {
    setToDos(allBoards => {
      const boards = { ...allBoards };
      delete boards[boardId];
      return { ...boards };
    });

    setToDosOrder(currentOrder =>
      currentOrder.filter(boardName => boardName !== boardId)
    );
  };

  return (
    <>
      <Top>
        <Handle
          className="fa-solid fa-grip-lines-vertical"
          {...provided.dragHandleProps}
        ></Handle>
        <Title>{boardId}</Title>
        <DeleteBtn
          className="fa-solid fa-circle-xmark"
          onClick={deleteBoard}
        ></DeleteBtn>
      </Top>
      <Form onSubmit={handleSubmit(onValid)}>
        <Input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={`Add task on ${boardId}`}
        />
      </Form>
    </>
  );
}

export default BoardHeader;
