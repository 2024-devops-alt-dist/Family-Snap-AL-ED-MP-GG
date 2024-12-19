import { userInterface } from "../entity/userInterface";
import { supabase } from "../supabaseConfig";

export async function getUsers(): Promise<userInterface[]> {
    const { data, error } = await supabase
    .from("user")
    .select("id, created_at, name, password")
    
    if (error) {
        throw new Error(`Erreur lors de la récupération des utilisateurs : ${error.message}`);
    }
    return data || [];
}

export async function createUser(user: Omit<userInterface, "id">): Promise<userInterface> {
    const { data, error } = await supabase.from("user").insert([user]).select().single();
    
    if (error) {
        throw new Error(`Erreur lors de la création de l'utilisateur : ${error.message}`);
    }
    return data;
}

export async function updateUser(userId: number, updates: Partial<userInterface>): Promise<userInterface> {
    const { data, error } = await supabase
    .from("user")
    .update(updates)
    .eq("id", userId)
    .select("id, created_at, name, password")
    .single();
    
    if (error) {
        throw new Error(`Erreur lors de la mise à jour de l'utilisateur : ${error.message}`);
    }
    return data;
}

// delete
export async function deleteUser(userId: number): Promise<void> {
    const { error } = await supabase.from("user").delete().eq("id", userId);
    if (error) {
        throw new Error(`Erreur lors de la suppression de l'utilisateur: ${error.message}`);
    }
}