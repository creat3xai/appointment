import React, { Dispatch, SetStateAction } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatDate } from '@/helpers'




type Props = {
    date:Date | undefined;
    updateDate:Dispatch<SetStateAction<Date | undefined>>
}

function TabPicker({date,updateDate}: Props) {


  return <>
    <Popover>
                <PopoverTrigger asChild>
                  
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal my-2 mx-auto",
                        !date && "text-muted-foreground"
                      )}
                    >
                      {date ? <span>{formatDate(date)}</span> : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={updateDate}
                    disabled={(date) => {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0); // Normalize to midnight for accurate comparison
                        const isBeforeToday = date < today;
                        const isWeekend = date.getDay() === 0 || date.getDay() === 6; // 0 for Sunday, 6 for Saturday
                        return isBeforeToday || isWeekend;
                      }
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
    
  
  </>
}

export default TabPicker