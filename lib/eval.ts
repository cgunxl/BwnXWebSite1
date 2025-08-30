// Safe Expression Evaluator - No eval(), no external code execution
// Only allows pure mathematical operations

export class SafeEvaluator {
  private readonly allowedFunctions = [
    'abs', 'acos', 'asin', 'atan', 'atan2', 'ceil', 'cos', 
    'exp', 'floor', 'log', 'max', 'min', 'pow', 'random', 
    'round', 'sin', 'sqrt', 'tan'
  ];

  private readonly operators = {
    '+': (a: number, b: number) => a + b,
    '-': (a: number, b: number) => a - b,
    '*': (a: number, b: number) => a * b,
    '/': (a: number, b: number) => a / b,
    '%': (a: number, b: number) => a % b,
    '**': (a: number, b: number) => Math.pow(a, b),
    '^': (a: number, b: number) => Math.pow(a, b),
  };

  evaluate(expression: string, variables: Record<string, any>): number {
    try {
      // Parse the expression into an AST
      const ast = this.parse(expression);
      
      // Evaluate the AST with the provided variables
      return this.evaluateAST(ast, variables);
    } catch (error) {
      console.error('Evaluation error:', error);
      throw new Error(`Failed to evaluate expression: ${expression}`);
    }
  }

  private parse(expression: string): ASTNode {
    // Remove whitespace
    expression = expression.replace(/\s+/g, '');
    
    // Tokenize
    const tokens = this.tokenize(expression);
    
    // Build AST
    return this.buildAST(tokens);
  }

  private tokenize(expression: string): Token[] {
    const tokens: Token[] = [];
    let current = 0;
    
    while (current < expression.length) {
      const char = expression[current];
      
      // Numbers (including decimals)
      if (/\d/.test(char)) {
        let value = '';
        while (current < expression.length && (/\d/.test(expression[current]) || expression[current] === '.')) {
          value += expression[current];
          current++;
        }
        tokens.push({ type: 'number', value: parseFloat(value) });
        continue;
      }
      
      // Variables/Functions
      if (/[a-zA-Z_]/.test(char)) {
        let value = '';
        while (current < expression.length && /[a-zA-Z0-9_]/.test(expression[current])) {
          value += expression[current];
          current++;
        }
        
        // Check if it's a Math function
        if (this.allowedFunctions.includes(value)) {
          tokens.push({ type: 'function', value });
        } else if (value === 'Math' && expression[current] === '.') {
          // Handle Math.function
          current++; // Skip the dot
          let funcName = '';
          while (current < expression.length && /[a-zA-Z]/.test(expression[current])) {
            funcName += expression[current];
            current++;
          }
          if (this.allowedFunctions.includes(funcName)) {
            tokens.push({ type: 'function', value: funcName });
          }
        } else {
          tokens.push({ type: 'variable', value });
        }
        continue;
      }
      
      // Operators
      if (char === '+' || char === '-' || char === '/' || char === '%') {
        tokens.push({ type: 'operator', value: char });
        current++;
        continue;
      }
      
      if (char === '*') {
        if (expression[current + 1] === '*') {
          tokens.push({ type: 'operator', value: '**' });
          current += 2;
        } else {
          tokens.push({ type: 'operator', value: '*' });
          current++;
        }
        continue;
      }
      
      if (char === '^') {
        tokens.push({ type: 'operator', value: '^' });
        current++;
        continue;
      }
      
      // Parentheses
      if (char === '(') {
        tokens.push({ type: 'lparen', value: '(' });
        current++;
        continue;
      }
      
      if (char === ')') {
        tokens.push({ type: 'rparen', value: ')' });
        current++;
        continue;
      }
      
      // Comma (for function arguments)
      if (char === ',') {
        tokens.push({ type: 'comma', value: ',' });
        current++;
        continue;
      }
      
      // Skip unknown characters
      current++;
    }
    
    return tokens;
  }

  private buildAST(tokens: Token[]): ASTNode {
    let index = 0;
    
    const parseExpression = (): ASTNode => {
      return parseAddSubtract();
    };
    
    const parseAddSubtract = (): ASTNode => {
      let left = parseMultiplyDivide();
      
      while (index < tokens.length) {
        const token = tokens[index];
        if (token.type === 'operator' && (token.value === '+' || token.value === '-')) {
          index++;
          const right = parseMultiplyDivide();
          left = {
            type: 'binary',
            operator: token.value,
            left,
            right,
          };
        } else {
          break;
        }
      }
      
      return left;
    };
    
    const parseMultiplyDivide = (): ASTNode => {
      let left = parsePower();
      
      while (index < tokens.length) {
        const token = tokens[index];
        if (token.type === 'operator' && (token.value === '*' || token.value === '/' || token.value === '%')) {
          index++;
          const right = parsePower();
          left = {
            type: 'binary',
            operator: token.value,
            left,
            right,
          };
        } else {
          break;
        }
      }
      
      return left;
    };
    
    const parsePower = (): ASTNode => {
      let left = parseUnary();
      
      while (index < tokens.length) {
        const token = tokens[index];
        if (token.type === 'operator' && (token.value === '**' || token.value === '^')) {
          index++;
          const right = parseUnary();
          left = {
            type: 'binary',
            operator: '**',
            left,
            right,
          };
        } else {
          break;
        }
      }
      
      return left;
    };
    
    const parseUnary = (): ASTNode => {
      const token = tokens[index];
      
      if (token && token.type === 'operator' && token.value === '-') {
        index++;
        return {
          type: 'unary',
          operator: '-',
          argument: parseUnary(),
        };
      }
      
      return parsePrimary();
    };
    
    const parsePrimary = (): ASTNode => {
      const token = tokens[index];
      
      if (!token) {
        throw new Error('Unexpected end of expression');
      }
      
      // Number literal
      if (token.type === 'number') {
        index++;
        return {
          type: 'literal',
          value: token.value,
        };
      }
      
      // Variable
      if (token.type === 'variable') {
        index++;
        return {
          type: 'variable',
          name: token.value as string,
        };
      }
      
      // Function call
      if (token.type === 'function') {
        const funcName = token.value as string;
        index++;
        
        if (tokens[index]?.type !== 'lparen') {
          throw new Error(`Expected '(' after function ${funcName}`);
        }
        index++; // Skip '('
        
        const args: ASTNode[] = [];
        
        while (tokens[index]?.type !== 'rparen') {
          args.push(parseExpression());
          
          if (tokens[index]?.type === 'comma') {
            index++;
          } else if (tokens[index]?.type !== 'rparen') {
            throw new Error('Expected comma or closing parenthesis in function call');
          }
        }
        
        if (tokens[index]?.type !== 'rparen') {
          throw new Error('Expected closing parenthesis');
        }
        index++; // Skip ')'
        
        return {
          type: 'function',
          name: funcName,
          arguments: args,
        };
      }
      
      // Parenthesized expression
      if (token.type === 'lparen') {
        index++;
        const expr = parseExpression();
        
        if (tokens[index]?.type !== 'rparen') {
          throw new Error('Expected closing parenthesis');
        }
        index++;
        
        return expr;
      }
      
      throw new Error(`Unexpected token: ${JSON.stringify(token)}`);
    };
    
    const ast = parseExpression();
    
    if (index < tokens.length) {
      throw new Error(`Unexpected token at end: ${JSON.stringify(tokens[index])}`);
    }
    
    return ast;
  }

  private evaluateAST(node: ASTNode, variables: Record<string, any>): number {
    switch (node.type) {
      case 'literal':
        return node.value as number;
      
      case 'variable':
        const varName = node.name!;
        if (!(varName in variables)) {
          throw new Error(`Unknown variable: ${varName}`);
        }
        const value = variables[varName];
        if (typeof value !== 'number') {
          throw new Error(`Variable ${varName} must be a number`);
        }
        return value;
      
      case 'unary':
        const arg = this.evaluateAST(node.argument!, variables);
        if (node.operator === '-') {
          return -arg;
        }
        throw new Error(`Unknown unary operator: ${node.operator}`);
      
      case 'binary':
        const left = this.evaluateAST(node.left!, variables);
        const right = this.evaluateAST(node.right!, variables);
        const op = this.operators[node.operator!];
        if (!op) {
          throw new Error(`Unknown operator: ${node.operator}`);
        }
        return op(left, right);
      
      case 'function':
        const funcName = node.name!;
        const args = node.arguments!.map(arg => this.evaluateAST(arg, variables));
        
        if (!this.allowedFunctions.includes(funcName)) {
          throw new Error(`Function not allowed: ${funcName}`);
        }
        
        const func = (Math as any)[funcName];
        if (!func) {
          throw new Error(`Unknown function: ${funcName}`);
        }
        
        return func.apply(null, args);
      
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  }

  // Create a safe function from an expression string
  createFunction(expression: string, paramNames: string[]): (...args: number[]) => number {
    return (...args: number[]) => {
      const variables: Record<string, number> = {};
      paramNames.forEach((name, index) => {
        variables[name] = args[index] || 0;
      });
      return this.evaluate(expression, variables);
    };
  }
}

// Types
interface Token {
  type: 'number' | 'variable' | 'operator' | 'function' | 'lparen' | 'rparen' | 'comma';
  value: string | number;
}

interface ASTNode {
  type: 'literal' | 'variable' | 'unary' | 'binary' | 'function';
  value?: number;
  name?: string;
  operator?: string;
  left?: ASTNode;
  right?: ASTNode;
  argument?: ASTNode;
  arguments?: ASTNode[];
}

// Export singleton instance
export const safeEvaluator = new SafeEvaluator();

// Helper function to evaluate formula strings
export function evaluateFormula(
  formula: string,
  inputs: Record<string, any>
): number {
  // Extract the expression from function string format if needed
  // e.g., "({p,r,n}) => p*r/(1-((1+r)**-n))" -> "p*r/(1-((1+r)**-n))"
  const match = formula.match(/=>\s*(.+)$/);
  const expression = match ? match[1] : formula;
  
  return safeEvaluator.evaluate(expression, inputs);
}