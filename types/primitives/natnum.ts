export interface Zero {
    zero: null;
}
export interface Succ<T extends TNatNum> {
    succ: T;
}
export type TNatNum = Succ<TNatNum> | Zero;
