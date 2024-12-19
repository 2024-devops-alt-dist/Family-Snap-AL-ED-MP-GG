// import { Event } from "../entity/Event";
import { pictureInterface } from "../entity/pictureInterface";
import { supabase } from "../supabaseConfig";

// Lire les photos
export async function getPicture(): Promise<pictureInterface[]> {
  const { data, error } = await supabase
    .from("photo")
    .select()
    .returns<pictureInterface[]>()
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(
      `Erreur lors de la récupération des événements : ${error.message}`
    );
  }
  return data || [];
}

// Lire les photos par event_id
export async function getPicturesByEventId(eventId: number): Promise<pictureInterface[]> {
  const { data, error } = await supabase
    .from("photo") // Adjust "photo" to your actual table name
    .select("*")
    .eq("event_id", eventId)
    .returns<pictureInterface[]>()
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(
      `Erreur lors de la récupération des photos pour l'événement ${eventId} : ${error.message}`
    );
  }
  return data || [];
}

// Créer une photo
export async function createPicture(
  fileName: string
): Promise<pictureInterface> {
  const newEvent: pictureInterface = {
    url: fileName,
    event_id: 14,
    created_at: new Date(),
  };
  const { data, error } = await supabase
    .from("photo")
    .insert([newEvent])
    .select()
    .single();
  console.log(data, newEvent);

  if (error) {
    throw new Error(
      `Erreur lors de la création de le photo : ${error.message}`
    );
  }
  return data;
}

// Mettre à jour une photo
export async function updatePicture(
  pictureId: number,
  updates: Partial<pictureInterface>
): Promise<pictureInterface> {
  const { data, error } = await supabase
    .from("photo")
    .update(updates)
    .eq("id", pictureId)
    .select()
    .returns<pictureInterface>()
    .single();

  if (error) {
    throw new Error(
      `Erreur lors de la mise à jour de le photo : ${error.message}`
    );
  }
  return data;
}

// delete une photo
export async function deletePicture(pictureId: number): Promise<void> {
  const { error } = await supabase.from("photo").delete().eq("id", pictureId);
  if (error) {
    throw new Error(
      `Erreur lors de la suppression de le photo : ${error.message}`
    );
  }
}
