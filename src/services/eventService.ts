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

export async function getEventById(eventId: number): Promise<Event> {
  const { data, error } = await supabase
  .from("event")
  .select("id, created_at, title, url, description, qr_code")
  .eq("id", eventId)
  .single();
  
  if (error) {
    throw new Error(`Erreur lors de la récupération de l'événement : ${error.message}`);
  }
  return data;
}


// Create Event
export async function createEvent(event: Omit<Event, "id">): Promise<Event> {
  try {
    // Ajoute l'événement pour récupérer l'ID
    const { data: createdEvent, error: insertError } = await supabase
    .from("event")
    .insert([event])
    .select()
    .single();
    
    if (insertError || !createdEvent) {
      throw new Error(`Erreur lors de la création de l'événement : ${insertError?.message}`);
    }
    
    
    // Générez l'URL du QR Code vers la page de détails
    const baseUrl = process.env.REACT_APP_BASE_URL|| 'https://family-snap-al-ed-mp-gg.netlify.app' ;
    const eventDetailUrl = `${baseUrl}/details/${createdEvent.id}`;
    const qrCodeUrl = await QRCode.toDataURL(eventDetailUrl);
    
    // Met à jour l'événement avec l'URL des détails de l'événement pour le QR Code
    const { data: updatedEvent, error: updateError } = await supabase
    .from("event")
    .update({ qr_code: qrCodeUrl })
    .eq("id", createdEvent.id)
    .select()
    .single();
    
    
    if (updateError || !updatedEvent) {
      throw new Error(`Erreur lors de la mise à jour du QR Code : ${updateError?.message}`);
    }
    
    return updatedEvent;
  } catch (error) {
    throw new Error(`Erreur lors de la création de l'événement : ${error}`);
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
