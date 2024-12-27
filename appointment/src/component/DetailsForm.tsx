"use client"
import React from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type Props = {
    submitData : (values: {
        name: string;
        email: string;
        phone: string;
        description: string;
    }) => Promise<void>
}

const formSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    phone:z
    .string()
    .regex(
      /^\+?[1-9]\d{1,14}$/,
      "Invalid phone number. It must start with a '+' or a country code and contain 1-15 digits."
    ),
    description : z.string().max(1500)
  })



function DetailsForm({submitData}: Props) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
          email: "",
          phone:"",
          description: "",
        },
      })


    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
        submitData(values)
      }
  return <>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="name" {...field} />
              </FormControl>
              <FormDescription>
                Your name here
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email@gmail.com" type='email' {...field} />
              </FormControl>
              <FormDescription>
                Your email here
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="+212677777777" {...field} />
              </FormControl>
              <FormDescription>
                Your phone number here
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="description" {...field} />
              </FormControl>
              <FormDescription>
                Brief description of your needs
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='w-full flex justify-center'>
        <Button type="submit" style={{margin:15}}>Submit</Button>
        </div>
        
      </form>
    </Form>
  
  </>
}

export default DetailsForm