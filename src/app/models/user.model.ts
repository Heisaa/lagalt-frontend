
export interface User {
    userId: string;
    userName: String;
    profilePhoto?: string;
    description?: string;
    hidden: boolean;
    skills: Skill[];
    fields: Field[];
    portfolios: Portfolio[];
} 

export interface Skill {
    id: number;
    name: string;
}

export interface Field{
    id: number;
    name: string;
}

export interface Portfolio {
    portfolioId: number;
    userId: string;
    title: string;
    timeSpanStart: Date;
    timeSpanEnd: Date;
    urlReference: string;
    description: string;
}
