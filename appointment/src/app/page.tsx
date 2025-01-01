"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import TabPicker from "@/component/TabPicker";
import { formatDate, formatDateWithTimezone, generateTimeRanges } from "@/helpers";
import { Button } from "@/components/ui/button";
import MiniServiceCard from "@/component/MiniServiceCard";
import DetailsForm from "@/component/DetailsForm";
import { useToast } from "@/hooks/use-toast"
import { bookAppointment } from "@/helpers/api";




export default function Home() {
  const [selectedTab,setSelectedTab] = useState("date")
  const [date,setDate] = useState<Date | undefined>()
  const [timeslots,setTimeSlots] = useState<string[]>([])
  const [selectedTimeSlot,setSelectedTimeSlot] = useState<string|null>(null)
  const [selectedService,setSelectedService] = useState<string|null>(null)
  const { toast } = useToast()
  
  const handleValueChange = (v : string) => {
    setSelectedTab(v)
  }
  useEffect(() => {
    if (date) {
      const res = generateTimeRanges(["08:30", "10:00", "14:30"],0.5)
      setTimeSlots(res)
    }  
  },[date])
  
  useEffect(() => {
    setSelectedTab('date')
  },[])

  const submitData = async (values : {
    name: string;
    email: string;
    phone: string;
    description: string;
}) => {
    if (!selectedTimeSlot){
      toast({
        description:"Please select a valid timeslot",
        variant:"destructive"
      })
      return
    }
    if (!selectedService){
      toast({
        description:"Please select a valid service",
        variant:"destructive"
      })
      return;
    }
    if (!date){
      toast({
        description:"Please select a valid date",
        variant:"destructive"
      })
      return;
    }

    const body = {
      selectedTimeSlot,
      selectedService,
      date: date.toISOString(),
      details  : values
    }
    console.log(body)

    const r = await bookAppointment(body);
    if (r){
      toast({
        description:"Success",
        variant:"default"
      })
    }else{
      toast({
        description:"Failed",
        variant:"destructive"
      })
    }
  }

  return <>
    <section className='w-full min-h-screen grid place-content-center'>
    <Tabs value={selectedTab} onValueChange={handleValueChange} defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="date"  >Date</TabsTrigger>
        <TabsTrigger value="service">Service</TabsTrigger>
        <TabsTrigger value="details">Details</TabsTrigger>
      </TabsList>
      <TabsContent value="date">
        <Card>
          <CardHeader>
            <CardTitle>Pick a date and time</CardTitle>
            <CardDescription>
              Chose a date that suits you
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
          <div className="flex flex-col items-center my-2">
              <TabPicker date={date} updateDate={setDate} />
              </div>
              
                <div className="w-[250px] mx-auto mt-3 flex flex-wrap items-center gap-4 justify-center">
          {
            timeslots.map((e,i) => {
              return  <span onClick={() => setSelectedTimeSlot(e)} className={`rounded-[15px] border-white border-2  w-[100px] text-center p-1 my-2 hover:bg-white hover:text-black cursor-pointer ${selectedTimeSlot === e ? "text-black bg-white"  : "text-white"}`} key={e}>{e}</span>
            })
          }  
        </div>
        
          </CardContent>
          <CardFooter>
          {selectedTimeSlot && <div className="w-full flex justify-center mt-3">
          <Button className="min-w-[100px]" onClick={() => setSelectedTab('service')}>Next</Button>

        </div>}
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="service">
        <Card>
          <CardHeader>
            <CardTitle>Services</CardTitle>
            <CardDescription>
              Chose target service.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
          <MiniServiceCard 
            title="Development" 
            description="Development services including AI, blockchain, and traditional web applications (Web2)." 
            selectedService={selectedService}
            updateService={setSelectedService}
            keyword={'dev'}
          />
          <MiniServiceCard 
            title="Social Media" 
            description="Social media management, content creation, and strategy to boost your online presence." 
            selectedService={selectedService}
            updateService={setSelectedService}
            keyword="social"
          />
          <MiniServiceCard 
            title="SEO and Engagements" 
            description="Search Engine Optimization (SEO) services to increase visibility and audience engagement." 
            selectedService={selectedService}
            updateService={setSelectedService}
            keyword="seo"
          />
          <MiniServiceCard 
            title="General Consultation" 
            description="Expert advice tailored to solve your digital challenges and enhance your business operations." 
            selectedService={selectedService}
            updateService={setSelectedService}
            keyword={'general'}
          />
          </CardContent>
          <CardFooter>
          {selectedService && <div className="w-full flex justify-center mt-3">
          <Button className="min-w-[100px]" onClick={() => setSelectedTab('details')}>Next</Button>

        </div>}
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="details">
        <Card>
          <CardHeader>
            <CardTitle>Your details</CardTitle>
            <CardDescription>
              Submit your details.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <DetailsForm submitData={submitData} />
            
          </CardContent>
          
        </Card>
      </TabsContent>
    </Tabs>


    </section>
  
  </>
}
