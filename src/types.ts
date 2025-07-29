
export interface Patient {
  firstName: string;
  middleName?: string;
  lastName?: string;
  dateOfBirth?: string;
  address?: string;
  status?: string;
}

export interface PatientUpdateDTO {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  dateOfBirth?: string;
  address?: string;
  status?: string;
}