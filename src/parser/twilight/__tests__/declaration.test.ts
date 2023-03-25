import { declaration } from "../declaration.js";

type Output = ReturnType<typeof declaration>;

describe("declaration", () => {
  it("empty", () => {
    const input = [] as const;
    const output = declaration(input);
    expect(output).toEqual<Output>({
      success: false,
    });
  });

  it("ok", () => {
    const input = [..."const foo: i32 = 42;"] as const;
    const output = declaration(input);
    expect(output).toEqual<Output>({
      success: true,
      data: {
        kind: "declaration",
        name: "foo",
        type: "i32",
        value: 42,
      },
      rest: [],
    });
  });
});
