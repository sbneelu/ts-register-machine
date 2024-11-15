import { TBoolean, True } from './types/boolean';
import {
    DecrementInstruction,
    HaltInstruction,
    IncrementInstruction,
    TInstruction,
} from './types/instruction';
import { TList } from './types/primitives/list';
import { TNatNum, Zero } from './types/primitives/natnum';
import { Null, TOptional } from './types/primitives/null';
import { Pair, TPair } from './types/primitives/pair';
import { FDecrementNth, FGetNth, FIncrementNth, FSlice } from './utils/list';

export type TRegisterState = TList<TNatNum>;

type FStep<
    RegisterState extends TRegisterState,
    Instruction extends TInstruction,
> = Instruction extends HaltInstruction
    ? never
    : Instruction extends IncrementInstruction<
          infer Register,
          infer NextInstruction
      >
    ? Pair<FIncrementNth<RegisterState, Register, Zero>, NextInstruction>
    : Instruction extends DecrementInstruction<
          infer Register extends TNatNum,
          infer NextInstruction extends TNatNum,
          infer NextInstructionIfZero extends TNatNum
      >
    ? FDecrementNth<RegisterState, Register> extends Pair<
          infer NewState,
          infer Success extends TBoolean
      >
        ? Pair<
              NewState,
              Success extends True ? NextInstruction : NextInstructionIfZero
          >
        : never
    : never;

export type FRun<
    InitialState extends TRegisterState,
    FirstInstruction extends TNatNum,
    Instructions extends TList<TInstruction>,
> = FGetNth<
    Instructions,
    FirstInstruction,
    HaltInstruction,
    TInstruction
> extends infer Instruction extends TInstruction
    ? Instruction extends HaltInstruction
        ? InitialState
        : FStep<InitialState, Instruction> extends infer StepResult
        ? StepResult extends Pair<
              infer NewState extends TRegisterState,
              infer NextInstruction extends TNatNum
          >
            ? FRun<NewState, NextInstruction, Instructions>
            : never
        : never
    : never;

export type FCompute<
    InitialState extends TRegisterState,
    FirstInstruction extends TNatNum,
    Instructions extends TList<TInstruction>,
    ResultRegisters extends TNatNum | TPair<TNatNum, TNatNum>, // Range of registers, or single register
> = FRun<
    InitialState,
    FirstInstruction,
    Instructions
> extends infer FinalState extends TList<TNatNum>
    ? ResultRegisters extends infer Index extends TNatNum
        ? FGetNth<FinalState, Index, Null, TOptional<TNatNum>>
        : ResultRegisters extends Pair<
              infer From extends TNatNum,
              infer To extends TNatNum
          >
        ? FSlice<FinalState, From, To, Null, TOptional<TNatNum>>
        : never
    : never;
