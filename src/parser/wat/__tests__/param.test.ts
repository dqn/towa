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

  it("ok", () => {
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
