import StatementLexer from '~/lib/grammar/lexers/statement-lexer';
import CalkitParser from '~/lib/grammar/parsers/calkit-parser';
import ExpressionParser from '~/lib/grammar/parsers/expression-parser';

export default class StatementParser extends CalkitParser {
  readonly statementRule;
  readonly assignmentRule;

  constructor() {
    super(new StatementLexer());
    const lexer = this.lexer as StatementLexer;
    const expressionParser = new ExpressionParser();

    this.statementRule = this.RULE('StatementRule', () => {
      this.OR([
        { ALT: () => this.SUBRULE(this.assignmentRule) },
        { ALT: () => this.SUBRULE(expressionParser.expressionRule) }
      ]);
    });

    this.assignmentRule = this.RULE('AssignmentRule', () => {
      this.CONSUME(lexer.tokens.Identifier);
      this.CONSUME(lexer.tokens.AssignmentOperator);
      this.OR([
        { ALT: () => this.SUBRULE(expressionParser.expressionRule) },
        { ALT: () => this.CONSUME(lexer.tokens.StringLiteral) }
      ]);
    });

    this.rootParserRule = this.statementRule;
  }
}
