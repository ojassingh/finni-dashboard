
export enum PatientStatus {
  Inquiry = "Inquiry",
  Onboarding = "Onboarding",
  Active = "Active",
  Churned = "Churned",
}
export interface RecentActivity {
  procedure?: string;
  date?: string;
}

export interface EmergencyContact {
  name?: string;
  relationship?: string;
  phone?: string;
}

export interface Patient {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  status?: PatientStatus;
  conditions?: string[];
  allergies?: string[];
  emergencyContact?: EmergencyContact;
  recentActivity?: RecentActivity[];
  createdAt?: string;
}

export interface PatientUpdateDTO {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  dateOfBirth?: string;
  email?: string;
  phone?: string;
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  status?: PatientStatus;
  conditions?: string[];
  allergies?: string[];
  emergencyContact?: EmergencyContact;
  recentActivity?: RecentActivity[];
}

export interface PatientsFilterDTO {
  name?: string;
  city?: string;
  state?: string;
  status?: PatientStatus;
  condition?: string;
  allergy?: string;
  ageMin?: number;
  ageMax?: number;
  createdAt?: string;
}