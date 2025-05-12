"use client"

import { useState } from "react"
import { useRouter } from "next/navigation";
import Link from "next/link"

import { cn } from "@/lib/utils"
import { setToken, signInWithFirebase, signInWithGoogle } from "@/lib/auth"

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

import { useUserStore } from "@/store/useUserStore"
import { validateLogin } from "@/utils/auth/validateLogin";

export function SignInForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const { setUser } = useUserStore();

  const [loading, setLoading] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);

  const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (await validateLogin({ email, password })) {
      setLoading(true);
      try {
        const user = await signInWithFirebase(email, password);
        const token = await user.getIdToken();
        setUser(user);
        await setToken(token);
        router.push("/");
      } catch (error) {
        console.error('Erro ao fazer login:', error);
        toast.error("Erro ao fazer login. Verifique suas credenciais.")
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSignInWithGoogle = async () => {
    setLoadingGoogle(true);
    try {
      const user = await signInWithGoogle();
      const token = await user.getIdToken();
      setUser(user);
      await setToken(token);
      router.push("/");
    } catch (error) {
      console.error("Erro ao logar com Google:", error);
      toast.error("Erro ao logar com Google. Tente novamente.")
    } finally {
      setLoadingGoogle(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Bem vindo</CardTitle>
          <CardDescription>
            Faça login com sua conta do Google
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <Button variant="outline" className="w-full" onClick={handleSignInWithGoogle} disabled={loadingGoogle}>
              {loadingGoogle ? <Spinner size="md" show={loadingGoogle}/> : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
                </svg>
              )}
              Login com Google
            </Button>
          </div>
          <form onSubmit={handleLoginSubmit}>
            <div className="grid gap-4">
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 px-2 bg-card text-muted-foreground">
                  Ou continue com
                </span>
              </div>
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
                  <div className="flex items-center">
                    <Label htmlFor="password">Senha</Label>
                    <Link
                      href="/recovery-password"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Esqueceu sua senha?
                    </Link>
                  </div>
                  <Input id="password" type="password" name="password" required />
                </div>
                <Button type="submit" className="w-full" disabled={loading} >
                  <Spinner size="md" show={loading} />
                  Entrar
                </Button>
              </div>
              <div className="text-center text-sm">
                Não tem uma conta?{" "}
                <Link href="/sign-up" className="underline underline-offset-4">
                  Crie uma conta
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        Ao Logar, você concorda com nossos{" "}
        Termos de Serviço e Política de Privacidade.
      </div>
    </div>
  )
}