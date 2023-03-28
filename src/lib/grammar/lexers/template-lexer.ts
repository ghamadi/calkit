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
  Identifier,
  AssignmentOperator,
  Semicolon
} from '~/lib/grammar/tokens';

/**
 * The lexer used by the TemplateParser class
 */
export default class TemplateLexer extends CalkitLexer {
  constructor() {
    super([
      // keep on top for better performance
      Whitespace,

      AddOperator,
      MultiplyOperator,
      ExponentOperator,
      FactorialOperator,
      AssignmentOperator,

      LeftParenthesis,
      RightParenthesis,
      LeftSquareBracket,
      RightSquareBracket,
      Comma,
      Semicolon,

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
      AssignmentOperator,
      LeftParenthesis,
      RightParenthesis,
      LeftSquareBracket,
      RightSquareBracket,
      Comma,
      Semicolon,
      NumericLiteral,
      StringLiteral,
      FnProgressive,
      Identifier
    } as const;
  }
}
