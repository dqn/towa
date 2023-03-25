import { cat } from "../combinators/cat.js";
import { ParserInput } from "../types/ParseInput.js";
import { ParserOutput } from "../types/ParserOutput.js";
import { map } from "../utils/map.js";
import { str } from "../utils/str.js";
import { whitespace } from "../utils/whitespace.js";
import { int } from "./int.js";

export type I32Const = {
  type: "i32.const";
  literal: number;
};

export function i32Const(input: ParserInput): ParserOutput<I32Const> {
  return map(cat([str("i32.const"), whitespace, int]), ([type, , literal]) => ({
    type,
    literal,
  }))(input);
}
