import CalkitLexer from '~/lib/grammar/lexers/calkit-lexer';
import {
  Whitespace,
  AddOperator,
  MultiplyOperator,
  ExponentOperator,
  FactorialOperator,
  LeftParenthesis,
  RightParenthesis,
  LeftSquareBracket,
  RightSquareBracket,
  Comma,
  NumericLiteral,
  StringLiteral,
  FnProgressive,
  Identifier
} from '~/lib/grammar/tokens';

/**
 * The lexer used by the ExpressionParser class
 */
export default class ExpressionLexer extends CalkitLexer {
  constructor() {
    super([
      // keep on top for better performance
      Whitespace,

      AddOperator,
      MultiplyOperator,
      ExponentOperator,
      FactorialOperator,

      LeftParenthesis,
      RightParenthesis,
      LeftSquareBracket,
      RightSquareBracket,
      Comma,

      NumericLiteral,
      StringLiteral,

      // keywords
      FnProgressive,

      // Must appear after keywords (all keywords are valid identifiers)
      Identifier
    ]);
  }

  get tokens() {
    return {
      Whitespace,
      AddOperator,
      MultiplyOperator,
      ExponentOperator,
      FactorialOperator,
      LeftParenthesis,
      RightParenthesis,
      LeftSquareBracket,
      RightSquareBracket,
      Comma,
      NumericLiteral,
      StringLiteral,
      FnProgressive,
      Identifier
    } as const;
  }
}
