import { Token } from "./token";
import { TokenType } from "./token-type";
import { WHITESPACE, LBRACE, RBRACE, LPAREN, RPAREN, HASHTAG, PERIOD, ASSIGN, PLUS, MINUS, DIVIDE, MULTIPLY, COLON, SEMICOLON, BANG, GREATER_THAN, LESS_THAN, DIGIT, IDENTIFIER, GREATER_EQUAL, LESS_EQUAL, NOT_EQUAL, EQUAL_TO, STRING } from "./token-regex";
import { keywords } from "./keywords";

export class Lexer {

    private source: string;
    private position: number = 0;

    constructor(source: string) {
        this.source = source;
    }

    tokenize(): Token[] {
        const tokens : Token[] = [];

        while (this.position < this.source.length) {
            this.skipWhitespace();

            if (this.position >= this.source.length) break;

            tokens.push(this.readToken());
        }

        const EOF_TOKEN : Token = {
            type: TokenType.EOF,
            value: ""
        }

        tokens.push(EOF_TOKEN);

        return (tokens);
    }

    private skipWhitespace(): void {
        while (this.position < this.source.length) {
            const currentChar = this.source[this.position];
            const isCurrentCharWhitespace = WHITESPACE.test(currentChar);

            if (isCurrentCharWhitespace) {
                this.position++;
            } else {
                break;
            }
        }
    }

    private readNumber(): Token {
        const token : Token = {
            type: TokenType.NUMBER,
            value: null
        };

        const start = this.position;

        while (this.position < this.source.length) {
            const currentChar = this.source[this.position];
            const isCurrentCharDigit = DIGIT.test(currentChar);

            if (isCurrentCharDigit) {
                this.position++;
            } else {
                break;
            }
        }

        const end = this.position;

        token.value = this.source.slice(start, end);

        return (token);
    }

    private readString(): Token {
        const token : Token = {
            type: TokenType.STRING,
            value: null
        };

        const quote = this.source[this.position];
        const start = this.position;

        this.position++;

        while (this.position < this.source.length) {
            const currentChar = this.source[this.position];
            const isCurrentCharQuote = currentChar == quote;

            this.position++;

            if (isCurrentCharQuote) {
                break;   
            }
        }

        const end = this.position;

        token.value = this.source.slice(start, end);

        return (token);
    }

    private readIdentifier(): Token {
        const token : Token = {
            type: null,
            value: null
        };

        const start = this.position;
        
        while (this.position < this.source.length) {
            const currentChar = this.source[this.position];
            const isCurrentCharIdentifier = IDENTIFIER.test(currentChar);

            if (isCurrentCharIdentifier) {
                this.position++;
            } else {
                break;
            }
        }

        const end = this.position;

        token.value = this.source.slice(start, end);
        token.type = keywords[token.value] ?? TokenType.IDENTIFIER;

        return (token);
    }

    private readToken(): Token {
        const token : Token = {
            type: null,
            value: null
        };

        const currentChar = this.source[this.position];
        
        switch (currentChar) {
            case LBRACE:
                token.type = TokenType.LBRACE;
                token.value = LBRACE;
                break;
            case RBRACE:
                token.type = TokenType.RBRACE;
                token.value = RBRACE;
                break;
            case LPAREN:
                token.type = TokenType.LPAREN;
                token.value = LPAREN;
                break;
            case RPAREN:
                token.type = TokenType.RPAREN;
                token.value = RPAREN;
                break;
            case HASHTAG:
                token.type = TokenType.HASHTAG;
                token.value = HASHTAG;
                break;
            case PERIOD:
                token.type = TokenType.PERIOD;
                token.value = PERIOD;
                break;
            case ASSIGN: {
                const nextChar = this.source[this.position + 1];
                if (nextChar && nextChar == '=') {
                    token.type = TokenType.EQUAL_TO;
                    token.value = EQUAL_TO;
                    this.position++;
                } else {
                    token.type = TokenType.ASSIGN;
                    token.value = ASSIGN;
                }
                break;
            }
            case PLUS:
                token.type = TokenType.PLUS;
                token.value = PLUS;
                break;
            case MINUS:
                token.type = TokenType.MINUS;
                token.value = MINUS;
                break;
            case DIVIDE:
                token.type = TokenType.DIVIDE;
                token.value = DIVIDE;
                break;
            case MULTIPLY:
                token.type = TokenType.MULTIPLY;
                token.value = MULTIPLY;
                break;
            case COLON:
                token.type = TokenType.COLON;
                token.value = COLON;
                break;
            case SEMICOLON:
                token.type = TokenType.SEMICOLON;
                token.value = SEMICOLON;
                break;
            case BANG: {
                const nextChar = this.source[this.position + 1];
                if (nextChar && nextChar == '=') {
                    token.type = TokenType.NOT_EQUAL;
                    token.value = NOT_EQUAL;
                    this.position++;
                } else {
                    token.type = TokenType.BANG;
                    token.value = BANG;
                }
                break;
            }
            case GREATER_THAN: {
                const nextChar = this.source[this.position + 1];
                if (nextChar && nextChar == '=') {
                    token.type = TokenType.GREATER_EQUAL;
                    token.value = GREATER_EQUAL;
                    this.position++;
                } else {
                    token.type = TokenType.GREATER_THAN;
                    token.value = GREATER_THAN;
                }

                break;
            }
            case LESS_THAN: {
                const nextChar = this.source[this.position + 1];
                if (nextChar && nextChar == '=') {
                    token.type = TokenType.LESS_EQUAL;
                    token.value = LESS_EQUAL;
                    this.position++;
                } else {
                    token.type = TokenType.LESS_THAN;
                    token.value = LESS_THAN;
                }
                break;
            }
            default:
                if (currentChar == '"' || currentChar == "'") {
                    const string = this.readString();
                    return (string);
                }

                if (DIGIT.test(currentChar)) {
                    const number = this.readNumber();
                    return (number);
                }

                if (IDENTIFIER.test(currentChar)) {
                    const identifier = this.readIdentifier();
                    return (identifier);
                }

                throw Error('Can not identify token.')
                
        }

        this.position++;

        return token;
    }
}