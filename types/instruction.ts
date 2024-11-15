import { Succ, TNatNum, Zero } from './primitives/natnum';
import { Null } from './primitives/null';
import { Pair } from './primitives/pair';

export type HaltInstruction = Pair<Zero, Null>;
export type IncrementInstruction<
    Register extends TNatNum,
    NextInstruction extends TNatNum,
> = Pair<Succ<Zero>, Pair<Register, NextInstruction>>;
export type DecrementInstruction<
    Register extends TNatNum,
    NextInstruction extends TNatNum,
    NextInstructionIfZero extends TNatNum,
> = Pair<
    Succ<Succ<Zero>>,
    Pair<Register, Pair<NextInstruction, NextInstructionIfZero>>
>;

export type TInstruction =
    | HaltInstruction
    | IncrementInstruction<TNatNum, TNatNum>
    | DecrementInstruction<TNatNum, TNatNum, TNatNum>;
