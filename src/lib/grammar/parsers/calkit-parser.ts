import { CstNode, CstParser, ParserMethod } from 'chevrotain';
import CalkitLexer from '~/lib/grammar/lexers/calkit-lexer';

export type CalkitParserRule = ParserMethod<Parameters<() => void>, CstNode>;

export default abstract class CalkitParser extends CstParser {
  protected readonly lexer: CalkitLexer;
  protected rootParserRule: CalkitParserRule;

  constructor(lexer: CalkitLexer) {
    super(lexer.tokens);
    this.lexer = lexer;
  }

  parse(input: string) {
    const lexingResult = this.lexer.tokenize(input);

    this.input = lexingResult.tokens;
    this.rootParserRule();

    if (this.errors.length > 0) {
      throw new Error(`Parsing Error: ${this.errors}`);
    }
  }

  prepare() {
    this.performSelfAnalysis();
    return this;
  }
}
