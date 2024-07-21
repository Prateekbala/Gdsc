'use client';
import React from 'react'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { verifySchema } from '../../../schemas/verifySchema'


import { Button } from "../../../components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form"
import { Input } from "../../../components/ui/input"
import axios, { AxiosError } from 'axios';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useToast } from '../../../components/ui/use-toast';
import { Console, error } from 'console';
export default function verify() {

  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  console.log("came to Verify page")

  const form = useForm<z.infer<typeof verifySchema >>({
        resolver: zodResolver(verifySchema ),
        defaultValues: {
          code: ""
        },
      })
      
   const onSubmit = async (data: z.infer<typeof verifySchema>) => {
      try {

      const decodedEmail = searchParams.get("email");
      console.log(decodedEmail)
      const response = await axios.post('/api/verify-code', {
        code: data.code,
        email:decodedEmail
      });
      console.log(response)
      
      if (response.data.success) {

        console.log("Success in verify ")
        router.replace('/sign-in');

      } else 
      {
        
        console.log("Not Success in verify ")
      }

    }
     catch(err){

          console.log("Error in verify @@@: ",err)
   }
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Verify Your Account
          </h1>
          <p className="mb-4">Enter the verification code sent to your email</p>
        </div>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Verifiaction Code</FormLabel>
              <FormControl>
                <Input placeholder="Code" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>

        </div>
        </div>
        
  )
}