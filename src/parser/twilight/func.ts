import { cat } from "../combinators/cat.js";
import { or } from "../combinators/or.js";
import { rep } from "../combinators/rep.js";
import { char } from "../primitives/char.js";
import { ParserInput } from "../types/ParseInput.js";
import { ParserOutput } from "../types/ParserOutput.js";
import { map } from "../utils/map.js";
import { opt } from "../utils/opt.js";
import { str } from "../utils/str.js";
import { whitespace } from "../utils/whitespace.js";
import { Declaration, declaration } from "./declaration.js";
import { identifier } from "./identifier.js";
import { Return, _return } from "./return.js";
import { ValueType, valueType } from "./valueType.js";

export type Param = {
  name: string;
  type: ValueType;
};

export type Statement = Declaration | Return;

export type Func = {
  export: boolean;
  name: string;
  params: Param[];
  returnType: ValueType;
  statements: Statement[];
};

export function func(input: ParserInput): ParserOutput<Func> {
  return map(
    cat([
      opt(str("export")),
      whitespace,
      str("function"),
      whitespace,
      identifier,
      whitespace,
      char("("),
      whitespace,
      opt(
        cat([
          identifier,
          whitespace,
          char(":"),
          whitespace,
          valueType,
          rep(
            cat([
              whitespace,
              char(","),
              whitespace,
              identifier,
              whitespace,
              char(":"),
              whitespace,
              valueType,
            ]),
          ),
        ]),
      ),
      whitespace,
      char(")"),
      whitespace,
      char(":"),
      whitespace,
      valueType,
      whitespace,
      char("{"),
      whitespace,
      rep(cat([or<Declaration | Return>([declaration, _return]), whitespace])),
      whitespace,
      char("}"),
    ]),
    ([
      _export,
      ,
      ,
      ,
      name,
      ,
      ,
      ,
      params,
      ,
      ,
      ,
      ,
      ,
      returnType,
      ,
      ,
      ,
      statements,
    ]): Func => ({
      export: _export.status === "some",
      name,
      params: ((): Param[] => {
        if (params.status === "none") {
          return [];
        }

        const [name, , , , type, rests] = params.value;
        const results: Param[] = [{ name, type }];

        for (const [, , , name, , , , type] of rests) {
          results.push({ name, type });
        }

        return results;
      })(),
      returnType,
      statements: statements.map(([x]) => x),
    }),
  )(input);
}
