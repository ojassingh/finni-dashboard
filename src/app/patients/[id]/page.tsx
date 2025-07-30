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
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl tracking-tighter font-medium text-gray-900">Patient Info</h1>
            <p className="text-gray-600">Comprehensive patient information and medical records</p>
          </div>
        </div>

        <Suspense fallback={<PatientDetailSkeleton />}>
          <PatientDetail patientPromise={patientPromise} />
        </Suspense>
      </div>
    </div>
  );
}