
# Language for Arithmetic Expressions
Calkit supports a custom formal language that enables parsing the mathematical expressions and assingments that are the building blocks of templates.

The grammar supports writing mathematical expressions with decimal numbers, scientific numbers, functions, and the following operators:
- Addition: `+`
- Subtraction: `-`
- Multiplication: `*`
- Division: `/`
- Exponent: `^`
- Modulo: `%`

Functions will be added to the grammar as they are implemented.

## Grammar Design

```
<statement>       ::=  <assignment> 
                    |  <expression>
<assignment>      ::=  <identifier> '=' <expression> 
                    |  <identifier> '=' <string_literal>
<expression>      ::=  <product> 
                    |  <expression> <addop> <product>
<product>         ::=  <exponent> 
                    |  <product> <mulop> <exponent>
<exponent>        ::=  <signed> 
                    |  <exponent> '^' (<signed>) 
                    |  <exponent> '^' <value>
<signed>          ::=  <value> 
                    |  <addop> <signed>
<value>           ::=  <factorial> 
                    |  <numeric_literal> 
                    |  <identifier> 
                    |  <cfunction> 
                    |  <sfunction> 
                    |  '(' <expression> ')'
<factorial>       ::=  <value> '!'
<cfunction>       ::=  <identifier> '(' <parameters> ')' 
<sfunction>       ::=  progressive(<brackets>, <expression>)
<parameters>      ::=  <expression> 
                    |  <expression> ',' <parameters>
<brackets>        ::=  '[' <numeric_literal>, <numeric_literal>, <numeric_literal> ']' 
                    |  '[' <numeric_literal>, <numeric_literal>, <numeric_literal> ']', <brackets>
<numeric_literal> ::=  /[0-9]+[.]?[0-9]*([eE][+\-][0-9]+)?/
<string_literal>  ::=  /".*"/
<identifier>      ::=  /[a-z_]+[a-z_0-9]*/
<addop>           ::=  /[\+-]/
<mulop>           ::=  /[\*\/%]/
```