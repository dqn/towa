import { cat } from "../combinators/cat.js";
import { or } from "../combinators/or.js";
import { ParserInput } from "../types/ParseInput.js";
import { ParserOutput } from "../types/ParserOutput.js";
import { map } from "../utils/map.js";
import { str } from "../utils/str.js";
import { whitespace } from "../utils/whitespace.js";
import { int } from "./int.js";
import { variable } from "./variable.js";

export type LocalGet = {
  type: "local.get";
} & (
  | {
      ref: "variable";
      variable: string;
    }
  | {
      ref: "index";
      index: number;
    }
);

export function localGet(input: ParserInput): ParserOutput<LocalGet> {
  return map(
    cat([str("local.get"), whitespace, or<string | number>([variable, int])]),
    ([type, , ref]) => {
      if (typeof ref === "string") {
        return {
          type,
          ref: "variable" as const,
          variable: ref,
        };
      } else {
        return {
          type,
          ref: "index" as const,
          index: ref,
        };
      }
    },
  )(input);
}
