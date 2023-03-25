import { cat } from "../combinators/cat.js";
import { ParserInput } from "../types/ParseInput.js";
import { ParserOutput } from "../types/ParserOutput.js";
import { map } from "../utils/map.js";
import { whitespace } from "../utils/whitespace.js";
import { Module, module } from "./module.js";

export function parse(input: ParserInput): ParserOutput<Module> {
  return map(cat([whitespace, module, whitespace]), ([, m]) => m)(input);
}
