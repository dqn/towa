import { anyChar } from "../anyChar";

type Output = ReturnType<typeof anyChar>;

describe("anyChar", () => {
  it("empty", () => {
    const input: string[] = [];
    const output = anyChar(input);
    expect(output).toStrictEqual<Output>({
      success: false,
    });
  });

  it("1 char", () => {
    const input = [..."a"];
    const output = anyChar(input);
    expect(output).toStrictEqual<Output>({
      success: true,
      data: "a",
      rest: [],
    });
  });

  it("multiple chars", () => {
    const input = [..."foo"];
    const output = anyChar(input);
    expect(output).toStrictEqual<Output>({
      success: true,
      data: "f",
      rest: ["o", "o"],
    });
  });
});
