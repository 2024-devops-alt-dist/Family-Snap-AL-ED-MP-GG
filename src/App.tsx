import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { eventInterface } from "./entity/eventInterface";

const supabase = createClient("https://lxoqbcliypgqgroazwzh.supabase.co/", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4b3FiY2xpeXBncWdyb2F6d3poIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ1MzM5MTIsImV4cCI6MjA1MDEwOTkxMn0.AIWIe7LwC4RMJgQTbtU6MP7p6jG0HLVxO017JfXlExI");

function App() {
  const [events, setEvents] = useState<eventInterface[]>([]);

  useEffect(() => {
    getEvents();
  }, []);

  async function getEvents(): Promise<void> {
    const { data, error } = await supabase.from("events").select("*");
    if (error) {
      console.error("Error fetching events:", error);
    } else {
      setEvents(data as eventInterface[] || []);
    }
  }

  return (
    <ul>
      {events.map((event:eventInterface) => (
        <h1>{ event.title }</h1>
      ))}
    </ul>
  );
}

export default App;
