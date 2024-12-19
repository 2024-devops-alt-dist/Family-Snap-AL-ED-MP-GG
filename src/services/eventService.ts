import { Event } from "../entity/eventInterface";
import { supabase } from "../supabaseConfig";
import QRCode from 'qrcode';


// Get Event
export async function getEvents(): Promise<Event[]> {
  const { data, error } = await supabase
    .from("event")
    .select("id, created_at, title, url, description, qr_code")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(
      `Erreur lors de la récupération des événements : ${error.message}`
    );
  }
  return data || [];
}

// Create Event
export async function createEvent(event: Omit<Event, "id">): Promise<Event> {
  try {
    // Générer l'URL du QR Code
    const qrCodeUrl = await QRCode.toDataURL(JSON.stringify(event));

    // Ajouter l'événement avec le QR Code
    const { data, error } = await supabase
      .from("event")
      .insert([{ ...event, qr_code: qrCodeUrl }])
      .select()
      .single();

    if (error) {
      throw new Error(`Erreur lors de la création de l'événement : ${error.message}`);
    }
    return data;
  } catch (error) {
    throw new Error(`Erreur lors de la génération du QR Code : ${error}`);
  }
}

// Update Event
export async function updateEvent(eventId: number, updates: Partial<Event>): Promise<Event> {
  const { data, error } = await supabase
    .from("event")
    .update(updates)
    .eq("id", eventId)
    .select("id, created_at, title, url, description, qr_code")
    .single();

  if (error) {
    throw new Error(
      `Erreur lors de la mise à jour de l'événement : ${error.message}`
    );
  }
  return data;
}

// Delete Event
export async function deleteEvent(eventId: number): Promise<void> {
  const { error } = await supabase.from("event").delete().eq("id", eventId);
  if (error) {
    throw new Error(`Erreur lors de la suppression de l'événement : ${error.message}`);
  }
}
