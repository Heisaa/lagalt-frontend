export interface User {
    id: number;
    name: String;
    profilePhoto?: string;
    description?: string;
    hidden: boolean;
    skills: Skill[];
    fields: Field[];
} 

export interface Skill {
    id: number;
    name: string;
}

export interface Field{
    id: number;
    name: string;
}