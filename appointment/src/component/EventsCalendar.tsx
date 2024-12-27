import {
    Calendar,
    CalendarProps,
    DayReservationProps,
  } from "@demark-pro/react-booking-calendar";
  
  import clsx, { ClassValue } from "clsx";
  import { isSameDay } from "date-fns";
  import { twMerge } from "tailwind-merge";
  
  import "@demark-pro/react-booking-calendar/dist/react-booking-calendar.css";
  
  type EventsCalendarProps = Omit<
    CalendarProps,
    "components" | "options" | "range" | "protection"
  >;
  
  export const cn = (...inputs: ClassValue[]) => twMerge(clsx(...inputs));
  
  const DayReservation = ({
    innerProps,
    state,
    date,
    reserved,
  }: DayReservationProps) => {
    const { isReservedStart, isReservedEnd } = state;
  
    if (!isReservedStart && !isReservedEnd) return null;
  
    const dayEvents = reserved
      .filter((r) => isSameDay(date, r.startDate) || isSameDay(date, r.endDate))
      .slice(0, 3);
  
    return (
      <div
        className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-row gap-[0.2rem] z-40"
        {...innerProps}
      >
        {dayEvents.map((event, key) => (
          <span
            key={`day_event_${key}`}
            className={cn(
              "block w-[0.4rem] h-[0.4rem] rounded-full bg-orange-600 border-[0.5px]",
            )}
            style={{ backgroundColor: event.color }}
          />
        ))}
      </div>
    );
  };
  
  export const EventsCalendar = ({ ...props }: EventsCalendarProps) => {
    return (
      <Calendar
        options={{ weekStartsOn: 1, useAttributes: true }}
        components={{
          DayReservation: DayReservation, // replace component
        }}
        classNames={{
          // reset styling text
          DayContent:
            "data-[reserved]:text-black data-[past]:text-black data-[selected]:text-white",
          DaySelection: "rounded-full",
        }}
        range={false}
        protection={false} // disable overbooking protection
        {...props}
      />
    );
  };
  