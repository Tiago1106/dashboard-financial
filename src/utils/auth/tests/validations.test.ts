import { loginSchema, recoverySchema, signupSchema } from "../validations";

describe("loginSchema", () => {
  it("valida com sucesso dados corretos", () => {
    const result = loginSchema.safeParse({
      email: "teste@exemplo.com",
      password: "123456",
    });
    expect(result.success).toBe(true);
  });

  it("retorna erro se email estiver vazio", () => {
    const result = loginSchema.safeParse({
      email: "",
      password: "123456",
    });
    expect(result.success).toBe(false);
    expect(result.error?.format().email?._errors).toContain("Email é obrigatório");
  });

  it("retorna erro se email for inválido", () => {
    const result = loginSchema.safeParse({
      email: "email-invalido",
      password: "123456",
    });
    expect(result.success).toBe(false);
    expect(result.error?.format().email?._errors).toContain("Email inválido");
  });

  it("retorna erro se senha estiver vazia", () => {
    const result = loginSchema.safeParse({
      email: "teste@exemplo.com",
      password: "",
    });
    expect(result.success).toBe(false);
    expect(result.error?.format().password?._errors).toContain("Senha é obrigatória");
  });
});

describe("recoverySchema", () => {
  it("valida com sucesso email válido", () => {
    const result = recoverySchema.safeParse({
      email: "user@email.com",
    });
    expect(result.success).toBe(true);
  });

  it("retorna erro se email estiver vazio", () => {
    const result = recoverySchema.safeParse({
      email: "",
    });
    expect(result.success).toBe(false);
    expect(result.error?.format().email?._errors).toContain("Email é obrigatório");
  });

  it("retorna erro se email for inválido", () => {
    const result = recoverySchema.safeParse({
      email: "email-invalido",
    });
    expect(result.success).toBe(false);
    expect(result.error?.format().email?._errors).toContain("Email inválido");
  });
});

describe("signupSchema", () => {
  it("valida com sucesso dados válidos", () => {
    const result = signupSchema.safeParse({
      email: "user@exemplo.com",
      password: "123456",
      name: "Tiago",
    });
    expect(result.success).toBe(true);
  });

  it("retorna erro se nome estiver vazio", () => {
    const result = signupSchema.safeParse({
      email: "user@exemplo.com",
      password: "123456",
      name: "",
    });
    expect(result.success).toBe(false);
    expect(result.error?.format().name?._errors).toContain("Nome é obrigatório");
  });

  it("retorna erro se senha estiver vazia", () => {
    const result = signupSchema.safeParse({
      email: "user@exemplo.com",
      password: "",
      name: "Tiago",
    });
    expect(result.success).toBe(false);
    expect(result.error?.format().password?._errors).toContain("Senha é obrigatória");
  });

  it("retorna erro se email for inválido", () => {
    const result = signupSchema.safeParse({
      email: "invalido",
      password: "123456",
      name: "Tiago",
    });
    expect(result.success).toBe(false);
    expect(result.error?.format().email?._errors).toContain("Email inválido");
  });
});