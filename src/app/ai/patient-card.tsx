import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Calendar, ArrowUpRight } from "lucide-react";
import { Patient } from "@/types";
import Link from "next/link";
import { calculateAge } from "@/utils/get-age";

export function PatientCard({ patient }: { patient: Patient }) {

  return (
    <Link target="_blank" href={`/patients/${patient.id}`}>
      <Card className="w-full mb-3 hover:shadow-md transition-shadow">
        <CardContent className="px-4">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium tracking-tighter">
                  {patient.firstName} {patient.middleName} {patient.lastName}
                </h3>
                <ArrowUpRight className="size-4" />
              </div>
            </div>
            {patient.status && (
              <Badge className="text-xs">
                {patient.status}
              </Badge>
            )}
          </div>

          <div className="grid mt-4 grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 text-sm mt-1">
              <Calendar className="h-4 w-4" />
              <span>Age {calculateAge(patient.dateOfBirth)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>{patient.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>{patient.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>
                {patient.city}, {patient.state} {patient.zip}
              </span>
            </div>
          </div>

          {(patient.conditions?.length || patient.allergies?.length) && (
            <div className="mt-3 space-y-2">
              {patient.conditions && patient.conditions.length > 0 && (
                <div>
                  <span className="text-xs font-medium">Conditions:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {patient.conditions.map((condition, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {condition}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
