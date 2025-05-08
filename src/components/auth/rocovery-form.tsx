"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
export function RecoveryForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const formData = new FormData(event.currentTarget);

    const email = formData.get("email") as string;

    console.log("Email: ", email);
  };
  
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Recuperar senha</CardTitle>
          <CardDescription>
            Digite seu email para receber um link de recuperação
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="exemplo@email.com"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Enviar link
                </Button>
              </div>
              <div className="text-center text-sm">
                Lembrou sua senha?{" "}
                <Link href="/sign-in" className="underline underline-offset-4">
                  Faça login
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}