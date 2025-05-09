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
import { toast } from "sonner"
import { signUpWithEmail } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Spinner } from "../ui/spinner"
import { FormErrors } from "@/utils/auth/types"
import { SignUpFormValues } from "@/utils/auth/types"
import { signupSchema } from "@/utils/auth/validations"
import { ZodError } from "zod"
export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const validateSignUp = (values: SignUpFormValues) => {
    try {
      signupSchema.parse(values)
      return true
    } catch (error) {
      if (error instanceof ZodError) {
        error.errors.reduce((acc: FormErrors, err) => {
          acc[err.path[0] as keyof FormErrors] = err.message
          return acc
        }, {})
      }
      return false
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const name = formData.get("name") as string;
    const password = formData.get("password") as string;

    if (await validateSignUp({ email, password, name })) {
      try {
        const user = await signUpWithEmail(email, password, name);
        console.log("Usuário cadastrado:", user);
        toast.success("Cadastro realizado com sucesso!");
        router.push("/sign-in");
      } catch (error) {
        console.error("Erro no cadastro:", error);
        toast.error("Erro ao cadastrar. Verifique os dados.");
      } finally {
        setLoading(false);
      }
    }
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
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading && <Spinner show={loading} size="small" />}
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