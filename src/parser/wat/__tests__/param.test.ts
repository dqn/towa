import { param } from "../param.js";

type Output = ReturnType<typeof param>;

describe("param", () => {
  it("empty", () => {
    const input = [] as const;
    const output = param(input);
    expect(output).toEqual<Output>({
      success: false,
    });
  });

  it("no variable name", () => {
    const input = [..."(param i32)"];
    const output = param(input);
    expect(output).toEqual<Output>({
      success: true,
      data: {
        name: null,
        type: "i32",
      },
      rest: [],
    });
  });

  it("with variable name", () => {
    const input = [..."(param $foo i32)"];
    const output = param(input);
    expect(output).toEqual<Output>({
      success: true,
      data: {
        name: "foo",
        type: "i32",
      },
      rest: [],
    });
  });
});
