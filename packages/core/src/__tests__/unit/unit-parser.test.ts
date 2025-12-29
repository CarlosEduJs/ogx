import { describe, expect, it } from "vitest";
import { parseTailwind } from "../../tailwind/parser";

describe("Tailwind Parser", () => {
  it("deve converter classes básicas (padding, colors)", () => {
    const style = parseTailwind(["p-4", "bg-red-500", "text-white"]);
    expect(style.padding).toBe(16);
    expect(style.backgroundColor).toBe("#ef4444");
    expect(style.color).toBe("#ffffff");
  });

  it("deve suportar opacidade em cores (slash syntax)", () => {
    const style = parseTailwind("bg-blue-500/50");
    expect(style.backgroundColor).toBe("rgba(59, 130, 246, 0.5)");
  });

  it("deve suportar valores arbitrários", () => {
    const style = parseTailwind("bg-[#123456]");
    expect(style.backgroundColor).toBe("#123456");
  });

  it("deve suportar padrões de fundo (Patterns)", () => {
    const style = parseTailwind("bg-grid-zinc-800");
    expect(style.backgroundImage).toContain("linear-gradient");
    expect(style.backgroundSize).toBe("24px 24px");
  });

  it("deve extrair tamanho customizado de padrões (ex: bg-dots-10)", () => {
    const style = parseTailwind("bg-dots-slate-500-10");
    expect(style.backgroundSize).toBe("10px 10px");
  });

  it("deve lidar com oklch/hsl no theme config (via cores semânticas)", () => {
    const style = parseTailwind("bg-primary");
    expect(style.backgroundColor).toBeDefined();
  });

  it("deve retornar display: flex por padrão incluso para classes unmapped", () => {
    const style = parseTailwind("hover:scale-105 animate-spin");
    expect(style).toEqual({ display: "flex" });
  });

  it("deve aceitar arrays de classes ou strings simples", () => {
    const s1 = parseTailwind("p-2 m-2");
    const s2 = parseTailwind(["p-2", "m-2"]);
    expect(s1).toEqual(s2);
  });
});
