declare namespace Todo {
  interface TodoList<T> {
    id: string;
    todo_id: Partial<Todo["id"]>;
    title: string;
    description: string;
    comment?: string;
    label?: string[];
    date?: string;
    attachment?: T[];
    location?: string;
    createdAt?: Common.TimeStamp;
    updatedAt?: Common.TimeStamp;
  }
  interface Todo {
    id: string;
    title: string;
  }
}
