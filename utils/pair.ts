import { Pair, TPair } from '../types/primitives/pair';

export type FGetFst<P extends TPair<TFst, any>, TFst> = P extends Pair<
    infer Fst extends TFst,
    any
>
    ? Fst
    : never;

export type FGetSnd<P extends TPair<any, TSnd>, TSnd> = P extends Pair<
    any,
    infer Snd extends TSnd
>
    ? Snd
    : never;
