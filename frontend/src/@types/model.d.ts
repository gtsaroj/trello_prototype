declare namespace Model {
  interface TodoList {
    todo_id?:string
    id: string;
    title: string;
    description: string;
    comment?: string;
    label?: string[];
    date?: string;
    attachment?: string[];
    location?: string;
    createdAt?: Common.TimeStamp;
    updatedAt?: Common.TimeStamp;
  }
  interface Todo {
    id: string;
    title: string;
    todoList: TodoList
  }
}
