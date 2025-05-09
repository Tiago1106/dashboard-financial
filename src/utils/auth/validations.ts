import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email inválido").nonempty("Email é obrigatório"),
  password: z.string().nonempty("Senha é obrigatória"),
})

export const recoverySchema = z.object({
  email: z.string().email("Email inválido").nonempty("Email é obrigatório"),
})

export const signupSchema = z.object({
  email: z.string().email("Email inválido").nonempty("Email é obrigatório"),
  password: z.string().nonempty("Senha é obrigatória"),
  name: z.string().nonempty("Nome é obrigatório"),
})


