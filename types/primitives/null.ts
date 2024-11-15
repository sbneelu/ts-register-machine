export interface Null {
    null: null;
}
export type TNull = Null;
export type TOptional<T> = T | TNull;
