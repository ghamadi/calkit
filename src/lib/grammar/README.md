
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
<expression>      ::=  <product> <expression_tail>
<expression_tail> ::=  <addop> <product> <expression_tail>
                    |  ε
<product>         ::=  <exponent> <product_tail>
<product_tail>    ::=  <mulop> <exponent> <product_tail>
                    |  ε
<exponent>        ::=  <signed> <exponent_tail>
<exponent_tail>   ::=  '^' <exponent> 
                    |  ε
<signed>          ::=  <unsigned>
                    |  <addop> <signed>
<unsigned>        ::=  <value> <unsigned_tail>
<unsigned_tail>   ::=  '!'
                    |  ε
<value>           ::=  <numeric_literal> 
                    |  <identifier> 
                    |  <cfunction> 
                    |  <sfunction> 
                    |  '(' <expression> ')'
<cfunction>       ::=  <identifier> '(' <parameters> ')' 
<sfunction>       ::=  progressive(<brackets>, <expression>)
<parameters>      ::=  <expression> 
                    |  <expression> ',' <parameters>
<brackets>        ::=  '[' <numeric_literal> ',' <numeric_literal> ',' <numeric_literal> ']' 
                    |  '[' <numeric_literal>, <numeric_literal>, <numeric_literal> ']', <brackets>
<numeric_literal> ::=  /[0-9]+[.]?[0-9]*([eE][+\-][0-9]+)?/
<string_literal>  ::=  /".*"/
<identifier>      ::=  /[a-z_]+[a-z_0-9]*/
<addop>           ::=  /[\+-]/
<mulop>           ::=  /[\*\/%]/
```