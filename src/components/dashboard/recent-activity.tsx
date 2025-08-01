"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Clock,
  FileText,
  Calendar,
  Phone,
  MessageSquare,
} from "lucide-react";

const recentActivities = [
  {
    id: 1,
    patientName: "Sarah Johnson",
    description: "Follow-up consultation",
    time: "2 hours ago",
    status: "completed",
    icon: Calendar,
  },
  {
    id: 2,
    patientName: "Michael Chen",
    description: "Added new test results",
    time: "4 hours ago",
    status: "pending",
    icon: FileText,
  },
  {
    id: 3,
    patientName: "Emily Rodriguez",
    description: "Initial assessment call",
    time: "6 hours ago",
    icon: Phone,
  },
  {
    id: 4,
    patientName: "David Thompson",
    activity: "Message Sent",
    description: "Prescription refill request",
    time: "1 day ago",
    status: "completed",
    avatar: "/avatars/david.jpg",
    icon: MessageSquare,
  },
];

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Recent Activity
        </CardTitle>
        <CardDescription>
          Latest patient interactions and updates
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentActivities.map((activity) => {
              return (
                <TableRow key={activity.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={activity.avatar}
                          alt={activity.patientName}
                        />
                        <AvatarFallback>
                          {activity.patientName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">
                          {activity.patientName}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {activity.description}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {activity.time}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
