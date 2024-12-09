"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import XteriumLogo from "data-base64:/assets/app-logo/xterium-logo.png"
import Header from "@/components/Header"
import { LoginService } from "@/services/login.service"

interface Props {
  onSetCurrentPage: (page: string) => void
}

export default function IndexLogin({ onSetCurrentPage }: Props) {
  const form = useForm({
    defaultValues: {
      password: "",
    },
  })

  const [decryptionError, setDecryptionError] = useState<string>("")

  const onSubmit = (data: { password: string }) => {
    const encryptedPassword = localStorage.getItem("userPassword");  
    const loginService = new LoginService();

    try {
        if (loginService.login(encryptedPassword, data.password)) {
            onSetCurrentPage("application");
        }
    } catch (error) {
        setDecryptionError(error.message || "Error logging in.");
    }
}



  return (
    <div className="flex flex-col justify-between min-h-screentext-white">
        <Header
          variant="login"
        />

      <div
        className="flex justify-center pt-14"
        style={{
          background: "linear-gradient(180deg, #2E266D 0%, #121B26 100%)",
        }}
      >
        <img src={XteriumLogo} className="w-229" alt="Xterium Logo" />
      </div>
      <div className="flex justify-center font-bold text-xl py-6">
        <h1>Welcome!</h1>
      </div>

      <div
        className="h-3 mt-7"
        style={{
          background: "linear-gradient(90deg, #7292DD 0%, #50B8FF 100%)",
        }}
      />

      <div className="flex justify-center items-center w-full h-full">
        <div className="w-full max-w-full sm:max-w-md lg:max-w-lg">
          <div
            className="p-6 w-full"
            style={{
              background: "linear-gradient(180deg, #32436A 0%, #121826 100%)",
            }}
          >
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-4"
              >
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className="font-inter font-extrabold text-[12px] leading-[15px] tracking-[0.15em] text-[#9AB3EB]"
                      >
                        Enter Password:
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  variant="violet"
                  className="w-full"
                >
                  UNLOCK
                </Button>
              </form>
            </Form> 
          </div>
        </div>
      </div>

    </div>
  )
}
