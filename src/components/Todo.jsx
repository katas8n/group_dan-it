import { zodResolver } from '@hookform/resolvers/zod';
import { useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { SupabaseService } from '../SupabaseService';
import { Tables } from '../constants/supabase.constants';
import { TodoListContext } from '../context/todoListContext';
import { todoSchema } from '../schemas/todoSchema';
import styles from "./Form.module.css";


export const Todo = ({ id, title, src, description, isCompleted}) => {
    const {todos, setTodos} = useContext(TodoListContext); 
    const formFields = ["title", "description"]; 
    const [isOpenModal, setIsOpenModal] = useState(false); 

    console.log(todos);
    

    const {
        register,
        handleSubmit,
        formState: { isLoading, isSubmitting, errors, }
    } = useForm(zodResolver(todoSchema),{
        defaultValues: {
            title: "",
            description: ""
        }
    })

    const onDeleteHandler = async () => {
        const deletedTodo = await SupabaseService.deleteBy(Tables.todos, "id", id); 
        setTodos(prevTodos => prevTodos.filter((todo) => todo.id !== deletedTodo.id)); 
    };

    const onUpdateHandler = async (newTodo) => {
        await SupabaseService.updateBy(Tables.todos, newTodo, "id", id); 

        setTodos(await SupabaseService.getAll(Tables.todos))
    }

    return ( 
        <div>
            {isOpenModal && (
                <form onSubmit={handleSubmit(onUpdateHandler)} className={styles.form}>
        
                    {formFields.map((field) => {
                        return <input key={field} {...register(field)} />
                    })}
        
                    <Button type='submit'>Edit task</Button>
                </form>
            )}
            <h3>{title}</h3>
            <img src={src} alt="Something went wrong" />
            <p>{description}</p>
            <p>{isCompleted ? "✅" : "❌"}</p>

            <div>
                <Button onClick={() => setIsOpenModal(prev => !prev)}>Edit</Button>
                <Button onClick={() => onDeleteHandler(id)}>Delete</Button>
            </div>
        </div>
    );
}

