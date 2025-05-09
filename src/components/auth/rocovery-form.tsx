"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ZodError } from "zod"

import { cn } from "@/lib/utils"
import { recoverPassword } from "@/lib/auth"

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
import { Spinner } from "@/components/ui/spinner"
import { toast } from "sonner"

import { recoverySchema } from "@/utils/auth/validations"
import { FormErrors } from "@/utils/auth/types"

export function RecoveryForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)

  const validateRecovery = (value: { email: string }) => {
    console.log("validateRecovery")
    try {
      recoverySchema.parse(value)
      return true
    } catch (error) {
      if (error instanceof ZodError) {
        error.errors.reduce((acc: FormErrors, err) => {
          acc[err.path[0] as keyof FormErrors] = err.message
          return acc
        }, {})
      }
      console.log("error", error)
      return false
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("handleSubmit")

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;

    console.log("email", email)

    if (await validateRecovery({ email })) {
      setLoading(true);
      console.log("validateRecovery")
      try {
        await recoverPassword(email);
        toast.success("Email de recuperação enviado!")
        router.push("/sign-in")
      } catch (error) {
        console.error('Erro ao fazer login:', error);
        toast.error("Erro ao fazer login. Verifique suas credenciais.")
      } finally {
        setLoading(false);
      }
    }
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
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading && <Spinner size="small" show={loading} />}
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