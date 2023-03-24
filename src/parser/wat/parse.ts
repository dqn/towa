import { ParserInput } from "../types/ParseInput";
import { ParserOutput } from "../types/ParserOutput";
import { Module, module } from "./module";

export function parse(input: ParserInput): ParserOutput<Module> {
  return module(input);
}