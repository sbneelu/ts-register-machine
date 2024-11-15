import { False, TBoolean, True } from '../types/boolean';
import { Cons, Nil, TList } from '../types/primitives/list';
import { Succ, TNatNum, Zero } from '../types/primitives/natnum';
import { Pair } from '../types/primitives/pair';

export type FSlice<
    List extends TList<T>,
    From extends TNatNum,
    To extends TNatNum,
    DefaultValue extends T,
    T,
> = FFillListElementIfEmpty<List, DefaultValue, T> extends Cons<
    infer Head,
    infer Tail,
    T
>
    ? From extends Zero
        ? To extends Zero
            ? Nil
            : To extends Succ<infer ToPred>
            ? Cons<Head, FSlice<Tail, Zero, ToPred, DefaultValue, T>, T>
            : never
        : From extends Succ<infer FromPred>
        ? To extends Succ<infer ToPred>
            ? FSlice<Tail, FromPred, ToPred, DefaultValue, T>
            : never
        : never
    : never;

export type FGetNth<
    List extends TList<T>,
    N extends TNatNum,
    DefaultValue extends T,
    T,
> = FSlice<List, N, Succ<N>, DefaultValue, T> extends Cons<
    infer Head,
    infer _,
    T
>
    ? Head
    : never;

export type FFillListElementIfEmpty<
    List extends TList<T>,
    DefaultValue extends T,
    T,
> = List extends Nil ? Cons<DefaultValue, Nil, T> : List;

export type FIncrementNth<
    List extends TList<TNatNum>,
    N extends TNatNum,
    DefaultValue extends TNatNum,
> = FFillListElementIfEmpty<List, DefaultValue, TNatNum> extends Cons<
    infer Head,
    infer Tail,
    TNatNum
>
    ? N extends Zero
        ? Cons<Succ<Head>, Tail, TNatNum>
        : N extends Succ<infer Pred>
        ? Cons<Head, FIncrementNth<Tail, Pred, DefaultValue>, TNatNum>
        : never
    : never;

export type FDecrementNth<
    List extends TList<TNatNum>,
    N extends TNatNum,
> = List extends Nil
    ? Pair<List, False>
    : List extends Cons<infer Head, infer Tail, TNatNum>
    ? N extends Zero
        ? Head extends Zero
            ? Pair<Cons<Head, Tail, TNatNum>, False>
            : Head extends Succ<infer NewHead>
            ? Pair<Cons<NewHead, Tail, TNatNum>, True>
            : never
        : N extends Succ<infer Pred>
        ? FDecrementNth<Tail, Pred> extends Pair<
              infer NewTail extends TList<TNatNum>,
              infer Success extends TBoolean
          >
            ? Pair<Cons<Head, NewTail, TNatNum>, Success>
            : never
        : never
    : never;
