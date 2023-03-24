import { char } from "../../primitives/char.js";
import { cat } from "../cat.js";

describe("cat", () => {
  describe("cat([])", () => {
    const parser = cat([]);
    type Output = ReturnType<typeof parser>;

    it("empty", () => {
      const input: string[] = [];
      const output = parser(input);
      expect(output).toStrictEqual<Output>({
        success: true,
        data: [],
        rest: [],
      });
    });

    it("'a'", () => {
      const input = [..."a"];
      const output = parser(input);
      expect(output).toStrictEqual<Output>({
        success: true,
        data: [],
        rest: [..."a"],
      });
    });
  });

  describe('cat([char("a"), char("b")])', () => {
    const parser = cat([char("a"), char("b")]);
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

    it("'abc'", () => {
      const input = [..."abc"];
      const output = parser(input);
      expect(output).toStrictEqual<Output>({
        success: true,
        data: ["a", "b"],
        rest: [..."c"],
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
