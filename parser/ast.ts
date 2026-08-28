/*
Program
|
|__ Rule (Needs to remember: It's identifier, what kind of selector it is (class, id, etc.), and what's in its body)
    |
    |__ identifier
    |__ selectorType
    |__ Body
    
*/

import { NodeType } from "./node-type";

export type Expression = Identifier | NumberLiteral | StringLiteral | BooleanLiteral | BinaryExpression;
export type SelectorType = 'class' | 'id' | 'type' | 'universal' | 'attribute';
export type Operator = '==' | '<=' | '>=' | '!=' | '<' | '>' | '+' | '-' | '*' | '/';

export interface Node {
    type: NodeType;
}

export interface Identifier extends Node {
    type: NodeType.IDENTIFIER;
    name: string; 
}

export interface NumberLiteral extends Node {
    type: NodeType.NUMBERLITERAL;
    value: number; 
}

export interface StringLiteral extends Node {
    type: NodeType.STRINGLITERAL;
    value: string; 
}

export interface BooleanLiteral extends Node {
    type: NodeType.BOOLEANLITERAL;
    value: boolean; 
}

export interface BinaryExpression extends Node {
    type: NodeType.BINARYEXPRESSION;
    left: Expression; 
    operator: Operator;
    right: Expression;
}

export interface StateDeclaration extends Node {
    type: NodeType.STATEDECLARATION;
    identifier: Identifier;
    value: Expression;
}

export interface Rule extends Node {
    type: NodeType.RULE;
    identifier: Identifier;
    selectorType: SelectorType;
    body: Node[];
}

export interface Program extends Node {
    type: NodeType.PROGRAM;
    rules: Rule[];
}