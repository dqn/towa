import { ParserInput } from "../types/ParseInput.js";
import { ParserOutput } from "../types/ParserOutput.js";
import { Module, module } from "./module.js";

export function parse(input: ParserInput): ParserOutput<Module> {
  return module(input);
}
