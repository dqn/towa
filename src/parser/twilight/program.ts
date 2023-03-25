import { cat } from "../combinators/cat.js";
import { rep } from "../combinators/rep.js";
import { ParserInput } from "../types/ParseInput.js";
import { ParserOutput } from "../types/ParserOutput.js";
import { map } from "../utils/map.js";
import { whitespace } from "../utils/whitespace.js";
import { Func, func } from "./func.js";

export type Program = {
  funcs: Func[];
};

export function program(input: ParserInput): ParserOutput<Program> {
  return map(
    cat([whitespace, rep(cat([func, whitespace])), whitespace]),
    ([, funcWithWses]): Program => ({
      funcs: funcWithWses.map(([x]) => x),
    }),
  )(input);
}
