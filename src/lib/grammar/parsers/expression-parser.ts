import ExpressionLexer from '~/lib/grammar/lexers/expression-lexer';
import CalkitParser from '~/lib/grammar/parsers/calkit-parser';

export default class ExpressionParser extends CalkitParser {
  readonly productRule;
  readonly exponentRule;
  readonly signedRule;
  readonly valueRule;
  readonly sFunctionRule;
  readonly progBracketsRule;
  readonly expressionRule;
  readonly unsignedRule;

  constructor() {
    super(new ExpressionLexer());
    const tokens = (this.lexer as ExpressionLexer).tokens;

    this.expressionRule = this.RULE('ExpressionRule', () => {
      this.SUBRULE(this.productRule, { LABEL: 'lhs' });
      this.MANY(() => {
        this.CONSUME(tokens.AddOperator);
        this.SUBRULE1(this.productRule, { LABEL: 'rhs' });
      });
    });

    this.productRule = this.RULE('ProductRule', () => {
      this.SUBRULE(this.exponentRule, { LABEL: 'lhs' });
      this.MANY(() => {
        this.CONSUME(tokens.MultiplyOperator);
        this.SUBRULE1(this.exponentRule, { LABEL: 'rhs' });
      });
    });

    this.exponentRule = this.RULE('ExponentRule', () => {
      this.SUBRULE(this.signedRule);
      this.MANY(() => {
        this.CONSUME(tokens.ExponentOperator);
        this.SUBRULE1(this.signedRule);
      });
    });

    this.signedRule = this.RULE('SignedRule', () => {
      this.OR([
        { ALT: () => this.SUBRULE(this.unsignedRule) },
        {
          ALT: () => {
            this.CONSUME(tokens.AddOperator);
            this.SUBRULE1(this.signedRule);
          }
        }
      ]);
    });

    // TODO: Consider if double, triple, etc... factorial is a good idea
    this.unsignedRule = this.RULE('UnsignedRule', () => {
      this.SUBRULE(this.valueRule);
      this.OPTION(() => {
        this.CONSUME(tokens.FactorialOperator);
      });
    });

    this.valueRule = this.RULE('ValueRule', () => {
      this.OR([
        { ALT: () => this.SUBRULE(this.sFunctionRule) },
        { ALT: () => this.CONSUME(tokens.NumericLiteral) },
        { ALT: () => this.CONSUME(tokens.Identifier) },
        {
          ALT: () => {
            this.CONSUME(tokens.LeftParenthesis);
            this.SUBRULE(this.expressionRule);
            this.CONSUME(tokens.RightParenthesis);
          }
        }
      ]);
    });

    // TODO: Extract function rules to a separate parser
    this.sFunctionRule = this.RULE('SFunctionRule', () => {
      this.CONSUME(tokens.FnProgressive);
      this.CONSUME(tokens.LeftParenthesis);
      this.CONSUME(tokens.LeftSquareBracket);
      this.SUBRULE(this.progBracketsRule);
      this.CONSUME(tokens.RightSquareBracket);
      this.CONSUME(tokens.Comma);
      this.SUBRULE(this.expressionRule);
      this.CONSUME(tokens.RightParenthesis);
    });

    this.progBracketsRule = this.RULE('ProgressiveBracketsRule', () => {
      this.CONSUME(tokens.LeftSquareBracket);
      this.CONSUME(tokens.NumericLiteral);
      this.CONSUME1(tokens.Comma);
      this.CONSUME1(tokens.NumericLiteral);
      this.CONSUME2(tokens.Comma);
      this.CONSUME2(tokens.NumericLiteral);
      this.CONSUME(tokens.RightSquareBracket);
    });

    this.rootParserRule = this.expressionRule;
  }
}
