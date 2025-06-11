import { zodResolver } from "@hookform/resolvers/zod"
import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { Tables } from "../constants/supabase.constants"
import { TodoListContext } from "../context/todoListContext"
import { todoSchema } from "../schemas/todoSchema"
import { SupabaseService } from "../SupabaseService"
import styles from "./Form.module.css"

export const Form = () => {
    const { setTodos } = useContext(TodoListContext); 
    const formFields = ["title", "description"]; 
    const [file, setFile] = useState(null); 

    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors }
    } = useForm({
        resolver: zodResolver(todoSchema),
        defaultValues: {
            title: "",
            description: ""
        }
    });

    const onSubmit = async (todo) => {
        let src = "";
        if (file) {
            src = await appendFile(file);
        }
        const todoWithImage = { ...todo, src }; 
        const insertedTodo = await SupabaseService.insertInto(Tables.todos, todoWithImage);
        setTodos(todos => [...todos, insertedTodo]);
    };

    const appendFile = async (file) => {
        const publicUrlData = await SupabaseService.appendFile(file);
        return publicUrlData.publicUrl || publicUrlData.publicURL || publicUrlData; 
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            {formFields.map((field) => (
                <div key={field}>
                    <input {...register(field)} placeholder={field.charAt(0).toUpperCase() + field.slice(1)} />
                    {errors[field] && <span>{errors[field].message}</span>}
                </div>
            ))}
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button disabled={isSubmitting}>Add new Task</button>
        </form>
    );
}