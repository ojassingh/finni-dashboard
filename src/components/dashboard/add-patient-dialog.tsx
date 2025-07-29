import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusIcon } from "lucide-react";

export function AddPatientDialog() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button>
            <PlusIcon className="w-4 h-4" />
            Add Patient
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Patient</DialogTitle>
            <DialogDescription>
              Add a new patient to the system.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-3">
                <Label htmlFor="name-1">First Name</Label>
                <Input placeholder="John" id="name-1" name="name" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="username-1">Middle Name</Label>
                <Input placeholder="Doe" id="username-1" name="username" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="name-1">Last Name</Label>
                <Input placeholder="Smith" id="name-1" name="name" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-3">
                <Label htmlFor="name-1">Date of Birth</Label>
                <Input placeholder="1990-01-01" id="name-1" name="name" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="name-1">Status</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                </Select>
              </div>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="name-1">Address</Label>
              <Input
                placeholder="123 Main St, Anytown, USA"
                id="name-1"
                name="name"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
