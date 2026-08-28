import { TokenType } from "./token-type";

export interface Token {
    type: TokenType | null;
    value: string | null;
    line?: number;
    column?: number;
}