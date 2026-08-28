import { TokenType } from "./token-type";

export const keywords: Record<string, TokenType> = {
    state: TokenType.STATE,
    on: TokenType.ON,
    when: TokenType.WHEN
}
