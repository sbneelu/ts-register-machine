# TypeScript type system register machine

Better readme coming soon. For now the important things are:

-   Since types and values are both in the type space, and functions and parameterized values are both represented as generic types, types begin with a `T`, functions with an `F`, and values with neither. The types aren't necessary but they help a little bit.
-   See `examples/multiplication.reg.ts` for an example. Hover over `Result` (or otherwise evaluate its type).
