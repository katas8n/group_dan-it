import { createContext, useEffect, useState } from "react";
import { SupabaseService } from "../SupabaseService";
import { Tables } from "../constants/supabase.constants";

export const TodoListContext = createContext();

export function TodoListContextWrapper({ children }) {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    (async () => {
        const todos = await SupabaseService.getAll(Tables.todos);
        
        setTodos(todos);
    })();
  },[])
  return (
    <TodoListContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodoListContext.Provider>
  );
}