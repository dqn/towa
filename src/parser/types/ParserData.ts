import type { Parser } from "./Parser";

export type ParserData<P> = P extends Parser<infer T> ? T : never;
