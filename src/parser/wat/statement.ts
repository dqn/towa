import { or } from "../combinators/or.js";
import { ParserInput } from "../types/ParseInput.js";
import { ParserOutput } from "../types/ParserOutput.js";
import { I32Add, i32Add } from "./i32Add.js";
import { I32Const, i32Const } from "./i32Const.js";
import { I32Sub, i32Sub } from "./i32Sub.js";
import { LocalGet, localGet } from "./localGet.js";

export type Statement = LocalGet | I32Const | I32Add | I32Sub;

export function statement(input: ParserInput): ParserOutput<Statement> {
  return or<Statement>([localGet, i32Const, i32Add, i32Sub])(input);
}
