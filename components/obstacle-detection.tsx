"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Wifi,
  Battery,
  User,
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  RefreshCw,
  Settings,
  Bell,
  X,
} from "lucide-react"
import { useState } from "react"

const alertsData = [
  {
    id: 1,
    type: "connection",
    title: "Connection Status",
    status: "Disconnect",
    message: "Connection issue. On 2025-06-17 at 22:05.",
    description:
      "The robot experienced a connection interruption. Communication was lost, causing sterilization to pause until the connection was restored.",
    timestamp: "June 17, 2025 • 10:05 PM",
    severity: "warning",
    resolved: false,
    icon: Wifi,
  },
  {
    id: 2,
    type: "battery",
    title: "Charging Status",
    status: "Low battery",
    message: "On 2025-06-17 at 22:10.",
    description:
      "The robot paused sterilization due to low battery and began charging. Sterilization will resume automatically once charging is complete.",
    timestamp: "June 17, 2025 • 10:10 PM",
    severity: "error",
    resolved: false,
    icon: Battery,
  },
  {
    id: 3,
    type: "human",
    title: "Human Detection",
    status: "Alert",
    message: "On 2025-06-17 at 22:15.",
    description:
      "A person was detected within the sterilization area. For safety reasons, the sterilization process has been paused automatically. Please clear the area to resume.",
    timestamp: "June 17, 2025 • 10:15 PM",
    severity: "critical",
    resolved: false,
    icon: User,
  },
  {
    id: 4,
    type: "connection",
    title: "Connection Restored",
    status: "Connected",
    message: "Connection restored on 2025-06-17 at 22:20.",
    description:
      "Network connection has been successfully restored. Robot is now online and ready to resume operations.",
    timestamp: "June 17, 2025 • 10:20 PM",
    severity: "success",
    resolved: true,
    icon: Wifi,
  },
]

export function ObstacleDetection() {
  const [selectedAlert, setSelectedAlert] = useState<number | null>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [filterType, setFilterType] = useState("all")
  const [filterSeverity, setFilterSeverity] = useState("all")
  const [showResolveModal, setShowResolveModal] = useState(false)
  const [resolveNote, setResolveNote] = useState("")

  const filteredAlerts = alertsData.filter((alert) => {
    const matchesType = filterType === "all" || alert.type === filterType
    const matchesSeverity = filterSeverity === "all" || alert.severity === filterSeverity
    return matchesType && matchesSeverity
  })

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 border-red-200"
      case "error":
        return "bg-pink-100 border-pink-200"
      case "warning":
        return "bg-yellow-100 border-yellow-200"
      case "success":
        return "bg-green-100 border-green-200"
      default:
        return "bg-gray-100 border-gray-200"
    }
  }

  const getStatusBadge = (status: string, severity: string) => {
    const colors = {
      critical: "bg-red-500 text-white",
      error: "bg-pink-500 text-white",
      warning: "bg-orange-500 text-white",
      success: "bg-green-500 text-white",
    }

    return <Badge className={colors[severity as keyof typeof colors] || "bg-gray-500 text-white"}>{status}</Badge>
  }

  const handleResolveAlert = () => {
    console.log("Resolving alert with note:", resolveNote)
    setShowResolveModal(false)
    setResolveNote("")
  }

  return (
    <div className="p-6 space-y-6 bg-teal-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-teal-800">Obstacle detection</h1>
        <div className="flex gap-2">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="connection">Connection</SelectItem>
              <SelectItem value="battery">Battery</SelectItem>
              <SelectItem value="human">Human</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterSeverity} onValueChange={setFilterSeverity}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severity</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="error">Error</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="success">Success</SelectItem>
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

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-600 text-sm">Critical Alerts</p>
                <p className="text-2xl font-bold text-red-800">
                  {alertsData.filter((a) => a.severity === "critical" && !a.resolved).length}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-600 text-sm">Warnings</p>
                <p className="text-2xl font-bold text-orange-800">
                  {alertsData.filter((a) => a.severity === "warning" && !a.resolved).length}
                </p>
              </div>
              <Bell className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm">Resolved</p>
                <p className="text-2xl font-bold text-green-800">{alertsData.filter((a) => a.resolved).length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm">Total Alerts</p>
                <p className="text-2xl font-bold text-blue-800">{alertsData.length}</p>
              </div>
              <Settings className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => {
          const IconComponent = alert.icon
          return (
            <Card
              key={alert.id}
              className={`${getSeverityColor(alert.severity)} cursor-pointer hover:shadow-md transition-shadow ${
                alert.resolved ? "opacity-75" : ""
              }`}
              onClick={() => {
                setSelectedAlert(alert.id)
                setShowDetailsModal(true)
              }}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="p-2 bg-white rounded-lg">
                      <IconComponent className="w-6 h-6 text-teal-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-800">{alert.title}</h3>
                        {getStatusBadge(alert.status, alert.severity)}
                        {alert.resolved && (
                          <Badge className="bg-green-100 text-green-800">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Resolved
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-700 mb-2">{alert.message}</p>
                      <p className="text-gray-600 text-sm mb-3">{alert.description}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>{alert.timestamp}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {!alert.resolved && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedAlert(alert.id)
                          setShowResolveModal(true)
                        }}
                      >
                        Resolve
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation()
                        console.log("Dismiss alert", alert.id)
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Alert Details Modal */}
      <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Alert Details</DialogTitle>
          </DialogHeader>
          {selectedAlert && (
            <div className="space-y-4">
              {(() => {
                const alert = alertsData.find((a) => a.id === selectedAlert)
                if (!alert) return null
                const IconComponent = alert.icon
                return (
                  <>
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-teal-100 rounded-lg">
                        <IconComponent className="w-8 h-8 text-teal-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{alert.title}</h3>
                        <div className="flex gap-2 mt-1">
                          {getStatusBadge(alert.status, alert.severity)}
                          {alert.resolved && <Badge className="bg-green-100 text-green-800">Resolved</Badge>}
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Type</Label>
                        <p className="font-medium capitalize">{alert.type}</p>
                      </div>
                      <div>
                        <Label>Severity</Label>
                        <p className="font-medium capitalize">{alert.severity}</p>
                      </div>
                      <div>
                        <Label>Timestamp</Label>
                        <p className="font-medium">{alert.timestamp}</p>
                      </div>
                      <div>
                        <Label>Status</Label>
                        <p className="font-medium">{alert.resolved ? "Resolved" : "Active"}</p>
                      </div>
                    </div>
                    <div>
                      <Label>Description</Label>
                      <p className="text-gray-600 mt-1">{alert.description}</p>
                    </div>
                    <div className="pt-4 border-t">
                      <Label>Recommended Actions</Label>
                      <ul className="list-disc list-inside text-sm text-gray-600 mt-1 space-y-1">
                        {alert.type === "connection" && (
                          <>
                            <li>Check network connectivity</li>
                            <li>Verify router and access point status</li>
                            <li>Restart robot if connection persists</li>
                          </>
                        )}
                        {alert.type === "battery" && (
                          <>
                            <li>Allow robot to complete charging cycle</li>
                            <li>Check charging station functionality</li>
                            <li>Monitor battery health indicators</li>
                          </>
                        )}
                        {alert.type === "human" && (
                          <>
                            <li>Ensure area is clear of personnel</li>
                            <li>Check safety sensors functionality</li>
                            <li>Resume operation once area is secure</li>
                          </>
                        )}
                      </ul>
                    </div>
                  </>
                )
              })()}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Resolve Alert Modal */}
      <Dialog open={showResolveModal} onOpenChange={setShowResolveModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Resolve Alert</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="resolveNote">Resolution Notes</Label>
              <Textarea
                id="resolveNote"
                value={resolveNote}
                onChange={(e) => setResolveNote(e.target.value)}
                placeholder="Enter details about how this alert was resolved..."
                className="mt-1"
              />
            </div>
            <div className="flex gap-2 pt-4">
              <Button variant="outline" onClick={() => setShowResolveModal(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleResolveAlert} className="flex-1 bg-teal-600 hover:bg-teal-700">
                Mark as Resolved
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
