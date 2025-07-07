"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Bot,
  Battery,
  Gauge,
  Plus,
  ChevronLeft,
  ChevronRight,
  Settings,
  BookOpen,
  Phone,
  FileText,
  Play,
  Info,
} from "lucide-react"
import { useState } from "react"

const robotsData = [
  {
    id: 1,
    name: "S4-CDZ12RR",
    description: "Robot de désinfection autonome",
    battery: 82,
    speed: 0.8,
    status: "Active",
    image: "/placeholder.svg?height=200&width=150",
  },
  {
    id: 2,
    name: "S4-CDZ12RR",
    description: "Robot de désinfection autonome",
    battery: 92,
    speed: 0.8,
    status: "Active",
    image: "/placeholder.svg?height=200&width=150",
  },
  {
    id: 3,
    name: "S4-CDZ12RR",
    description: "Robot de désinfection autonome",
    battery: 76,
    speed: 0.8,
    status: "Active",
    image: "/placeholder.svg?height=200&width=150",
  },
  {
    id: 4,
    name: "S4-CDZ13RR",
    description: "Robot de désinfection autonome",
    battery: 88,
    speed: 1.2,
    status: "Maintenance",
    image: "/placeholder.svg?height=200&width=150",
  },
  {
    id: 5,
    name: "S4-CDZ14RR",
    description: "Robot de désinfection autonome",
    battery: 95,
    speed: 0.9,
    status: "Active",
    image: "/placeholder.svg?height=200&width=150",
  },
  {
    id: 6,
    name: "S4-CDZ15RR",
    description: "Robot de désinfection autonome",
    battery: 67,
    speed: 0.7,
    status: "Charging",
    image: "/placeholder.svg?height=200&width=150",
  },
]

const spaceManagementOptions = [
  {
    title: "Configure Existant Space",
    icon: Settings,
    description: "Modifier les espaces existants",
  },
]

const moreInformationOptions = [
  {
    title: "User Manual and security information",
    icon: FileText,
    description: "Documentation et sécurité",
  },
  {
    title: "Tutorials",
    icon: BookOpen,
    description: "Guides d'utilisation",
  },
  {
    title: "Contact US / Report incident",
    icon: Phone,
    description: "Support et incidents",
  },
]

export function RobotsList() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showAddRobotModal, setShowAddRobotModal] = useState(false)
  const [showAddSpaceModal, setShowAddSpaceModal] = useState(false)
  const [newRobot, setNewRobot] = useState({
    name: "",
    model: "",
    serialNumber: "",
    location: "",
    description: "",
  })
  const [newSpace, setNewSpace] = useState({
    name: "",
    type: "",
    area: "",
    description: "",
  })

  const robotsPerSlide = 3
  const totalSlides = Math.ceil(robotsData.length / robotsPerSlide)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const getCurrentRobots = () => {
    const start = currentSlide * robotsPerSlide
    const end = start + robotsPerSlide
    return robotsData.slice(start, end)
  }

  const handleAddRobot = () => {
    console.log("Adding new robot:", newRobot)
    setShowAddRobotModal(false)
    setNewRobot({ name: "", model: "", serialNumber: "", location: "", description: "" })
  }

  const handleAddSpace = () => {
    console.log("Adding new space:", newSpace)
    setShowAddSpaceModal(false)
    setNewSpace({ name: "", type: "", area: "", description: "" })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "text-green-800"
      case "Maintenance":
        return "text-orange-800"
      case "Charging":
        return "text-blue-800"
      default:
        return "text-gray-800"
    }
  }

  return (
    <div className="p-6 space-y-6 bg-teal-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-teal-800">Robots list</h1>
        <Dialog open={showAddRobotModal} onOpenChange={setShowAddRobotModal}>
          <DialogTrigger asChild>
            <Button className="bg-slate-800 hover:bg-teal-700">
              <Plus className="w-4 h-4 mr-2" />
              Add new robot
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Robot</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="robotName">Robot Name</Label>
                <Input
                  id="robotName"
                  value={newRobot.name}
                  onChange={(e) => setNewRobot({ ...newRobot, name: e.target.value })}
                  placeholder="Enter robot name"
                />
              </div>
              <div>
                <Label htmlFor="robotModel">Model</Label>
                <Select onValueChange={(value) => setNewRobot({ ...newRobot, model: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="S4-CDZ12RR">S4-CDZ12RR</SelectItem>
                    <SelectItem value="S4-CDZ13RR">S4-CDZ13RR</SelectItem>
                    <SelectItem value="S4-CDZ14RR">S4-CDZ14RR</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="serialNumber">Serial Number</Label>
                <Input
                  id="serialNumber"
                  value={newRobot.serialNumber}
                  onChange={(e) => setNewRobot({ ...newRobot, serialNumber: e.target.value })}
                  placeholder="Enter serial number"
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={newRobot.location}
                  onChange={(e) => setNewRobot({ ...newRobot, location: e.target.value })}
                  placeholder="Enter location"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newRobot.description}
                  onChange={(e) => setNewRobot({ ...newRobot, description: e.target.value })}
                  placeholder="Enter description"
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={() => setShowAddRobotModal(false)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handleAddRobot} className="flex-1 bg-teal-600 hover:bg-teal-700">
                  Add Robot
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Robots Carousel */}
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              {currentSlide + 1} of {totalSlides}
            </span>
            <div className="flex gap-1">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${index === currentSlide ? "bg-teal-600" : "bg-gray-300"}`}
                />
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="bg-transparent"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextSlide}
              disabled={currentSlide === totalSlides - 1}
              className="bg-transparent"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getCurrentRobots().map((robot) => (
            <Card key={robot.id} className="text-white" style={{ background: 'linear-gradient(90deg, #0A3F4C, #0C6980)' }}>
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  {/* Robot Image */}
                  <div className="relative">
                    <div className="w-32 h-40 mx-auto bg-teal-700 rounded-lg flex items-center justify-center">
                      <Bot className="w-16 h-16 text-teal-200" />
                    </div>
                    <Button size="sm" variant="ghost" className="absolute top-2 right-2 text-white hover:bg-teal-700">
                      <Info className="w-4 h-4" />
                    </Button>
                  </div>
                  {/* Robot Info */}
                  <div>
                    <h3 className="text-lg font-bold mb-1">{robot.name}</h3>
                    <p className="text-teal-200 text-sm">{robot.description}</p>
                  </div>
                  {/* Status Indicators */}
                  <div className="flex items-center justify-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Battery className="w-4 h-4" />
                      <span>{robot.battery}%</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Gauge className="w-4 h-4" />
                      <span>{robot.speed} m/s</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          robot.status === "Active"
                            ? "bg-green-400"
                            : robot.status === "Maintenance"
                              ? "bg-orange-400"
                              : "bg-blue-400"
                        }`}
                      ></div>
                      <span>{robot.status}</span>
                    </div>
                  </div>
                  {/* Action Button */}
                  <Button className="w-full bg-slate-800 hover:bg-teal-500" disabled={robot.status !== "Active"}>
                    <Play className="w-4 h-4 mr-2" />
                    Start sterilization
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Space Management */}
        <Card className="text-white" style={{ background: 'linear-gradient(90deg, #0A3F4C, #0C6980)' }}>
          <CardHeader>
            <CardTitle>Space management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {spaceManagementOptions.map((option, index) => (
              <Button
                key={index}
                variant="secondary"
                className="w-full justify-start bg-white text-teal-800 hover:bg-gray-100"
              >
                <option.icon className="w-4 h-4 mr-2" />
                {option.title}
              </Button>
            ))}
            <Dialog open={showAddSpaceModal} onOpenChange={setShowAddSpaceModal}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start border-white text-white hover:bg-teal-700 bg-transparent"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add new space
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Space</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="spaceName">Space Name</Label>
                    <Input
                      id="spaceName"
                      value={newSpace.name}
                      onChange={(e) => setNewSpace({ ...newSpace, name: e.target.value })}
                      placeholder="Enter space name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="spaceType">Space Type</Label>
                    <Select onValueChange={(value) => setNewSpace({ ...newSpace, type: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select space type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="operating-room">Operating Room</SelectItem>
                        <SelectItem value="corridor">Corridor</SelectItem>
                        <SelectItem value="patient-room">Patient Room</SelectItem>
                        <SelectItem value="laboratory">Laboratory</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="area">Area (m²)</Label>
                    <Input
                      id="area"
                      value={newSpace.area}
                      onChange={(e) => setNewSpace({ ...newSpace, area: e.target.value })}
                      placeholder="Enter area in square meters"
                      type="number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="spaceDescription">Description</Label>
                    <Textarea
                      id="spaceDescription"
                      value={newSpace.description}
                      onChange={(e) => setNewSpace({ ...newSpace, description: e.target.value })}
                      placeholder="Enter space description"
                    />
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button variant="outline" onClick={() => setShowAddSpaceModal(false)} className="flex-1">
                      Cancel
                    </Button>
                    <Button onClick={handleAddSpace} className="flex-1 bg-teal-600 hover:bg-teal-700">
                      Add Space
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {/* More Information */}
        <Card className="text-white" style={{ background: 'linear-gradient(90deg, #0A3F4C, #0C6980)' }}>
          <CardHeader>
            <CardTitle>More information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {moreInformationOptions.map((option, index) => (
              <Button
                key={index}
                variant="secondary"
                className="w-full justify-between bg-white text-teal-800 hover:bg-gray-100"
              >
                <div className="flex items-center">
                  <option.icon className="w-4 h-4 mr-2" />
                  {option.title}
                </div>
                <ChevronRight className="w-4 h-4" />
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}