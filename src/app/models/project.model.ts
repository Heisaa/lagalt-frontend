import { Field } from "./field.model";

export interface Project {
    id: number;
    keywords: Keyword[];
    name: string;
    fields: Field[];
} 

interface Keyword {
    id: number;
    name: string;
}