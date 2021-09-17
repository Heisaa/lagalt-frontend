export interface Portfolio {
    portfolioId: number;
    userId:	string;
    title?: string;
    timeSpanStart: Date;
    timeSpanEnd: Date;
    urlReference?: string;
    description: string;
} 