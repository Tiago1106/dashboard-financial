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
export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const formData = new FormData(event.currentTarget);

    const email = formData.get("email") as string;
    const name = formData.get("name") as string;
    const password = formData.get("password") as string;

    console.log("Email: ", email);
    console.log("Name: ", name);
    console.log("Password: ", password);
  };
  
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Bem vindo</CardTitle>
          <CardDescription>
            Crie uma conta para continuar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="exemplo@email.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="name">Nome	</Label>
                  <Input
                    id="name"
                    type="text"
                    name="name"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input id="password" type="password" name="password" required />
                </div>
                <Button type="submit" className="w-full">
                  Criar conta
                </Button>
              </div>
              <div className="text-center text-sm">
                Já tem uma conta?{" "}
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