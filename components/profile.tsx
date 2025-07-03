"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit, Download, Shield, Bell, LogOut } from "lucide-react"

export function Profile() {
  return (
    <div className="p-6 space-y-6 bg-teal-50 min-h-screen">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-teal-800">Profile</h1>
        <Button variant="outline" className="text-teal-600 border-teal-600 hover:bg-teal-50 bg-transparent">
          <Edit className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Info */}
        <div className="space-y-6">
          {/* Main Profile Card */}
          <Card className=" text-white" style={{ background: 'linear-gradient(90deg, #0A3F4C, #0C6980)' }}>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarImage src="/placeholder-user.jpg" alt="Mohamed Ali" />
                  <AvatarFallback className="bg-teal-600 text-white text-xl">MA</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold mb-2">Mohamed Ali</h2>
              </div>
            </CardContent>
          </Card>

          {/* Account Status */}
          <Card>
            <CardHeader>
              <CardTitle>Account Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Account Status</span>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Member Since</span>
                <span className="font-medium">January 2024</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Last Login</span>
                <span className="font-medium">Today, 09:15 AM</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Access Level</span>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  Administrator
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Details and Actions */}
        <div className="space-y-6">
          {/* Details Card */}
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600">Name</label>
                  <p className="font-medium">Mohamed</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Last Name</label>
                  <p className="font-medium">Ali</p>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Email</label>
                <p className="font-medium">mohamed.ali@example.com</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600">Job Title</label>
                  <p className="font-medium">Doctor</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Department</label>
                  <p className="font-medium">Cardiology</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security */}
          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Email Address</p>
                  <p className="text-sm text-gray-600">mohamed.ali@example.com</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Current Password</p>
                  <p className="text-sm text-gray-600">••••••••••••</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Download className="w-4 h-4 mr-2" />
                Download Activity Report
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Shield className="w-4 h-4 mr-2" />
                Two-Factor Authentication
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Bell className="w-4 h-4 mr-2" />
                Notification Settings
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
