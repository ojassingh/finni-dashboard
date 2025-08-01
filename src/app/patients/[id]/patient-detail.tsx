"use client"

import { use } from "react";
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { User, Mail, MapPin, Calendar, Phone, Activity, AlertCircle } from "lucide-react"
import { Patient } from "@/types";
import { calculateAge } from "@/utils/get-age";
import { getStatusColor, getStatusIcon } from "@/utils/get-status";

interface PatientDetailProps {
  patientPromise: Promise<Patient>;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function PatientDetail({ patientPromise }: PatientDetailProps) {
  const patientData = use(patientPromise);
  
  if (!patientData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h3 className="text-lg font-medium">Patient not found</h3>
          <p>The requested patient could not be found.</p>
        </div>
      </div>
    );
  }

  const fullName = [patientData.firstName, patientData.middleName, patientData.lastName].filter(Boolean).join(' ').trim()
  const age = patientData.dateOfBirth ? calculateAge(patientData.dateOfBirth) : null

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardContent className="">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex h-16 w-16 bg-background items-center justify-center rounded-full">
                <User className="h-8 w-8" />
              </div>
              <div className="grid gap-1">
                <h2 className="text-xl font-medium tracking-tight">{fullName || "Unknown Patient"}</h2>
                <p>Patient ID: #{patientData.id || "N/A"}</p>
                <div className=" flex items-center space-x-4 text-sm">
                  {age !== null ? (
                    <>
                      <span className="flex items-center">
                        <Calendar className="mr-1 h-4 w-4" />
                        {age} years old
                      </span>
                      <span>•</span>
                      <span>Born {formatDate(patientData.dateOfBirth)}</span>
                    </>
                  ) : (
                    <span>Date of birth not available</span>
                  )}
                </div>
              </div>
            </div>
            <Badge variant="outline" className="gap-2">
              <span className={getStatusColor(patientData.status)}>{getStatusIcon(patientData.status)}</span>
              {patientData.status || "Unknown"}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" className="w-full justify-start">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Appointment
          </Button>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Mail className="mr-2 h-5 w-5" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Email</label>
              <p className="mt-1">{patientData.email || "Not provided"}</p>
            </div>
            <div>
              <label className="text-sm font-medium">Phone</label>
              <p className="mt-1">{patientData.phone || "Not provided"}</p>
            </div>
          </div>
          <Separator />
          <div>
            <label className="text-sm font-medium">Address</label>
            <div className="mt-1 flex items-start">
              <MapPin className="mr-2 mt-0.5 h-4 w-4" />
              <div>
                {patientData.street || patientData.city || patientData.state || patientData.zip ? (
                  <>
                    <p>{patientData.street || "Street not provided"}</p>
                    <p>
                      {patientData.city || "City"}, {patientData.state || "State"} {patientData.zip || "ZIP"}
                    </p>
                  </>
                ) : (
                  <p>Address not provided</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Phone className="mr-2 h-5 w-5" />
            Emergency Contact
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {patientData.emergencyContact ? (
            <>
              <div>
                <label className="text-sm font-medium">Name</label>
                <p className="mt-1">{patientData.emergencyContact.name || "Not provided"}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Relationship</label>
                <p className="mt-1">{patientData.emergencyContact.relationship || "Not specified"}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Phone</label>
                <p className="mt-1">{patientData.emergencyContact.phone || "Not provided"}</p>
              </div>
            </>
          ) : (
              <p>No emergency contact information available</p>
          )}
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {patientData.recentActivity && patientData.recentActivity.length > 0 ? (
              patientData.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="h-2 w-2 rounded-full bg-secondary"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.procedure || "Unknown procedure"}</p>
                    <p className="text-xs">
                      {activity.date ? formatDate(activity.date) : "Date not available"}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>No recent activity recorded</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="mr-2 h-5 w-5" />
            Medical Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="text-sm font-medium mb-3 block">Medical Conditions</label>
            <div className="flex flex-wrap gap-2">
              {patientData.conditions && patientData.conditions.length > 0 ? (
                patientData.conditions.map((condition, index) => (
                  <Badge key={index} variant="outline" className="text-sm">
                    {condition || "Unknown condition"}
                  </Badge>
                ))
              ) : (
                <p>No medical conditions recorded</p>
              )}
            </div>
          </div>
          <Separator />
          <div>
            <label className="text-sm font-medium mb-3 flex items-center">
              <AlertCircle className="mr-2 h-4 w-4" />
              Allergies
            </label>
            <div className="space-y-2">
              {patientData.allergies && patientData.allergies.length > 0 ? (
                patientData.allergies.map((allergy, index) => (
                  <Badge key={index} variant="outline" className="text-sm">
                    {allergy || "Unknown allergy"}
                  </Badge>
                ))
              ) : (
                <p>No allergies recorded</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}