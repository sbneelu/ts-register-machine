import { Succ, Zero } from './primitives/natnum';

export type False = Zero;
export type True = Succ<Zero>;
export type TBoolean = True | False;
