import { Bracket, BracketProps } from '~/models/bracket-calculation/bracket';

interface BracketsTemplateOptions {
  inputUnit?: string;
  fixedValue?: number;
  outputUnit?: string;
}

export class BracketsTemplate {
  readonly brackets: Bracket[] = [];
  readonly inputUnit: string;
  readonly fixedValue: number;
  readonly outputUnit: string;

  constructor(brackets: Bracket[] | BracketProps[], otpions: BracketsTemplateOptions = {}) {
    this.inputUnit = otpions.inputUnit ?? '';
    this.fixedValue = otpions.fixedValue ?? 0;
    this.outputUnit = otpions.outputUnit ?? '';

    brackets.forEach((bracket) => this.addBracket(bracket));
  }

  addBracket(input: Bracket | BracketProps) {
    const bracket = input instanceof Bracket ? input : new Bracket(input);
    this.brackets.push(bracket);
  }

  removeBracket(index: number) {
    if (index < 0 || index >= this.brackets.length) {
      throw new Error(`CalkitError: Cannot remove bracket. Index {${index}} is out of range.`);
    }
    this.brackets.splice(index, 1);
  }

  /**
   * @returns The list of indexes of brackets that
   * either conflict with previous ones or are preceded by a gap
   */
  get conflictingIndexes() {
    return this.brackets
      .map((bracket, index) => {
        const currentMin = bracket.min;
        const previousMax = this.brackets[index - 1]?.max;

        // Adjacent brackets are overlapping or separated by a gap
        if (previousMax !== undefined && previousMax !== currentMin) {
          return index;
        }
        return null;
      })
      .filter((conflictIndex) => conflictIndex !== null) as number[];
  }

  /**
   * @returns The list of indexes of brackets that have invalid ranges
   */
  get invalidBrackets() {
    return this.brackets
      .map((bracket, index) => (bracket.isValid ? null : index))
      .filter((invalidIndex) => invalidIndex !== null);
  }
}
