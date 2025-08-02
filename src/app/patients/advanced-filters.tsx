"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { X, Filter } from "lucide-react"
import { PatientStatus } from "@/types"



interface AdvancedFiltersProps {
  filters: {
    ageMin?: number
    ageMax?: number
    state?: string
    status?: string
    conditions?: string[]
  }
  onFiltersChange: (filters: {
    ageMin?: number
    ageMax?: number
    state?: string
    status?: string
    conditions?: string[]
  }) => void
}

const US_STATES = [
  "NY", "CA", "TX", "FL", "IL"
]

const COMMON_CONDITIONS = [
  "Hypertension", "Diabetes", "Asthma", "Heart Disease", "Arthritis",
  "Depression", "Anxiety", "Obesity", "High Cholesterol", "Cancer",
  "Stroke", "Kidney Disease", "Liver Disease", "COPD", "Osteoporosis"
]

export function AdvancedFilters({ filters, onFiltersChange }: AdvancedFiltersProps) {
  const [localFilters, setLocalFilters] = React.useState(filters)
  const [selectedConditions, setSelectedConditions] = React.useState<string[]>(filters.conditions || [])

  const handleFilterChange = (key: string, value: string | number | string[] | number[] | undefined) => {
    const newFilters = { ...localFilters, [key]: value }
    setLocalFilters(newFilters)
  }

  const handleConditionToggle = (condition: string) => {
    const newConditions = selectedConditions.includes(condition)
      ? selectedConditions.filter(c => c !== condition)
      : [...selectedConditions, condition]
    
    setSelectedConditions(newConditions)
    handleFilterChange('conditions', newConditions)
  }

  const applyFilters = () => {
    onFiltersChange(localFilters)
  }

  const clearFilters = () => {
    const clearedFilters = {
      ageMin: undefined,
      ageMax: undefined,
      state: undefined,
      status: undefined,
      conditions: []
    }
    setLocalFilters(clearedFilters)
    setSelectedConditions([])
    onFiltersChange(clearedFilters)
  }

  const getActiveFilterCount = () => {
    let count = 0
    if (filters.ageMin !== undefined) count++
    if (filters.ageMax !== undefined) count++
    if (filters.state) count++
    if (filters.status) count++
    if (filters.conditions && filters.conditions.length > 0) count++
    return count
  }

  return (
    <div className="flex items-center gap-2">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Advanced Filters
            {getActiveFilterCount() > 0 && (
              <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 text-xs">
                {getActiveFilterCount()}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent >
          <SheetHeader>
            <SheetTitle>Advanced Filters</SheetTitle>
            <SheetDescription>
              Filter patients by age, state, and medical conditions
            </SheetDescription>
          </SheetHeader>
          
          <div className="space-y-6 mt-6 px-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="age-min">Age Range</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    id="age-min"
                    type="number"
                    placeholder="Min age"
                    value={localFilters.ageMin || ''}
                    onChange={(e) => handleFilterChange('ageMin', e.target.value ? Number(e.target.value) : undefined)}
                  />
                  <Input
                    type="number"
                    placeholder="Max age"
                    value={localFilters.ageMax || ''}
                    onChange={(e) => handleFilterChange('ageMax', e.target.value ? Number(e.target.value) : undefined)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="state">State</Label>
                <Select
                  value={localFilters.state || 'all'}
                  onValueChange={(value) => handleFilterChange('state', value === 'all' ? undefined : value)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All States</SelectItem>
                    {US_STATES.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={localFilters.status || 'all'}
                  onValueChange={(value) => handleFilterChange('status', value === 'all' ? undefined : value)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    {Object.values(PatientStatus).map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Medical Conditions</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {COMMON_CONDITIONS.map((condition) => (
                    <Badge
                      key={condition}
                      variant={selectedConditions.includes(condition) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => handleConditionToggle(condition)}
                    >
                      {condition}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t">
              <Button onClick={applyFilters} className="flex-1">
                Apply Filters
              </Button>
              <Button variant="outline" onClick={clearFilters}>
                Clear All
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {getActiveFilterCount() > 0 && (
        <div className="flex flex-wrap gap-1">
          {filters.ageMin !== undefined && (
            <Badge variant="secondary" className="gap-1">
              Age ≥ {filters.ageMin}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => handleFilterChange('ageMin', undefined)}
              />
            </Badge>
          )}
          {filters.ageMax !== undefined && (
            <Badge variant="secondary" className="gap-1">
              Age ≤ {filters.ageMax}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => handleFilterChange('ageMax', undefined)}
              />
            </Badge>
          )}
          {filters.state && (
            <Badge variant="secondary" className="gap-1">
              State: {filters.state}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => handleFilterChange('state', undefined)}
              />
            </Badge>
          )}
          {filters.status && (
            <Badge variant="secondary" className="gap-1">
              Status: {filters.status}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => handleFilterChange('status', undefined)}
              />
            </Badge>
          )}
          {filters.conditions?.map((condition) => (
            <Badge key={condition} variant="secondary" className="gap-1">
              {condition}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => {
                  const newConditions = filters.conditions?.filter(c => c !== condition) || []
                  handleFilterChange('conditions', newConditions)
                  setSelectedConditions(newConditions)
                }}
              />
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
} 