import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { User, Mail, MapPin, Calendar, Phone, Edit, FileText, Activity, AlertCircle } from "lucide-react"

// Sample patient data for UI demonstration
const patientData = {
  id: 1,
  firstName: "John",
  middleName: "Doe",
  lastName: "Smith",
  dateOfBirth: "1990-01-01",
  status: "Active" as const,
  email: "john.smith@example.com",
  phone: "(555) 123-4567",
  street: "123 Main St",
  city: "Anytown",
  state: "CA",
  zip: "12345",
  conditions: ["High blood pressure", "Diabetes"],
  allergies: ["Penicillin", "Shellfish"],
  emergencyContact: {
    name: "Jane Smith",
    relationship: "Spouse",
    phone: "(555) 987-6543",
  },
  recentActivity: [
    {
      procedure: "Annual checkup completed",
      date: "2024-01-15"
    },
    {
      procedure: "Blood pressure medication adjusted", 
      date: "2024-01-08"
    },
    {
      procedure: "Lab results reviewed",
      date: "2024-01-01"
    }
  ]
}

function calculateAge(dateOfBirth: string): number {
  const today = new Date()
  const birthDate = new Date(dateOfBirth)
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }

  return age
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default function PatientPage() {
  const fullName = `${patientData.firstName} ${patientData.middleName} ${patientData.lastName}`.replace(/\s+/g, ' ').trim()
  const age = calculateAge(patientData.dateOfBirth)

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Patient Dashboard</h1>
            <p className="text-gray-600">Comprehensive patient information and medical records</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardContent className="">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                    <User className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{fullName}</h2>
                    <p className="text-gray-600">Patient ID: #{patientData.id.toString().padStart(6, "0")}</p>
                    <div className="mt-2 flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Calendar className="mr-1 h-4 w-4" />
                        {age} years old
                      </span>
                      <span>•</span>
                      <span>Born {formatDate(patientData.dateOfBirth)}</span>
                    </div>
                  </div>
                </div>
                <Badge variant={patientData.status === "Active" ? "default" : "secondary"} className="text-sm">
                  {patientData.status}
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
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <p className="mt-1 text-gray-900">{patientData.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Phone</label>
                  <p className="mt-1 text-gray-900">{patientData.phone}</p>
                </div>
              </div>
              <Separator />
              <div>
                <label className="text-sm font-medium text-gray-700">Address</label>
                <div className="mt-1 flex items-start">
                  <MapPin className="mr-2 mt-0.5 h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-gray-900">{patientData.street}</p>
                    <p className="text-gray-900">
                      {patientData.city}, {patientData.state} {patientData.zip}
                    </p>
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
              <div>
                <label className="text-sm font-medium text-gray-700">Name</label>
                <p className="mt-1 text-gray-900">{patientData.emergencyContact.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Relationship</label>
                <p className="mt-1 text-gray-900">{patientData.emergencyContact.relationship}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Phone</label>
                <p className="mt-1 text-gray-900">{patientData.emergencyContact.phone}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patientData.recentActivity.length > 0 ? (
                  patientData.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.procedure}</p>
                        <p className="text-xs text-gray-500">{formatDate(activity.date)}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No recent activity recorded</p>
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
                <label className="text-sm font-medium text-gray-700 mb-3 block">Medical Conditions</label>
                <div className="flex flex-wrap gap-2">
                  {patientData.conditions.length > 0 ? (
                    patientData.conditions.map((condition, index) => (
                      <Badge key={index} variant="outline" className="text-sm">
                        {condition}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No medical conditions recorded</p>
                  )}
                </div>
              </div>
              <Separator />
              <div>
                <label className="text-sm font-medium text-gray-700 mb-3 block flex items-center">
                  <AlertCircle className="mr-2 h-4 w-4 text-red-500" />
                  Allergies
                </label>
                <div className="space-y-2">
                  {patientData.allergies.length > 0 ? (
                    patientData.allergies.map((allergy, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="h-2 w-2 rounded-full bg-red-500"></div>
                        <span className="text-sm font-medium text-red-700">{allergy}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No allergies recorded</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}