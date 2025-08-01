import { Suspense } from "react";
import { getPatient } from "@/actions/patients";
import { PatientDetail } from "./patient-detail";
import { PatientDetailSkeleton } from "./patient-detail-skeleton";

interface PatientPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PatientPage({ params }: PatientPageProps) {
  const { id } = await params
  const patientPromise = getPatient(parseInt(id))
  
  return (
    <div className="min-h-screen p-10">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl tracking-tighter font-medium">Patient Info</h1>
            <p>Comprehensive patient information and medical records</p>
          </div>
        </div>

        <Suspense fallback={<PatientDetailSkeleton />}>
          <PatientDetail patientPromise={patientPromise} />
        </Suspense>
      </div>
    </div>
  );
}