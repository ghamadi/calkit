export interface BracketProps {
  min: number;
  max?: number;
  multiplier: number;
}

export class Bracket {
  readonly min: number;
  readonly max: number;
  readonly multiplier: number;

  constructor({ min, max, multiplier }: BracketProps) {
    this.min = min;
    this.max = max ?? Infinity;
    this.multiplier = multiplier;
  }

  get size() {
    return this.max - this.min;
  }

  get isValid() {
    return this.max >= this.min;
  }
}
