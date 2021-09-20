export interface Application {
    userId: string;
    projectId: number;
    motivation: string;
    approved: boolean;
    apprvedByOwnerId: number | null;
}