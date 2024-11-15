import { False, True } from '../types/boolean';
import { Succ, Zero } from '../types/primitives/natnum';

export type V0 = Zero;
export type V1 = Succ<V0>;
export type V2 = Succ<V1>;
export type V3 = Succ<V2>;
export type V4 = Succ<V3>;
export type V5 = Succ<V4>;
export type V6 = Succ<V5>;
export type V7 = Succ<V6>;
export type V8 = Succ<V7>;
export type V9 = Succ<V8>;
export type V10 = Succ<V9>;
export type V11 = Succ<V10>;
export type V12 = Succ<V11>;
export type V13 = Succ<V12>;
export type V14 = Succ<V13>;
export type V15 = Succ<V14>;
export type V16 = Succ<V15>;
export type V17 = Succ<V16>;
export type V18 = Succ<V17>;
export type V19 = Succ<V18>;
export type V20 = Succ<V19>;

export type FEqual<T1, T2> = T1 extends T2
    ? T2 extends T1
        ? True
        : False
    : False;
