import { Lexer } from "../lexer/lexer";
import { TokenType } from "../lexer/token-type";

test('tokenize selectors', () => {
    const lexer = new Lexer('.class #identifier');

    const result = lexer.tokenize();

    expect(result).toStrictEqual([
        {type: TokenType.STATE, value: 'state'},
        {type: TokenType.ON, value: 'on'},
        {type: TokenType.WHEN, value: 'when'},
        {type: TokenType.IDENTIFIER, value: 'stateonwhen'},
        {type: TokenType.EOF, value: ""}
    ])
});

test('tokenize keywords', () => {
    const lexer = new Lexer('state on when stateonwhen');

    const result = lexer.tokenize();

    expect(result).toStrictEqual([
        {type: TokenType.STATE, value: 'state'},
        {type: TokenType.ON, value: 'on'},
        {type: TokenType.WHEN, value: 'when'},
        {type: TokenType.IDENTIFIER, value: 'stateonwhen'},
        {type: TokenType.EOF, value: ""}
    ])
});

test('tokenize conditional operators', () => {
    const lexer = new Lexer('== < > <= >= != !');

    const result = lexer.tokenize();

    expect(result).toStrictEqual([
        {type: TokenType.EQUAL_TO, value: '=='},
        {type: TokenType.LESS_THAN, value: '<'},
        {type: TokenType.GREATER_THAN, value: '>'},
        {type: TokenType.LESS_EQUAL, value: '<='},
        {type: TokenType.GREATER_EQUAL, value: '>='},
        {type: TokenType.NOT_EQUAL, value: '!='},
        {type: TokenType.BANG, value: '!'},
        {type: TokenType.EOF, value: ""}
    ])
});

test('tokenize math operators', () => {
    const lexer = new Lexer('= + - / *');

    const result = lexer.tokenize();

    expect(result).toStrictEqual([
        {type: TokenType.ASSIGN, value: '='},
        {type: TokenType.PLUS, value: '+'},
        {type: TokenType.MINUS, value: '-'},
        {type: TokenType.DIVIDE, value: '/'},
        {type: TokenType.MULTIPLY, value: '*'},
        {type: TokenType.EOF, value: ""}
    ])
});

test('tokenize symbols', () => {
    const lexer = new Lexer('{(#.)}');

    const result = lexer.tokenize();

    expect(result).toStrictEqual([
        {type: TokenType.LBRACE, value: '{'},
        {type: TokenType.LPAREN, value: '('},
        {type: TokenType.HASHTAG, value: '#'},
        {type: TokenType.PERIOD, value: '.'},
        {type: TokenType.RPAREN, value: ')'},
        {type: TokenType.RBRACE, value: '}'},
        {type: TokenType.EOF, value: ""}
    ])
});

test('tokenize number', () => {
    const lexer = new Lexer('123 456');

    const result = lexer.tokenize();

    expect(result).toStrictEqual([
        {type: TokenType.NUMBER, value: '123'},
        {type: TokenType.NUMBER, value: '456'},
        {type: TokenType.EOF, value: ""}
    ])
});

test('tokenize string', () => {
    const lexer = new Lexer('"hello world" "hello" "world"');

    const result = lexer.tokenize();

    expect(result).toStrictEqual([
        {type: TokenType.STRING, value: '"hello world"'},
        {type: TokenType.STRING, value: '"hello"'},
        {type: TokenType.STRING, value: '"world"'},
        {type: TokenType.EOF, value: ""}
    ])
});

test('tokenize special', () => {
    const lexer = new Lexer(';:');

    const result = lexer.tokenize();

    expect(result).toStrictEqual([
        {type: TokenType.SEMICOLON, value: ';'},
        {type: TokenType.COLON, value: ':'},
        {type: TokenType.EOF, value: ""}
    ])
});