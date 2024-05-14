export interface Job {
    jdUid: string;
    jdLink: string;
    jobDetailsFromCompany: string;
    maxJdSalary: number;
    minJdSalary: number | null;
    salaryCurrencyCode: string;
    location: string;
    minExp: number;
    maxExp: number;
    jobRole: string;
    companyName: string;
    logoUrl: string;
}

export interface FilterOptions {
    roles?: string[];
    noOfEmployees?: string;
    experience?: string;
    workFromOptions?: string[];
    minBasePay?: string;
    companyName?: string;
}