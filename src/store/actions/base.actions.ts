export interface StoreAction<T> {
  type: T;
  payload?: any;
}

export type StoreFunctions<T> = Record<
  string,
  (payload?: any) => StoreAction<T>
>;
