import { getPatients } from "@/actions/patients";
import { PatientsTable } from "./patients-table";
import { AddPatientDialog } from "./add-patient-dialog";

export default async function Page() {
  const patientsPromise = getPatients();
  return (
    <div className="p-10">
      <div className="flex mb-4 w-full justify-between items-start">
        <div>
          <h1 className="text-2xl tracking-tighter font-medium">
            Patients Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Here&apos;s a list of your patients.
          </p>
        </div>
        <AddPatientDialog />
      </div>
      <PatientsTable patientsPromise={patientsPromise} />
    </div>
  );
}
