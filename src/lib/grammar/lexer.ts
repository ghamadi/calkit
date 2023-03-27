import { Lexer } from 'chevrotain';
import {
  Whitespace,
  Comma,
  AssignmentOperator,
  ExponentOperator,
  FactorialOperator,
  LeftParenthesis,
  RightParenthesis,
  LeftSquareBracket,
  RightSquareBracket,
  AddOperator,
  MultiplyOperator,
  NumericLiteral,
  StringLiteral,
  Identifier,
  FnProgressive
} from '~/lib/grammar/tokens';

export const StatementLexer = new Lexer([
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

  NumericLiteral,
  StringLiteral,

  // keywords
  FnProgressive,

  // Must appear after keywords (all keywords are valid identifiers)
  Identifier
]);
