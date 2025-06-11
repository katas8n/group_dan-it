
import { supabase } from "./supabase";

export class SupabaseService { 
    static async getAll(tableName, selectedValues = "*") {
        let { data, error } = await supabase
                .from(tableName)
                .select(selectedValues)


        if(error) throw Error("There something went wrong, pls try again later!"); 
        
        return data;
    }

    static async insertInto(tableName, insertionData) {
        const insertedTodo = await supabase.from(tableName).insert(insertionData).select(); 
        
        const { data, error } = insertedTodo; 

        return data[0]
    }

    static async updateBy(tableName, updatedElement, col, value) {
        const updated = await supabase.from(tableName).update(updatedElement).eq(col, value).select(); 
        debugger;
        
        const { data, error } = updated; 
        

        return data[0]; 
    }

    static async getElementBy(tableName, col, value) {
        const data = (await supabase.from(tableName).select("*").eq(col, value)).data; 
        
        return data[0];
    }

    static async getElementsBy(tableName, col, value) {
        const data = (await supabase.from(tableName).select("*").eq(col, value)).data; 
        
        return data;
    }

    static async deleteBy(tableName, col, value) {
        const deletedItem = (await supabase.from(tableName).delete().eq(col, value).select()).data[0]; 
        
        return deletedItem
    }

    static async appendFile(file) {
    const storage = supabase.storage.from("todo-images"); 

    const filePath = `${Date.now()}-${Math.random().toString().slice(2,8)}`;

    const { data, error } = await storage.upload(filePath, file);

    if (error) {
        throw new Error("File upload failed: " + error.message);
    }

    const { data: publicUrlData } = storage.getPublicUrl(filePath);

    return publicUrlData;
    }
}