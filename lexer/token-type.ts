export enum TokenType {
    IDENTIFIER,
    NUMBER,
    STRING,

    LBRACE,
    RBRACE,
    LPAREN,
    RPAREN,
    HASHTAG,
    PERIOD,

    BANG,
    GREATER_THAN,
    GREATER_EQUAL,
    LESS_THAN,
    LESS_EQUAL,
    EQUAL_TO,
    NOT_EQUAL,

    STATE,
    ON,
    WHEN,
    
    ASSIGN,
    PLUS,
    MINUS,
    DIVIDE,
    MULTIPLY,

    WHITESPACE,
    COLON,
    SEMICOLON,
    EOF
}