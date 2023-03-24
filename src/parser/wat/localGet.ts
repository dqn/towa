import { cat } from "../combinators/cat.js";
import { ParserInput } from "../types/ParseInput.js";
import { ParserOutput } from "../types/ParserOutput.js";
import { map } from "../utils/map.js";
import { str } from "../utils/str.js";
import { whitespace } from "../utils/whitespace.js";
import { variable } from "./variable.js";

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
