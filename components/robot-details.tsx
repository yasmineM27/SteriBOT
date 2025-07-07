"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Bot,
  Battery,
  Wifi,
  Activity,
  Settings,
  CalendarIcon,
  Zap,
  Ruler,
  Edit,
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  Clock,
  MapPin,
  User,
  Save,
} from "lucide-react"
import { useState } from "react"

const timeSlots = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, "0")
  return `${hour}:00`
})

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const scheduledTasks = [
  {
    id: 1,
    title: "Operating Room A Sterilization",
    date: "2025-06-11",
    time: "08:30",
    duration: 120,
    type: "sterilization",
    room: "Operating Room A",
    priority: "high",
    assignedTo: "Dr. Smith",
    notes: "Pre-surgery sterilization protocol",
    status: "scheduled",
  },
  {
    id: 2,
    title: "Robot Maintenance Check",
    date: "2025-06-11",
    time: "14:00",
    duration: 60,
    type: "maintenance",
    room: "Robot Station",
    priority: "medium",
    assignedTo: "Tech Team",
    notes: "Weekly maintenance routine",
    status: "scheduled",
  },
  {
    id: 3,
    title: "Main Corridor Cleaning",
    date: "2025-06-12",
    time: "07:00",
    duration: 180,
    type: "sterilization",
    room: "Main Corridor",
    priority: "medium",
    assignedTo: "Night Shift",
    notes: "Daily corridor sterilization",
    status: "completed",
  },
  {
    id: 4,
    title: "Emergency Room Sterilization",
    date: "2025-06-13",
    time: "16:00",
    duration: 90,
    type: "sterilization",
    room: "Emergency Room",
    priority: "high",
    assignedTo: "Dr. Johnson",
    notes: "Post-incident sterilization",
    status: "in-progress",
  },
]

export function RobotDetails() {
  const [showCalendar, setShowCalendar] = useState(false)
  const [showPlanningModal, setShowPlanningModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [calendarView, setCalendarView] = useState<"day" | "week" | "month" | "year">("week")
  const [currentDate, setCurrentDate] = useState(new Date(2025, 5, 11)) // June 11, 2025
  const [selectedTask, setSelectedTask] = useState<any>(null)
  const [newTask, setNewTask] = useState({
    title: "",
    date: "",
    time: "09:00",
    duration: 60,
    type: "sterilization",
    room: "",
    priority: "medium",
    assignedTo: "",
    notes: "",
  })

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    switch (calendarView) {
      case "day":
        newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1))
        break
      case "week":
        newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7))
        break
      case "month":
        newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1))
        break
      case "year":
        newDate.setFullYear(newDate.getFullYear() + (direction === "next" ? 1 : -1))
        break
    }
    setCurrentDate(newDate)
  }

  const getDateRange = () => {
    const start = new Date(currentDate)
    const end = new Date(currentDate)

    switch (calendarView) {
      case "day":
        return `${start.toLocaleDateString()}`
      case "week":
        start.setDate(start.getDate() - start.getDay() + 1)
        end.setDate(start.getDate() + 6)
        return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`
      case "month":
        return `${monthNames[start.getMonth()]} ${start.getFullYear()}`
      case "year":
        return `${start.getFullYear()}`
      default:
        return ""
    }
  }

  const getTasksForDate = (date: string) => {
    return scheduledTasks.filter((task) => task.date === date)
  }

  const getTaskColor = (type: string, status: string) => {
    if (status === "completed") return "bg-green-500"
    if (status === "in-progress") return "bg-blue-500"
    return type === "sterilization" ? "bg-orange-500" : "bg-purple-500"
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-100"
      case "medium":
        return "text-yellow-600 bg-yellow-100"
      case "low":
        return "text-green-600 bg-green-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const handleCreateTask = () => {
    console.log("Creating task:", newTask)
    setShowPlanningModal(false)
    setNewTask({
      title: "",
      date: "",
      time: "09:00",
      duration: 60,
      type: "sterilization",
      room: "",
      priority: "medium",
      assignedTo: "",
      notes: "",
    })
  }

  const handleEditTask = () => {
    console.log("Editing task:", selectedTask)
    setShowEditModal(false)
    setSelectedTask(null)
  }

  const handleDeleteTask = (taskId: number) => {
    console.log("Deleting task:", taskId)
  }

  const renderCalendarContent = () => {
    switch (calendarView) {
      case "day":
        return renderDayView()
      case "week":
        return renderWeekView()
      case "month":
        return renderMonthView()
      case "year":
        return renderYearView()
      default:
        return renderWeekView()
    }
  }

  const renderDayView = () => (
    <div className="space-y-2">
      {timeSlots.map((time) => {
        const tasksAtTime = scheduledTasks.filter(
          (task) => task.date === currentDate.toISOString().split("T")[0] && task.time === time,
        )
        return (
          <div key={time} className="grid grid-cols-12 gap-2 h-16 border-b border-teal-700">
            <div className="col-span-2 flex items-center text-sm text-teal-200">{time}</div>
            <div className="col-span-10 relative">
              {tasksAtTime.map((task) => (
                <div
                  key={task.id}
                  className={`absolute inset-0 rounded p-2 text-xs cursor-pointer ${getTaskColor(task.type, task.status)}`}
                  onClick={() => {
                    setSelectedTask(task)
                    setShowEditModal(true)
                  }}
                >
                  <div className="font-medium text-white">{task.title}</div>
                  <div className="text-white opacity-90">{task.room}</div>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )

  const renderWeekView = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-8 gap-4">
        <div className="text-center">
          <div className="text-sm text-teal-200 mb-2">Time</div>
        </div>
        {weekDays.map((day, index) => {
          const date = new Date(currentDate)
          date.setDate(date.getDate() - date.getDay() + 1 + index)
          return (
            <div key={day} className="text-center">
              <div className="text-sm text-teal-100">{day}</div>
              <div className="text-lg font-bold">{date.getDate()}</div>
            </div>
          )
        })}
      </div>

      <div className="space-y-2">
        {timeSlots.slice(6, 20).map((time, timeIndex) => (
          <div key={time} className="grid grid-cols-8 gap-4 h-16">
            <div className="flex items-center text-sm text-teal-200">{time}</div>
            {Array.from({ length: 7 }).map((_, dayIndex) => {
              const date = new Date(currentDate)
              date.setDate(date.getDate() - date.getDay() + 1 + dayIndex)
              const dateStr = date.toISOString().split("T")[0]
              const tasksAtTime = scheduledTasks.filter((task) => task.date === dateStr && task.time === time)

              return (
                <div key={dayIndex} className="relative">
                  {tasksAtTime.map((task) => (
                    <div
                      key={task.id}
                      className={`absolute inset-0 rounded p-1 text-xs cursor-pointer ${getTaskColor(task.type, task.status)}`}
                      style={{ height: `${Math.min((task.duration / 60) * 64, 64)}px` }}
                      onClick={() => {
                        setSelectedTask(task)
                        setShowEditModal(true)
                      }}
                    >
                      <div className="font-medium text-white truncate">{task.title}</div>
                      <div className="text-white opacity-90 truncate">{task.room}</div>
                    </div>
                  ))}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )

  const renderMonthView = () => {
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }

    return (
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((day) => (
          <div key={day} className="text-center text-sm text-teal-200 p-2 font-medium">
            {day}
          </div>
        ))}
        {days.map((day, index) => {
          if (!day) return <div key={index} className="h-24"></div>

          const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
          const dateStr = date.toISOString().split("T")[0]
          const dayTasks = getTasksForDate(dateStr)

          return (
            <div key={index} className="h-24 border border-teal-700 rounded p-1">
              <div className="text-sm text-white font-medium mb-1">{day}</div>
              <div className="space-y-1">
                {dayTasks.slice(0, 2).map((task) => (
                  <div
                    key={task.id}
                    className={`text-xs p-1 rounded cursor-pointer ${getTaskColor(task.type, task.status)}`}
                    onClick={() => {
                      setSelectedTask(task)
                      setShowEditModal(true)
                    }}
                  >
                    <div className="text-white truncate">{task.title}</div>
                  </div>
                ))}
                {dayTasks.length > 2 && <div className="text-xs text-teal-200">+{dayTasks.length - 2} more</div>}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  const renderYearView = () => {
    return (
      <div className="grid grid-cols-4 gap-4">
        {monthNames.map((month, index) => (
          <Card key={month} className="bg-teal-700 text-white cursor-pointer hover:bg-teal-600">
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">{month}</h3>
              <div className="text-2xl font-bold">
                {
                  scheduledTasks.filter((task) => {
                    const taskDate = new Date(task.date)
                    return taskDate.getMonth() === index && taskDate.getFullYear() === currentDate.getFullYear()
                  }).length
                }
              </div>
              <div className="text-sm text-teal-200">tasks</div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

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
        <div className="space-y-6">
          {/* Calendar Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => navigateDate("prev")}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <h2 className="text-xl font-semibold min-w-[200px] text-center">{getDateRange()}</h2>
                <Button variant="outline" size="sm" onClick={() => navigateDate("next")}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex gap-2">
                {(["day", "week", "month", "year"] as const).map((view) => (
                  <Button
                    key={view}
                    variant="outline"
                    size="sm"
                    className={calendarView === view ? "bg-teal-600 text-white" : ""}
                    onClick={() => setCalendarView(view)}
                  >
                    {view.charAt(0).toUpperCase() + view.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
            <Button onClick={() => setShowPlanningModal(true)} className=" hover:bg-teal-700" style={{ background: 'linear-gradient(90deg, #0A3F4C, #0C6980)' }}  >
              <Plus className="w-4 h-4 mr-2" />
              Create new planning
            </Button>
          </div>

          {/* Calendar Content */}
          <Card className=" text-white" style={{ background: 'linear-gradient(90deg, #0A3F4C, #0C6980)' }}>
            <CardContent className="p-6">{renderCalendarContent()}</CardContent>
          </Card>

          {/* Task List */}
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {scheduledTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${getTaskColor(task.type, task.status)}`}></div>
                      <div>
                        <div className="font-medium">{task.title}</div>
                        <div className="text-sm text-gray-600 flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <CalendarIcon className="w-3 h-3" />
                            {task.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {task.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {task.room}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {task.assignedTo}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                      <Badge variant="outline">{task.status}</Badge>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedTask(task)
                          setShowEditModal(true)
                        }}
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDeleteTask(task.id)}>
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Create Task Modal */}
          <Dialog open={showPlanningModal} onOpenChange={setShowPlanningModal}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Task</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Task Title</Label>
                  <Input
                    id="title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    placeholder="Enter task title"
                  />
                </div>
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select value={newTask.type} onValueChange={(value) => setNewTask({ ...newTask, type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sterilization">Sterilization</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="inspection">Inspection</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newTask.date}
                    onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="time">Time</Label>
                  <Select value={newTask.time} onValueChange={(value) => setNewTask({ ...newTask, time: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={newTask.duration}
                    onChange={(e) => setNewTask({ ...newTask, duration: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={newTask.priority}
                    onValueChange={(value) => setNewTask({ ...newTask, priority: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="room">Room/Location</Label>
                  <Input
                    id="room"
                    value={newTask.room}
                    onChange={(e) => setNewTask({ ...newTask, room: e.target.value })}
                    placeholder="Enter room or location"
                  />
                </div>
                <div>
                  <Label htmlFor="assignedTo">Assigned To</Label>
                  <Input
                    id="assignedTo"
                    value={newTask.assignedTo}
                    onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
                    placeholder="Enter assignee name"
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={newTask.notes}
                    onChange={(e) => setNewTask({ ...newTask, notes: e.target.value })}
                    placeholder="Enter additional notes"
                  />
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={() => setShowPlanningModal(false)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handleCreateTask} className="flex-1 bg-teal-600 hover:bg-teal-700">
                  <Save className="w-4 h-4 mr-2" />
                  Create Task
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Edit Task Modal */}
          <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Edit Task</DialogTitle>
              </DialogHeader>
              {selectedTask && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Task Title</Label>
                    <Input defaultValue={selectedTask.title} />
                  </div>
                  <div>
                    <Label>Type</Label>
                    <Select defaultValue={selectedTask.type}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sterilization">Sterilization</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="inspection">Inspection</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Date</Label>
                    <Input type="date" defaultValue={selectedTask.date} />
                  </div>
                  <div>
                    <Label>Time</Label>
                    <Input type="time" defaultValue={selectedTask.time} />
                  </div>
                  <div>
                    <Label>Duration (minutes)</Label>
                    <Input type="number" defaultValue={selectedTask.duration} />
                  </div>
                  <div>
                    <Label>Priority</Label>
                    <Select defaultValue={selectedTask.priority}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Room/Location</Label>
                    <Input defaultValue={selectedTask.room} />
                  </div>
                  <div>
                    <Label>Assigned To</Label>
                    <Input defaultValue={selectedTask.assignedTo} />
                  </div>
                  <div>
                    <Label>Status</Label>
                    <Select defaultValue={selectedTask.status}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2">
                    <Label>Notes</Label>
                    <Textarea defaultValue={selectedTask.notes} />
                  </div>
                </div>
              )}
              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={() => setShowEditModal(false)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handleEditTask} className="flex-1  hover:bg-teal-700" style={{ background: 'linear-gradient(90deg, #0A3F4C, #0C6980)' }}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        // Original Robot Details View (unchanged)
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
