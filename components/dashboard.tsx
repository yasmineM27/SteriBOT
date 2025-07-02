"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Users, Target, Activity } from "lucide-react"

const sessionData = [
  { date: "17 June 2025, 14:40", zone: "Operating Room A", duration: "13.5 min", status: "Log 5" },
  { date: "17 June 2025, 13:20", zone: "Surgery Room", duration: "8.2 min", status: "Log 5" },
  { date: "17 June 2025, 12:00", zone: "Main Corridor", duration: "14.8 min", status: "Log 4" },
  { date: "17 June 2025, 10:45", zone: "Operating Room B", duration: "12.3 min", status: "Log 4" },
]

const bacteriaData = [
  { name: "E. coli", percentage: 35, color: "bg-blue-500" },
  { name: "Staphylococcus", percentage: 28, color: "bg-purple-500" },
  { name: "Pseudomonas", percentage: 22, color: "bg-green-500" },
  { name: "Autres", percentage: 15, color: "bg-orange-500" },
]

export function Dashboard() {
  return (
    <div className="p-6 space-y-6 bg-teal-50 min-h-screen">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-teal-800">Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-teal-600 to-teal-700 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-teal-100 text-sm">Today's Connections</p>
                <p className="text-2xl font-bold">53</p>
              </div>
              <Shield className="w-8 h-8 text-teal-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Today's Users</p>
                <p className="text-2xl font-bold">70</p>
              </div>
              <Users className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sterilized Zones */}
        <Card className="bg-slate-800 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Sterilized Zones
              <span className="text-sm text-gray-400 ml-auto">from 100 sterilized zones</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-center justify-center">
              <div className="relative w-32 h-32">
                <div className="absolute inset-0 rounded-full border-8 border-teal-600"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold">95%</div>
                    <div className="text-sm text-gray-400">Sterilization efficiency</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between text-sm mt-4">
              <span>0%</span>
              <span>100%</span>
            </div>
          </CardContent>
        </Card>

        {/* Bacteria Detection */}
        <Card className="bg-slate-800 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Bacteria Detected (24h)
              <span className="text-sm text-gray-400 ml-auto">Total</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {bacteriaData.map((bacteria, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${bacteria.color}`}></div>
                    <span className="text-sm">{bacteria.name}</span>
                  </div>
                  <span className="text-sm font-semibold">{bacteria.percentage}%</span>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <div className="relative w-24 h-24 mx-auto">
                <div className="absolute inset-0 rounded-full border-4 border-gray-600"></div>
                <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 border-r-purple-500 border-b-green-500 border-l-orange-500"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Log Chart */}
      <Card className="bg-slate-800 text-white">
        <CardHeader>
          <CardTitle>Log</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="h-64 bg-gradient-to-t from-slate-900 to-slate-700 rounded-lg flex items-end justify-center">
            <div className="text-gray-400 text-sm">Graphique des logs de stérilisation</div>
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>1st Log</span>
            <span>2nd Log</span>
            <span>3rd Log</span>
            <span>4th Log</span>
            <span>5th Log</span>
            <span>6th Log</span>
          </div>
        </CardContent>
      </Card>

      {/* Session History */}
      <Card className="bg-slate-800 text-white">
        <CardHeader>
          <CardTitle>Session History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left p-3 text-gray-400 font-medium">Date/Time</th>
                  <th className="text-left p-3 text-gray-400 font-medium">Zone</th>
                  <th className="text-left p-3 text-gray-400 font-medium">Duration</th>
                  <th className="text-left p-3 text-gray-400 font-medium">Log Status</th>
                </tr>
              </thead>
              <tbody>
                {sessionData.map((session, index) => (
                  <tr key={index} className="border-b border-gray-700 hover:bg-slate-700">
                    <td className="p-3 text-sm">{session.date}</td>
                    <td className="p-3 text-sm">{session.zone}</td>
                    <td className="p-3 text-sm">{session.duration}</td>
                    <td className="p-3">
                      <Badge variant="secondary" className="bg-teal-600 text-white">
                        {session.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
