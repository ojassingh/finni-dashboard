
export type PatientStatus = "Inquiry" | "Onboarding" | "Active" | "Churned";

export interface Patient {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  status?: PatientStatus;
  conditions: string[];
}

export interface PatientUpdateDTO {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  dateOfBirth?: string;
  email?: string;
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  status?: PatientStatus;
  conditions?: string[];
}