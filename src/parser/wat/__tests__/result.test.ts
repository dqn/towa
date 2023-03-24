import { result } from "../result";

type Output = ReturnType<typeof result>;

describe("result", () => {
  it("empty", () => {
    const input = [] as const;
    const output = result(input);
    expect(output).toEqual<Output>({
      success: false,
    });
  });

  it("ok", () => {
    const input = [..."(result i32)"];
    const output = result(input);
    expect(output).toEqual<Output>({
      success: true,
      data: {
        type: "i32",
      },
      rest: [],
    });
  });
});
