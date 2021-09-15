import { Field } from "./field.model";

export interface Project {
    id: number;
    keywords: Keyword[];
    projectName: string;
    fields: Field[];
} 

interface Keyword {
    id: number;
    name: string;
}

export interface ProjectPage {
    count: number;
    pageNumber: number;
    pageSize: number;
    projects: Project[];
}