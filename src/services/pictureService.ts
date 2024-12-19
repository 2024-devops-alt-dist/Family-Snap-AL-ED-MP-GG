// import { Event } from "../entity/Event";
import { pictureInterface } from "../entity/PictureInterface";
import { supabase } from "../supabaseConfig";

// Lire les événements
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

// Créer un événement
export async function createEvent(
  event: Omit<Event, "id">
): Promise<pictureInterface> {
  const { data, error } = await supabase
    .from("events")
    .insert([event])
    .select()
    .single();

  if (error) {
    throw new Error(
      `Erreur lors de la création de l'événement : ${error.message}`
    );
  }
  return data;
}

// Mettre à jour un événement
export async function updateEvent(
  eventId: number,
  updates: Partial<Event>
): Promise<pictureInterface> {
  const { data, error } = await supabase
    .from("events")
    .update(updates)
    .eq("id", eventId)
    .select()
    .returns<pictureInterface>()
    .single();

  if (error) {
    throw new Error(
      `Erreur lors de la mise à jour de l'événement : ${error.message}`
    );
  }
  return data;
}

// delete
export async function deleteEvent(eventId: number): Promise<void> {
  const { error } = await supabase.from("events").delete().eq("id", eventId);
  if (error) {
    throw new Error(
      `Erreur lors de la suppression de l'événement : ${error.message}`
    );
  }
}
