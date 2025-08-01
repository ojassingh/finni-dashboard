import { PatientStatus } from "@/types";
import { HelpCircle, XCircle, Loader, CircleCheck } from "lucide-react";

export const getStatusIcon = (status?: string) => {
  switch (status) {
    case PatientStatus.Active:
      return <CircleCheck className="h-4 w-4" />;
    case PatientStatus.Onboarding:
      return <Loader className="h-4 w-4 animate-spin" />;
    case PatientStatus.Inquiry:
      return <HelpCircle className="h-4 w-4" />;
    case PatientStatus.Churned:
      return <XCircle className="h-4 w-4" />;
    default:
      return <HelpCircle className="h-4 w-4" />;
  }
};