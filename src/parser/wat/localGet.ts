import { cat } from "../combinators/cat";
import { ParserInput } from "../types/ParseInput";
import { ParserOutput } from "../types/ParserOutput";
import { map } from "../utils/map";
import { str } from "../utils/str";
import { whitespace } from "../utils/whitespace";
import { variable } from "./variable";

export type LocalGet = {
  type: "local.get";
  variable: string;
};

export function localGet(input: ParserInput): ParserOutput<LocalGet> {
  return map(
    cat([str("local.get"), whitespace, variable]),
    ([type, , variable]) => ({
      type,
      variable,
    }),
  )(input);
}
