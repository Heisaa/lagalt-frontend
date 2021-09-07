export interface Project {
    id: number;
    keywords: Keyword[];
} 

interface Keyword {
    id: number;
    name: string;
}