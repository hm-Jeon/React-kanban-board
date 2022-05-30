import { atom } from "recoil";

export interface IToDo {
  id: number;
  text: string;
}

interface ITodosState {
  [key: string]: IToDo[];
}

export const toDoState = atom<ITodosState>({
  key: "toDo",
  default: JSON.parse(
    localStorage.getItem("trelloToDos") || JSON.stringify({})
  ),
});

export const toDoOrderState = atom<string[]>({
  key: "toDoOrder",
  default: JSON.parse(
    localStorage.getItem("trelloToDosOrder") || JSON.stringify([])
  ),
});
