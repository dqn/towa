import { localGet } from "../localGet.js";

type Output = ReturnType<typeof localGet>;

describe("localGet", () => {
  it("empty", () => {
    const input = [] as const;
    const output = localGet(input);
    expect(output).toEqual<Output>({
      success: false,
    });
  });

  it("with index", () => {
    const input = [..."local.get 42"];
    const output = localGet(input);
    expect(output).toEqual<Output>({
      success: true,
      data: {
        type: "local.get",
        ref: "index",
        index: 42,
      },
      rest: [],
    });
  });

  it("with variable name", () => {
    const input = [..."local.get $foo"];
    const output = localGet(input);
    expect(output).toEqual<Output>({
      success: true,
      data: {
        type: "local.get",
        ref: "variable",
        variable: "foo",
      },
      rest: [],
    });
  });
});
