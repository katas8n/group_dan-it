import { useContext } from "react";
import { TodoListContext } from "../context/todoListContext";
import { Todo } from "./Todo";

export const Todos = () => {

    const {todos, setTodos} = useContext(TodoListContext); 
    
    return ( 
        <div className="todos">
            {  
                todos.length > 0 ?
                todos.map(({id, title, description, iscompleted, src}) => {
                    return <Todo key={id} id={id} title={title} description={description} isCompleted={iscompleted} src={src}/>
                }) : <h2>There aren't any todo!</h2> 
            }
        </div>
    );
}
