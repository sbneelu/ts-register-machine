export interface Nil {
    nil: null;
}
export interface Cons<Head extends T, Tail extends TList<T>, T> {
    head: Head;
    tail: Tail;
}
export type TList<T> = Nil | Cons<T, TList<T>, T>;
