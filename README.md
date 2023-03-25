# towa

Toy wat to wasm compiler

## Installation

```bash
$ npm install towa
# or
$ yarn add towa
# or
$ pnpm add towa
```

## Usage

```bash
$ npx towa path/to/file.wat
# => file.wasm
```

## API

```ts
import { parse, generate } from "towa";

const wat = `
(module
  (func $add (param $lhs i32) (param $rhs i32) (result i32)
    local.get $lhs
    local.get $rhs
    i32.add)
  (export "add" (func $add))
)
`.trim();

const result = parse([...wat]);

if (result.success) {
  const buf = generate(result.data);

  WebAssembly.instantiate(buf).then((wasmModule) => {
    const { add } = wasmModule.instance.exports;
    const sum = (add as any)(1, 2);
    console.log(sum); // 3
  });
}
```

## License

MIT
