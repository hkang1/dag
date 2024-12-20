export interface Coord {
  x: number;
  y: number;
}

export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

export interface Size {
  height: number;
  width: number;
}
