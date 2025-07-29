
export type PatientStatus = "Inquiry" | "Onboarding" | "Active" | "Churned";

export interface RecentActivity {
  procedure: string;
  date: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

export interface Patient {
  id: string;
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
  conditions: string[];
  allergies: string[];
  emergencyContact: EmergencyContact;
  recentActivity: RecentActivity[];
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