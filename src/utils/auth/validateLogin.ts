import { ZodError } from "zod"
import { loginSchema } from "./validations"
import { FormErrors, LoginFormValues } from "./types"

export const validateLogin = (values: LoginFormValues): true | FormErrors => {
  try {
    loginSchema.parse(values)
    return true
  } catch (error) {
    if (error instanceof ZodError) {
      return error.errors.reduce((acc: FormErrors, err) => {
        acc[err.path[0] as keyof FormErrors] = err.message
        return acc
      }, {})
    }
    throw error
  }
}