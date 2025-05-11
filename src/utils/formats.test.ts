import { formatAmount, formatAmountToNumber, formatDate } from "./formats";

describe("formatAmount", () => {
  it("formata corretamente um valor decimal como string", () => {
    expect(formatAmount("1234.5")).toBe("1.234,50");
    expect(formatAmount("0")).toBe("0,00");
    expect(formatAmount("1000000")).toBe("1.000.000,00");
  });
});

describe("formatAmountToNumber", () => {
  it("transforma valor em centavos para número decimal", () => {
    expect(formatAmountToNumber("100")).toBe(1);
    expect(formatAmountToNumber("2500")).toBe(25);
    expect(formatAmountToNumber("0")).toBe(0);
  });
});

describe("formatDate", () => {
  it("deve formatar corretamente o timestamp 1682698259192 como 23/04/2023", () => {
    const timestamp = 1682698259192;
    const formatted = formatDate(timestamp);
    expect(formatted).toBe("28/04/2023");
  });

  it("deve adicionar zero à esquerda para dias e meses menores que 10", () => {
    const date = new Date("2023-01-09T00:00:00Z");
    const timestamp = date.getTime();
    expect(formatDate(timestamp)).toBe("09/01/2023");
  });

  it("deve formatar corretamente o último dia do ano", () => {
    const date = new Date("2023-12-31T00:00:00Z");
    const timestamp = date.getTime();
    expect(formatDate(timestamp)).toBe("31/12/2023");
  });

  it("deve formatar corretamente o primeiro dia do ano", () => {
    const date = new Date("2023-01-01T00:00:00Z");
    const timestamp = date.getTime();
    expect(formatDate(timestamp)).toBe("01/01/2023");
  });
});