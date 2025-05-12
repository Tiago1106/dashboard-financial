import { validateSignUp } from "../validateSignUp"
import { SignUpFormValues } from "../types"

describe("validateSignUp", () => {
  it("retorna true quando os dados são válidos", () => {
    const validData: SignUpFormValues = {
      name: "Tiago",
      email: "tiago@email.com",
      password: "senhaSegura123",
    }

    const result = validateSignUp(validData)
    expect(result).toBe(true)
  })

  it("retorna erro para campos vazios", () => {
    const invalidData: SignUpFormValues = {
      name: "",
      email: "",
      password: "",
    }

    const result = validateSignUp(invalidData)

    expect(result).toEqual({
      name: "Nome é obrigatório",
      email: "Email é obrigatório",
      password: "Senha é obrigatória",
    })
  })

  it("retorna erro para email inválido", () => {
    const invalidEmailData: SignUpFormValues = {
      name: "Tiago",
      email: "tiagoemail.com", // sem @
      password: "123456",
    }

    const result = validateSignUp(invalidEmailData)

    expect(result).toEqual({
      email: "Email inválido",
    })
  })
})
