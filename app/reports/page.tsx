"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { 
  Users, 
  Calendar, 
  TrendingUp, 
  Activity,
  Download,
  BarChart3,
  PieChart,
  FileText
} from "lucide-react"

interface StatCard {
  title: string
  value: string
  change: string
  changeType: "increase" | "decrease" | "neutral"
  icon: React.ReactNode
}

interface ChartData {
  name: string
  value: number
  color: string
}

export default function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")

  // Statistics data
  const stats: StatCard[] = [
    {
      title: "إجمالي المرضى",
      value: "1,247",
      change: "+12%",
      changeType: "increase",
      icon: <Users className="h-4 w-4" />
    },
    {
      title: "المواعيد هذا الشهر",
      value: "342",
      change: "+8%",
      changeType: "increase",
      icon: <Calendar className="h-4 w-4" />
    },
    {
      title: "معدل الحضور",
      value: "87%",
      change: "-2%",
      changeType: "decrease",
      icon: <TrendingUp className="h-4 w-4" />
    },
    {
      title: "المرضى النشطون",
      value: "892",
      change: "+5%",
      changeType: "increase",
      icon: <Activity className="h-4 w-4" />
    }
  ]

  // Appointment status distribution
  const appointmentStatusData: ChartData[] = [
    { name: "مكتمل", value: 65, color: "#10b981" },
    { name: "مجدول", value: 25, color: "#3b82f6" },
    { name: "ملغى", value: 7, color: "#ef4444" },
    { name: "لم يحضر", value: 3, color: "#f59e0b" }
  ]

  // Monthly appointments data
  const monthlyData = [
    { month: "يناير", appointments: 280, patients: 95 },
    { month: "فبراير", appointments: 320, patients: 110 },
    { month: "مارس", appointments: 290, patients: 88 },
    { month: "أبريل", appointments: 350, patients: 125 },
    { month: "مايو", appointments: 380, patients: 140 },
    { month: "يونيو", appointments: 342, patients: 132 }
  ]

  // Top doctors by appointments
  const topDoctors = [
    { name: "د. سارة أحمد", appointments: 89, patients: 67 },
    { name: "د. محمد حسن", appointments: 76, patients: 54 },
    { name: "د. نورا علي", appointments: 68, patients: 48 },
    { name: "د. أحمد محمود", appointments: 62, patients: 45 },
    { name: "د. فاطمة سالم", appointments: 47, patients: 38 }
  ]

  const getChangeColor = (changeType: StatCard["changeType"]) => {
    switch (changeType) {
      case "increase":
        return "text-green-600 dark:text-green-400"
      case "decrease":
        return "text-red-600 dark:text-red-400"
      default:
        return "text-gray-600 dark:text-gray-400"
    }
  }

  const exportReport = () => {
    // In a real app, this would generate and download a PDF/Excel report
    alert("تم تصدير التقرير بنجاح!")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">التقارير والإحصائيات</h1>
          <p className="text-muted-foreground">تحليل شامل لبيانات العيادة والأداء</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="اختر الفترة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">هذا الأسبوع</SelectItem>
              <SelectItem value="month">هذا الشهر</SelectItem>
              <SelectItem value="quarter">هذا الربع</SelectItem>
              <SelectItem value="year">هذا العام</SelectItem>
            </SelectContent>
          </Select>
          
          <Button onClick={exportReport}>
            <Download className="mr-2 h-4 w-4" />
            تصدير التقرير
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${getChangeColor(stat.changeType)}`}>
                {stat.change} من الشهر الماضي
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Appointment Status Chart */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="mr-2 h-5 w-5" />
              توزيع حالات المواعيد
            </CardTitle>
            <CardDescription>
              نسبة توزيع المواعيد حسب الحالة
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {appointmentStatusData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">{item.value}%</span>
                    <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-300"
                        style={{ 
                          width: `${item.value}%`, 
                          backgroundColor: item.color 
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Trends */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5" />
              الاتجاهات الشهرية
            </CardTitle>
            <CardDescription>
              المواعيد والمرضى الجدد
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {monthlyData.slice(-3).map((month, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{month.month}</span>
                    <span className="text-muted-foreground">
                      {month.appointments} موعد
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full transition-all duration-300"
                      style={{ width: `${(month.appointments / 400) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Top Doctors */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              أفضل الأطباء أداءً
            </CardTitle>
            <CardDescription>
              ترتيب الأطباء حسب عدد المواعيد
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">الطبيب</TableHead>
                  <TableHead className="text-right">المواعيد</TableHead>
                  <TableHead className="text-right">المرضى</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topDoctors.map((doctor, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{doctor.name}</TableCell>
                    <TableCell>{doctor.appointments}</TableCell>
                    <TableCell>{doctor.patients}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Monthly Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              الأداء الشهري
            </CardTitle>
            <CardDescription>
              تفاصيل الأداء لآخر 6 أشهر
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">الشهر</TableHead>
                  <TableHead className="text-right">المواعيد</TableHead>
                  <TableHead className="text-right">مرضى جدد</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {monthlyData.map((month, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{month.month}</TableCell>
                    <TableCell>{month.appointments}</TableCell>
                    <TableCell>{month.patients}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">ملخص اليوم</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">المواعيد المجدولة</span>
                <span className="font-medium">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">المواعيد المكتملة</span>
                <span className="font-medium">8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">المرضى الجدد</span>
                <span className="font-medium">3</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">ملخص الأسبوع</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">إجمالي المواعيد</span>
                <span className="font-medium">67</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">معدل الحضور</span>
                <span className="font-medium">89%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">المرضى الجدد</span>
                <span className="font-medium">18</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">ملخص الشهر</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">إجمالي المواعيد</span>
                <span className="font-medium">342</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">معدل الحضور</span>
                <span className="font-medium">87%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">المرضى الجدد</span>
                <span className="font-medium">132</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}