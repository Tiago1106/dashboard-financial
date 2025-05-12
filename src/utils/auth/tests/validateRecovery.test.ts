import { validateRecovery } from "../validateRecovery"

describe("validateRecovery", () => {
  it("deve retornar true para um email válido", () => {
    const result = validateRecovery({ email: "teste@email.com" })
    expect(result).toBe(true)
  })

  it("deve retornar erro se o email estiver vazio", () => {
    const result = validateRecovery({ email: "" })
    expect(result).toEqual({ email: "Email é obrigatório" })
  })

  it("deve retornar erro se o email for inválido", () => {
    const result = validateRecovery({ email: "email-invalido" })
    expect(result).toEqual({ email: "Email inválido" })
  })
})