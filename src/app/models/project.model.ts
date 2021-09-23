import { Field } from "./field.model";

export interface Project {
    projectId: number;
    keywords: Keyword[];
    projectName: string;
    fields: Field[];
    description: string;
    photos: string[];
    progress: number;
    projectUsers: ProjectUser[]
} 

interface Keyword {
    id: number;
    name: string;
}

interface ProjectUser {
    userId: string;
    owner: boolean;
}

export interface ProjectPage {
    count: number;
    pageNumber: number;
    pageSize: number;
    projects: Project[];
}

export interface Message {
    messageId: number;
    projectId: number;
    userId: string;
    text: string;
    timeStamp: string;
}

export interface PostMessage {
    projectId: number;
    userId: string;
    text: string;
}

export interface PostProject {
    projectName?: string;
    description?: string;
    urlReference?: string;
}