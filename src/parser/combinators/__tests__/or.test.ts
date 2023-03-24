import { char } from "../../primitives/char.js";
import { or } from "../or.js";

describe("or", () => {
  describe("or([])", () => {
    const parser = or([]);
    type Output = ReturnType<typeof parser>;

    it("empty", () => {
      const input: string[] = [];
      const output = parser(input);
      expect(output).toStrictEqual<Output>({
        success: false,
      });
    });

    it("'a'", () => {
      const input = [..."a"];
      const output = parser(input);
      expect(output).toStrictEqual<Output>({
        success: false,
      });
    });
  });

  describe('or([char("a"), char("b")])', () => {
    const parser = or([char("a"), char("b")]);
    type Output = ReturnType<typeof parser>;

    it("empty", () => {
      const input: string[] = [];
      const output = parser(input);
      expect(output).toStrictEqual<Output>({
        success: false,
      });
    });

    it("'a'", () => {
      const input = [..."a"];
      const output = parser(input);
      expect(output).toStrictEqual<Output>({
        success: true,
        data: "a",
        rest: [],
      });
    });

    it("'b'", () => {
      const input = [..."b"];
      const output = parser(input);
      expect(output).toStrictEqual<Output>({
        success: true,
        data: "b",
        rest: [],
      });
    });

    it("'A'", () => {
      const input = [..."A"];
      const output = parser(input);
      expect(output).toStrictEqual<Output>({
        success: false,
      });
    });
  });
});
