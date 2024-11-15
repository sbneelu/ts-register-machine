import { FCompute } from '../machine';
import {
    DecrementInstruction,
    HaltInstruction,
    IncrementInstruction,
    TInstruction,
} from '../types/instruction';
import { Cons, Nil } from '../types/primitives/list';
import { TNatNum } from '../types/primitives/natnum';
import { V0, V1, V10, V2, V3, V4, V5, V6, V7 } from '../utils/literals';

type Arg1 = V10;
type Arg2 = V10;

type Result = FinalResult;

// Everything above this line is arguments/results.

// Everything below this line is to run the machine.

// Setup

type InitialRegisterState = Cons<
    V0,
    Cons<Arg1, Cons<Arg2, Nil, TNatNum>, TNatNum>,
    TNatNum
>;
type FirstInstruction = V1;
type ResultRegister = V0;

// Instructions

type I0 = HaltInstruction;
type I1 = DecrementInstruction<V1, V2, V7>;
type I2 = DecrementInstruction<V2, V3, V5>;
type I3 = IncrementInstruction<V0, V4>;
type I4 = IncrementInstruction<V3, V2>;
type I5 = DecrementInstruction<V3, V6, V1>;
type I6 = IncrementInstruction<V2, V5>;
type I7 = DecrementInstruction<V2, V7, V0>;

type Instructions = Cons<
    I0,
    Cons<
        I1,
        Cons<
            I2,
            Cons<
                I3,
                Cons<
                    I4,
                    Cons<
                        I5,
                        Cons<I6, Cons<I7, Nil, TInstruction>, TInstruction>,
                        TInstruction
                    >,
                    TInstruction
                >,
                TInstruction
            >,
            TInstruction
        >,
        TInstruction
    >,
    TInstruction
>;

// Computation

type FinalResult = FCompute<
    InitialRegisterState,
    FirstInstruction,
    Instructions,
    ResultRegister
>;
