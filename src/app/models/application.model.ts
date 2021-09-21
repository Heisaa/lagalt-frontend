import { User } from "./user.model";

export interface Application {
    userId: string;
    projectId: number;
    motivation: string;
    approved: boolean;
    approvedByOwnerId: number | null;
}

export interface ApplicationGet {
    applicationId: number;
    userId: string;
    projectId: number;
    motivation: string;
    approved: boolean;
    approvedByOwnerId: number | null;
}

export interface ApplicationDisplay {
    applicationId: number;
    userId: string;
    projectId: number;
    motivation: string;
    approved: boolean;
    approvedByOwnerId: number | null;
    user: User | null;
}