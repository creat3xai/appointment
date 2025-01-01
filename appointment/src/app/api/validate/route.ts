import { z } from "zod";
import { DateTime } from "luxon";

const formSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    phone: z
      .string()
      .regex(
        /^\+?[1-9]\d{1,14}$/,
        "Invalid phone number. It must start with a '+' or a country code and contain 1-15 digits."
      ),
    description: z.string().max(1500),
  });


const takenSlots = [
    { date: "2025-01-14", timeSlot: "10:30-11:00" },
    { date: "2025-01-14", timeSlot: "11:00-11:30" },
    { date: "2025-01-15", timeSlot: "14:00-14:30" },
  ];

// app/api/example/route.js
export async function GET(request: Request) {
    // Handle GET requests
    return new Response(JSON.stringify({ message: "Hello from the GET API" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}

const extractDate = (d: Date): string => {
    const year = d.getFullYear();
    const month = d.getMonth() + 1; // Add 1 because months are 0-based
    const day = d.getDate(); // Correct method to get the day of the month
  
    // Pad month and day with leading zeros if necessary
    const paddedMonth = month.toString().padStart(2, "0");
    const paddedDay = day.toString().padStart(2, "0");
  
    return `${year}-${paddedMonth}-${paddedDay}`;
  };

export async function POST(request : Request) {
    try {
      // Parse the request body
      const body = (await request.json()) as AppointmentT;

      if (!body.date){
        return new Response(
            JSON.stringify({ error: "Date not selected." }),
            { status: 400, headers: { "Content-Type": "application/json" } }
          );
      }
  
  
      // Validate the `details` object using the Zod schema
      const details = formSchema.parse(body.details);
  
      // Extract date and time slot from the request body
      const selectedTimeSlot = body.selectedTimeSlot;
      
      
      const  formattedDate = extractDate(new Date(body.date))
      
      console.log("Adjusted Date:", formattedDate);
      // Check if the selected time slot is already taken
      const isSlotTaken = takenSlots.some(
        (slot) => slot.date === formattedDate && slot.timeSlot === selectedTimeSlot
      );
  
      if (isSlotTaken) {
        return new Response(
          JSON.stringify({ error: "The selected time slot is already taken." }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
  
      // Simulate saving the appointment (you'd normally save to a database here)
      const newAppointment = {
        date: formattedDate,
        timeSlot: selectedTimeSlot,
        details,
      };
  
      // Return a success response
      return new Response(JSON.stringify({ message: "Appointment booked successfully!", appointment: newAppointment }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      // Handle Zod validation errors or other issues
      if (error instanceof z.ZodError) {
        return new Response(JSON.stringify({ error: error.errors }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }
  
      return new Response(JSON.stringify({ error: "Internal server error." }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }