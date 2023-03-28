import { ILexerConfig, ILexingResult, Lexer, TokenType, TokenVocabulary } from 'chevrotain';
/**
 * The main Lexer class for Calkit
 *
 * Extends the Lexer class from 'chevrotain' and,
 * exposes the tokens used to create the Lexer instance as a readonly value
 */
export default abstract class CalkitLexer extends Lexer {
  abstract readonly tokens: TokenVocabulary;

  constructor(lexerDefinition: TokenType[], config?: ILexerConfig) {
    super(lexerDefinition, config);
  }

  override tokenize(text: string, initialMode?: string | undefined): ILexingResult {
    const result = super.tokenize(text, initialMode);

    if (result.errors.length) {
      throw new Error(`Unexpected Token: ${result.errors.toString()}`);
    }
    return result;
  }
}
