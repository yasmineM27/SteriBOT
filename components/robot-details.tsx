"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Bot, Battery, Wifi, Activity, Settings, CalendarIcon, Zap, Ruler, Edit } from "lucide-react"
import { useState } from "react"

const timeSlots = [
  "7:00 AM",
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
]

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const dates = [11, 12, 13, 14, 15, 16, 17]

const scheduledTasks = [
  { day: 1, time: 2, duration: 2, type: "sterilization", room: "Operating Room A" },
  { day: 1, time: 3, duration: 1, type: "maintenance", room: "Robot XDSS5DL" },
  { day: 2, time: 1, duration: 3, type: "sterilization", room: "Robot XDSS5DL" },
  { day: 3, time: 4, duration: 1, type: "maintenance", room: "Robot XDSS5DL" },
  { day: 4, time: 2, duration: 2, type: "sterilization", room: "Robot XDSS5DL" },
  { day: 6, time: 5, duration: 1, type: "maintenance", room: "Robot XDSS5DL" },
]

export function RobotDetails() {
  const [showCalendar, setShowCalendar] = useState(false)
  const [showPlanningModal, setShowPlanningModal] = useState(false)

  return (
    <div className="p-6 space-y-6 bg-teal-50 min-h-screen">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-teal-800">Robot Details</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowCalendar(!showCalendar)}
            className="text-teal-600 border-teal-600 hover:bg-teal-50"
          >
            <CalendarIcon className="w-4 h-4 mr-2" />
            {showCalendar ? "Hide Calendar" : "Show Calendar"}
          </Button>
          <Button className="bg-teal-600 hover:bg-teal-700">
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </div>
      </div>

      {showCalendar ? (
        // Calendar View
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold">June 2025</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Day
                </Button>
                <Button variant="outline" size="sm" className="bg-teal-600 text-white">
                  Week
                </Button>
                <Button variant="outline" size="sm">
                  Month
                </Button>
              </div>
            </div>
            <Button onClick={() => setShowPlanningModal(true)} className="bg-teal-600 hover:bg-teal-700">
              Create new planning
            </Button>
          </div>

          <Card className=" text-white" style={{ background: 'linear-gradient(90deg, #0A3F4C, #0C6980)' }}>
            <CardContent className="p-6">
              <div className="grid grid-cols-8 gap-4">
                <div className="text-center">
                  <div className="text-sm text-teal-200 mb-2">Time</div>
                </div>
                {weekDays.map((day, index) => (
                  <div key={day} className="text-center">
                    <div className="text-sm text-teal-200">{day}</div>
                    <div className="text-lg font-bold">{dates[index]}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-2">
                {timeSlots.map((time, timeIndex) => (
                  <div key={time} className="grid grid-cols-8 gap-4 h-16">
                    <div className="flex items-center text-sm text-teal-200">{time}</div>
                    {Array.from({ length: 7 }).map((_, dayIndex) => {
                      const task = scheduledTasks.find((t) => t.day === dayIndex && t.time === timeIndex)
                      return (
                        <div key={dayIndex} className="relative">
                          {task && (
                            <div
                              className={`absolute inset-0 rounded p-2 text-xs ${
                                task.type === "sterilization" ? "bg-orange-500" : "bg-purple-500"
                              }`}
                              style={{ height: `${task.duration * 64}px` }}
                            >
                              <div className="font-medium">{task.room}</div>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Planning Modal */}
          <Dialog open={showPlanningModal} onOpenChange={setShowPlanningModal}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Sterilization Planning</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="planner">Sterilization planner</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select planner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="replay">Replay</SelectItem>
                      <SelectItem value="manual">Manual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input type="date" defaultValue="2025-09-14" />
                  </div>
                  <div>
                    <Label htmlFor="time">Time</Label>
                    <Input type="time" defaultValue="09:00" />
                  </div>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button variant="outline" onClick={() => setShowPlanningModal(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button className="flex-1 bg-teal-600 hover:bg-teal-700">Start sterilization</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        // Robot Details View
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Robot Image and Basic Info */}
          <div className="space-y-6">
            <Card className=" text-white" style={{ background: 'linear-gradient(90deg, #0A3F4C, #0C6980)' }}>
              <CardContent className="p-6 text-center">
                <div className="w-32 h-32 mx-auto mb-4 bg-teal-700 rounded-lg flex items-center justify-center">
                  <Bot className="w-16 h-16 text-teal-200" />
                </div>
                <h2 className="text-xl font-bold mb-2">S4-CDZ120R</h2>
                <p className="text-teal-200 text-sm mb-4">Sterilization Robot Model</p>
                <div className="flex items-center justify-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Online</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Battery className="w-4 h-4" />
                    <span>85%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Wifi className="w-4 h-4" />
                    <span>Strong</span>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-teal-600 hover:bg-teal-500">Start Sterilization</Button>
              </CardContent>
            </Card>

            {/* Sensors & Connectivity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Sensors & Connectivity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-green-100 p-3 rounded-lg text-center">
                    <div className="text-green-600 font-semibold text-sm">LIDAR</div>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg text-center">
                    <div className="text-blue-600 font-semibold text-sm">GPS</div>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-lg text-center">
                    <div className="text-purple-600 font-semibold text-sm">Camera</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Middle Column - Specifications and Activity */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Specifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <div className="text-green-600 text-sm">Efficiency</div>
                    <div className="font-bold">4 rooms/h</div>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <div className="text-purple-600 text-sm">Status</div>
                    <div className="font-bold">Active</div>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <div className="text-blue-600 text-sm">Coverage</div>
                    <div className="font-bold">99.9%</div>
                  </div>
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <div className="text-orange-600 text-sm">UV-C</div>
                    <div className="font-bold">99.1%</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Activity History</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-teal-100 p-3 rounded-lg">
                    <div className="text-teal-600 text-sm">Last cycle</div>
                    <div className="font-bold">2h ago</div>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <div className="text-blue-600 text-sm">Total</div>
                    <div className="font-bold">127 cycles</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Dimensions & Physics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Ruler className="w-5 h-5" />
                  Dimensions & Physics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Weight</span>
                  <span className="font-medium">45 kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Height</span>
                  <span className="font-medium">120 cm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Length</span>
                  <span className="font-medium">70 cm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total weight</span>
                  <span className="font-medium">18 kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Volume</span>
                  <span className="font-medium">Pneumatic ABS-free</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Performance & Energy */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Performance & Energy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Battery</span>
                  <span className="font-medium">8500 mAh</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Autonomy</span>
                  <span className="font-medium">8h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Max speed</span>
                  <span className="font-medium">0.5 m/s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Consumption</span>
                  <span className="font-medium">200 mAh</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sterilization mode</span>
                  <span className="font-medium">UV + Spray</span>
                </div>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Battery Level</span>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">UV Lamp Health</span>
                    <span className="text-sm font-medium">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">System Temperature</span>
                    <span className="text-sm font-medium">42°C</span>
                  </div>
                  <Progress value={70} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Settings className="w-4 h-4 mr-2" />
                  System Settings
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Activity className="w-4 h-4 mr-2" />
                  Run Diagnostics
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  Schedule Maintenance
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
