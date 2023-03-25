import { rep } from "../combinators/rep.js";
import { ParserInput } from "../types/ParseInput.js";
import { ParserOutput } from "../types/ParserOutput.js";
import { digit } from "../utils/digit.js";
import { map } from "../utils/map.js";

export function int(input: ParserInput): ParserOutput<number> {
  return map(rep(digit, 1), (splitted) => Number(splitted.join("")))(input);
}
