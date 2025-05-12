import { ZodError } from "zod"
import { recoverySchema } from "./validations"
import { FormErrors } from "./types"

export function validateRecovery(value: { email: string }): boolean | FormErrors {
  try {
    recoverySchema.parse(value)
    return true
  } catch (error) {
    if (error instanceof ZodError) {
      return error.errors.reduce((acc: FormErrors, err) => {
        acc[err.path[0] as keyof FormErrors] = err.message
        return acc
      }, {})
    }
    return false
  }
}