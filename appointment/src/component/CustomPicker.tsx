"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar"

type Props = {}

function CustomPicker({}: Props) {
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [currentStep,setCurrentStep] = useState(0)
    const  titles =  ["Chose a date"];
    const [timeslots,setTimeSlots] = useState<string[]>([])
  
    useEffect(() => {
      const res = generateTimeRanges(["08:30", "10:00", "14:30"],0.5)
      setTimeSlots(res)
    },[date])
  
    return (<>
    <section className="min-h-screen bg-black w-full">
    <div className="flex flex-col container my-5 mx-auto">
      <h1 className="text-white font-semibold text-3xl text-center uppercase mb-3">{titles[currentStep]}</h1>
    <div className="w-[300px] mx-auto">
        <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border"
      disabled={{ dayOfWeek: [0, 6] }}
    />
      </div>
      <div  className="w-full p-4">
        selected date {String(date)}
      </div>
      <div className="w-[250px] mx-auto mt-3 flex flex-wrap items-center gap-4">
        {
          timeslots.map((e,i) => {
            return  <span className="rounded-[15px] border-white border-2 text-white w-[100px] text-center p-1 my-2" key={e}>{e}</span>
          })
        }
      </div>
    </div>
  
    </section>  
    </>   
    );
}

export default CustomPicker