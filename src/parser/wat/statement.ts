import { or } from "../combinators/or";
import { ParserInput } from "../types/ParseInput";
import { ParserOutput } from "../types/ParserOutput";
import { I32Add, i32Add } from "./i32Add";
import { LocalGet, localGet } from "./localGet";

export type Statement = LocalGet | I32Add;

export function statement(input: ParserInput): ParserOutput<Statement> {
  return or<Statement>([localGet, i32Add])(input);
}
