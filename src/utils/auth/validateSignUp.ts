import { ZodError } from "zod"
import { signupSchema } from "./validations"
import { FormErrors, SignUpFormValues } from "./types"

export const validateSignUp = (
  values: SignUpFormValues
): true | FormErrors => {
  try {
    signupSchema.parse(values)
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