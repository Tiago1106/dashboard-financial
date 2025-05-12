import { validateLogin } from "../validateLogin"

describe("validateLogin", () => {
  it("retorna true para dados válidos", () => {
    const result = validateLogin({
      email: "usuario@email.com",
      password: "123456",
    })
    expect(result).toBe(true)
  })

  it("retorna erro se o email estiver vazio", () => {
    const result = validateLogin({
      email: "",
      password: "123456",
    })
    expect(result).toEqual({
      email: "Email é obrigatório",
    })
  })

  it("retorna erro se o email for inválido", () => {
    const result = validateLogin({
      email: "email-invalido",
      password: "123456",
    })
    expect(result).toEqual({
      email: "Email inválido",
    })
  })

  it("retorna erro se a senha estiver vazia", () => {
    const result = validateLogin({
      email: "teste@email.com",
      password: "",
    })
    expect(result).toEqual({
      password: "Senha é obrigatória",
    })
  })

  it("retorna múltiplos erros se ambos os campos forem inválidos", () => {
    const result = validateLogin({
      email: "",
      password: "",
    })
    expect(result).toEqual({
      email: "Email é obrigatório",
      password: "Senha é obrigatória",
    })
  })
})