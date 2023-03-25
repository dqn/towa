import { local } from "../local.js";

type Output = ReturnType<typeof local>;

describe("local", () => {
  it("empty", () => {
    const input = [] as const;
    const output = local(input);
    expect(output).toEqual<Output>({
      success: false,
    });
  });

  it("no variable name", () => {
    const input = [..."(local i32)"];
    const output = local(input);
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
    const input = [..."(local $foo i32)"];
    const output = local(input);
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
