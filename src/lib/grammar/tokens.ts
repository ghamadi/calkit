import { createToken, Lexer } from 'chevrotain';

export enum TokenName {
  // special characters
  SEMI = 'Semicolon',
  COMMA = 'Comma',
  LEFT_PAREN = 'LeftParen',
  RIGHT_PAREN = 'RightParen',
  LEFT_BRACKET = 'LeftBracket',
  RIGHT_BRACKET = 'RightBracket',

  // patterns of vlaues
  ID = 'Identifier',
  STRING_LITERAL = 'StringLiteral',
  NUMERIC_LITERAL = 'NumericLiteral',
  WHITESPACE = 'Whitespace',

  // operators
  ADD_OP = 'AddOperator',
  MUL_OP = 'MulOperator',
  EXPONENT_OP = 'ExponentOperator',
  FACTORIAL_OP = 'FactorialOperator',
  ASSIGN_OP = 'AssignmentOperator',

  // reserved keywords (`FN_` indicates a predefined function's name)
  FN_Progressive = 'FnProgressive'
}

export const Whitespace = createToken({
  name: TokenName.WHITESPACE,
  pattern: /\s+/,
  group: Lexer.SKIPPED
});

export const Comma = createToken({
  name: TokenName.COMMA,
  pattern: /,/
});

export const Semicolon = createToken({
  name: TokenName.SEMI,
  pattern: /;/
});

export const AssignmentOperator = createToken({
  name: TokenName.ASSIGN_OP,
  pattern: /=/
});

export const ExponentOperator = createToken({
  name: TokenName.EXPONENT_OP,
  pattern: /\^/
});

export const FactorialOperator = createToken({
  name: TokenName.FACTORIAL_OP,
  pattern: /!/
});

export const LeftParenthesis = createToken({
  name: TokenName.LEFT_PAREN,
  pattern: /\(/
});

export const RightParenthesis = createToken({
  name: TokenName.RIGHT_PAREN,
  pattern: /\)/
});

export const LeftSquareBracket = createToken({
  name: TokenName.LEFT_BRACKET,
  pattern: /\[/
});

export const RightSquareBracket = createToken({
  name: TokenName.RIGHT_BRACKET,
  pattern: /\]/
});

export const AddOperator = createToken({
  name: TokenName.ADD_OP,
  pattern: /[+-]/
});

export const MultiplyOperator = createToken({
  name: TokenName.MUL_OP,
  pattern: /[*/%]/
});

export const NumericLiteral = createToken({
  name: TokenName.NUMERIC_LITERAL,
  pattern: /([0-9]+([.][0-9]+)?)([eE][+-][0-9]+)?/
});

export const StringLiteral = createToken({
  name: TokenName.STRING_LITERAL,
  pattern: /".*"/
});

export const Identifier = createToken({
  name: TokenName.ID,
  pattern: /[a-z_]+[a-z_0-9]*/i
});

export const FnProgressive = createToken({
  name: TokenName.FN_Progressive,
  pattern: /progressive/i,
  longer_alt: Identifier
});
