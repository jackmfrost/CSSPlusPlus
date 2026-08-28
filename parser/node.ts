import { NodeType } from "./node-type";

export interface Node {
    type?: NodeType;
    value?: string;
    children?: Object;
}