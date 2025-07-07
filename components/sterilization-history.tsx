"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Bot,
  Clock,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  Activity,
  FileText,
  Download,
  RefreshCw,
  Search,
} from "lucide-react"
import { useState } from "react"

const operationsData = [
  {
    id: 1,
    startTime: "10/06/2025 08:30",
    zone: "Operating Room A",
    duration: "25 min",
    status: "Completed",
    bacteria: "Staph. aureus",
    efficiency: 99.8,
  },
  {
    id: 2,
    startTime: "10/06/2025 10:00",
    zone: "Main corridor",
    duration: "15 min",
    status: "Completed",
    bacteria: "E.coli",
    efficiency: 99.5,
  },
  {
    id: 3,
    startTime: "11/06/2025 09:15",
    zone: "Bloc B (Surgery)",
    duration: "30 min",
    status: "Incident",
    bacteria: "Listeria monocyt",
    efficiency: 87.2,
  },
  {
    id: 4,
    startTime: "11/06/2025 14:20",
    zone: "Patient Room 205",
    duration: "20 min",
    status: "Completed",
    bacteria: "Pseudomonas",
    efficiency: 99.9,
  },
  {
    id: 5,
    startTime: "12/06/2025 07:45",
    zone: "Laboratory",
    duration: "35 min",
    status: "Completed",
    bacteria: "Staph. aureus",
    efficiency: 99.7,
  },
]

const chartData = [
  { time: 0, reduction: 0 },
  { time: 5, reduction: 2.5 },
  { time: 10, reduction: 4.2 },
  { time: 15, reduction: 5.8 },
  { time: 20, reduction: 6.9 },
  { time: 25, reduction: 7.5 },
  { time: 30, reduction: 7.8 },
]

export function SterilizationHistory() {
  const [selectedOperation, setSelectedOperation] = useState<number | null>(null)
  const [filterStatus, setFilterStatus] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [showDetailsModal, setShowDetailsModal] = useState(false)

  const filteredOperations = operationsData.filter((operation) => {
    const matchesStatus = filterStatus === "all" || operation.status.toLowerCase() === filterStatus
    const matchesSearch =
      operation.zone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      operation.bacteria.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const completedOperations = operationsData.filter((op) => op.status === "Completed").length
  const incidentOperations = operationsData.filter((op) => op.status === "Incident").length
  const averageDuration = Math.round(
    operationsData.reduce((acc, op) => acc + Number.parseInt(op.duration), 0) / operationsData.length,
  )

  const getStatusIcon = (status: string) => {
    return status === "Completed" ? (
      <CheckCircle className="w-4 h-4 text-green-600" />
    ) : (
      <AlertTriangle className="w-4 h-4 text-orange-600" />
    )
  }

  const getStatusBadge = (status: string) => {
    return status === "Completed" ? (
      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
        <CheckCircle className="w-3 h-3 mr-1" />
        Completed
      </Badge>
    ) : (
      <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">
        <AlertTriangle className="w-3 h-3 mr-1" />
        Incident
      </Badge>
    )
  }

  return (
    <div className="p-6 space-y-6 bg-teal-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-teal-800">Sterilization History</h1>
        <div className="flex gap-2">
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Participant</Badge>
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Connected</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Robot Info */}
        <div className="space-y-6">
          <Card className="bg-teal-800 text-white">
            <CardContent className="p-6 text-center">
              <div className="w-24 h-32 mx-auto mb-4 bg-teal-700 rounded-lg flex items-center justify-center">
                <Bot className="w-12 h-12 text-teal-200" />
              </div>
              <h2 className="text-lg font-bold mb-2">S4-CDZ12RR</h2>
              <p className="text-teal-200 text-sm mb-4">Robot de désinfection autonome</p>
              <div className="flex items-center justify-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>82%</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>53 min/h</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Active</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Columns - Specifications and Activity */}
        <div className="lg:col-span-2 space-y-6">
          {/* Specifications */}
          <Card>
            <CardHeader>
              <CardTitle>Specifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-blue-100 p-4 rounded-lg text-center">
                  <div className="text-blue-600 text-sm mb-1">Total Operations</div>
                  <div className="text-2xl font-bold text-blue-800">{operationsData.length}</div>
                  <FileText className="w-4 h-4 text-blue-600 mx-auto mt-1" />
                </div>
                <div className="bg-green-100 p-4 rounded-lg text-center">
                  <div className="text-green-600 text-sm mb-1">Complete</div>
                  <div className="text-2xl font-bold text-green-800">{completedOperations}</div>
                  <CheckCircle className="w-4 h-4 text-green-600 mx-auto mt-1" />
                </div>
                <div className="bg-orange-100 p-4 rounded-lg text-center">
                  <div className="text-orange-600 text-sm mb-1">Incidents</div>
                  <div className="text-2xl font-bold text-orange-800">{incidentOperations}</div>
                  <AlertTriangle className="w-4 h-4 text-orange-600 mx-auto mt-1" />
                </div>
                <div className="bg-purple-100 p-4 rounded-lg text-center">
                  <div className="text-purple-600 text-sm mb-1">Cycle Moyenne</div>
                  <div className="text-2xl font-bold text-purple-800">{averageDuration} min</div>
                  <BarChart3 className="w-4 h-4 text-purple-600 mx-auto mt-1" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity History */}
          <Card>
            <CardHeader>
              <CardTitle>Activity History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="justify-start bg-teal-100 text-teal-800 hover:bg-teal-200">
                  <Activity className="w-4 h-4 mr-2" />
                  Bacteria
                  <span className="ml-auto text-sm">Staph. aureus</span>
                </Button>
                <Button variant="outline" className="justify-start bg-blue-100 text-blue-800 hover:bg-blue-200">
                  <FileText className="w-4 h-4 mr-2" />
                  Log
                  <span className="ml-auto text-sm">Log 4</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Operations Journal */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Journal des Opérations</CardTitle>
            <div className="flex gap-2">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-gray-500" />
                <Input
                  placeholder="Search operations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-48"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="incident">Incident</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium text-gray-600">N°</th>
                  <th className="text-left p-3 font-medium text-gray-600">Start/Time</th>
                  <th className="text-left p-3 font-medium text-gray-600">Zone</th>
                  <th className="text-left p-3 font-medium text-gray-600">Duration</th>
                  <th className="text-left p-3 font-medium text-gray-600">Statut</th>
                  <th className="text-left p-3 font-medium text-gray-600">Bacteria</th>
                  <th className="text-left p-3 font-medium text-gray-600">Efficiency</th>
                </tr>
              </thead>
              <tbody>
                {filteredOperations.map((operation) => (
                  <tr
                    key={operation.id}
                    className="border-b hover:bg-gray-50 cursor-pointer"
                    onClick={() => {
                      setSelectedOperation(operation.id)
                      setShowDetailsModal(true)
                    }}
                  >
                    <td className="p-3 font-medium">{operation.id}</td>
                    <td className="p-3 text-sm">{operation.startTime}</td>
                    <td className="p-3 text-sm">{operation.zone}</td>
                    <td className="p-3 text-sm">{operation.duration}</td>
                    <td className="p-3">{getStatusBadge(operation.status)}</td>
                    <td className="p-3 text-sm">{operation.bacteria}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Progress value={operation.efficiency} className="w-16 h-2" />
                        <span className="text-sm font-medium">{operation.efficiency}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Bacteria Reduction Curve */}
      <Card>
        <CardHeader>
          <CardTitle>Bacteria reduction curve</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-white p-6 rounded-lg border">
            <div className="h-64 relative">
              <div className="absolute inset-0 flex items-end justify-center">
                <svg viewBox="0 0 400 200" className="w-full h-full">
                  {/* Grid lines */}
                  <defs>
                    <pattern id="grid" width="40" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />

                  {/* Axes */}
                  <line x1="40" y1="180" x2="380" y2="180" stroke="#374151" strokeWidth="2" />
                  <line x1="40" y1="20" x2="40" y2="180" stroke="#374151" strokeWidth="2" />

                  {/* Curve */}
                  <path
                    d="M 40 180 Q 100 160 160 80 Q 220 40 280 30 Q 340 25 380 25"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                  />

                  {/* Data points */}
                  {chartData.map((point, index) => (
                    <circle
                      key={index}
                      cx={40 + (point.time / 30) * 340}
                      cy={180 - (point.reduction / 8) * 160}
                      r="4"
                      fill="#10b981"
                    />
                  ))}

                  {/* Labels */}
                  <text x="210" y="195" textAnchor="middle" className="text-xs fill-gray-600">
                    Time (minutes)
                  </text>
                  <text
                    x="25"
                    y="100"
                    textAnchor="middle"
                    className="text-xs fill-gray-600"
                    transform="rotate(-90 25 100)"
                  >
                    Log Reduction
                  </text>
                </svg>
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>0</span>
              <span>5</span>
              <span>10</span>
              <span>15</span>
              <span>20</span>
              <span>25</span>
              <span>30</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Operation Details Modal */}
      <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Operation Details #{selectedOperation}</DialogTitle>
          </DialogHeader>
          {selectedOperation && (
            <div className="space-y-4">
              {(() => {
                const operation = operationsData.find((op) => op.id === selectedOperation)
                if (!operation) return null
                return (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Start Time</Label>
                        <p className="font-medium">{operation.startTime}</p>
                      </div>
                      <div>
                        <Label>Duration</Label>
                        <p className="font-medium">{operation.duration}</p>
                      </div>
                      <div>
                        <Label>Zone</Label>
                        <p className="font-medium">{operation.zone}</p>
                      </div>
                      <div>
                        <Label>Status</Label>
                        <div className="mt-1">{getStatusBadge(operation.status)}</div>
                      </div>
                      <div>
                        <Label>Bacteria Detected</Label>
                        <p className="font-medium">{operation.bacteria}</p>
                      </div>
                      <div>
                        <Label>Efficiency</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <Progress value={operation.efficiency} className="flex-1" />
                          <span className="font-medium">{operation.efficiency}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="pt-4 border-t">
                      <Label>Additional Information</Label>
                      <p className="text-sm text-gray-600 mt-1">
                        {operation.status === "Incident"
                          ? "Sterilization process was interrupted due to sensor malfunction. Manual intervention required."
                          : "Sterilization completed successfully with optimal bacteria reduction achieved."}
                      </p>
                    </div>
                  </>
                )
              })()}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
