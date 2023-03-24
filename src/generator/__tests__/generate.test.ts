import { generate } from "../generate";

describe("func", () => {
  it("ok", () => {
    const actual = generate({
      func: {
        name: "add",
        params: [
          {
            name: "lhs",
            type: "i32",
          },
          {
            name: "rhs",
            type: "i32",
          },
        ],
        result: {
          type: "i32",
        },
        statements: [
          {
            type: "local.get",
            variable: "lhs",
          },
          {
            type: "local.get",
            variable: "rhs",
          },
          {
            type: "i32.add",
          },
        ],
      },
      export: {
        name: "add",
        target: "add",
      },
    });
    const buf = Buffer.from([
      0x00, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00, 0x01, 0x07, 0x01, 0x60,
      0x02, 0x7f, 0x7f, 0x01, 0x7f, 0x03, 0x02, 0x01, 0x00, 0x07, 0x07, 0x01,
      0x03, 0x61, 0x64, 0x64, 0x00, 0x00, 0x0a, 0x09, 0x01, 0x07, 0x00, 0x20,
      0x00, 0x20, 0x01, 0x6a, 0x0b,
    ]);
    expect(actual).toEqual(buf);
  });
});
