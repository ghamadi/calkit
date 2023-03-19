export type BracketEdges = [number, number | undefined];

export class Bracket {
  readonly min: number;
  readonly max: number;

  constructor([min, max]: BracketEdges) {
    this.min = min;
    this.max = max ?? Infinity;
  }

  get size() {
    return this.max - this.min;
  }

  get isValid() {
    return this.max >= this.min;
  }
}
