import { Field } from "./field.model";

export interface Project {
    projectId: number;
    keywords: Keyword[];
    projectName: string;
    fields: Field[];
    description: string;
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