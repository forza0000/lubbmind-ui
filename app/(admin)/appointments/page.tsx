"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Plus, Search, Calendar, Clock, User, Filter } from "lucide-react"

interface Appointment {
  id: string
  appointmentId: string
  patientName: string
  doctorName: string
  date: string
  time: string
  status: "Scheduled" | "Completed" | "Cancelled" | "No-show"
}

interface Patient {
  id: string
  name: string
}

export default function Appointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "1",
      appointmentId: "A001",
      patientName: "أحمد محمد علي",
      doctorName: "د. سارة أحمد",
      date: "2024-01-20",
      time: "09:30",
      status: "Scheduled"
    },
    {
      id: "2",
      appointmentId: "A002",
      patientName: "فاطمة عبدالله",
      doctorName: "د. محمد حسن",
      date: "2024-01-20",
      time: "10:00",
      status: "Completed"
    },
    {
      id: "3",
      appointmentId: "A003",
      patientName: "محمد سعد الدين",
      doctorName: "د. نورا علي",
      date: "2024-01-21",
      time: "14:30",
      status: "Scheduled"
    },
    {
      id: "4",
      appointmentId: "A004",
      patientName: "نورا حسن",
      doctorName: "د. أحمد محمود",
      date: "2024-01-19",
      time: "11:00",
      status: "Cancelled"
    },
    {
      id: "5",
      appointmentId: "A005",
      patientName: "علي عبدالرحمن",
      doctorName: "د. سارة أحمد",
      date: "2024-01-18",
      time: "15:00",
      status: "No-show"
    }
  ])

  // Sample patients for dropdown
  const [patients] = useState<Patient[]>([
    { id: "1", name: "أحمد محمد علي" },
    { id: "2", name: "فاطمة عبدالله" },
    { id: "3", name: "محمد سعد الدين" },
    { id: "4", name: "نورا حسن" },
    { id: "5", name: "علي عبدالرحمن" },
    { id: "6", name: "مريم أحمد" },
    { id: "7", name: "خالد محمود" }
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [newAppointment, setNewAppointment] = useState({
    patientName: "",
    doctorName: "",
    date: "",
    time: "",
    status: "Scheduled" as Appointment["status"]
  })

  // Filter appointments based on search term and status
  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = 
      appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.appointmentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.date.includes(searchTerm)

    const matchesStatus = statusFilter === "all" || appointment.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleAddAppointment = () => {
    if (newAppointment.patientName && newAppointment.doctorName && newAppointment.date && newAppointment.time) {
      const appointment: Appointment = {
        id: (appointments.length + 1).toString(),
        appointmentId: `A${String(appointments.length + 1).padStart(3, '0')}`,
        patientName: newAppointment.patientName,
        doctorName: newAppointment.doctorName,
        date: newAppointment.date,
        time: newAppointment.time,
        status: newAppointment.status
      }
      
      setAppointments([...appointments, appointment])
      setNewAppointment({ 
        patientName: "", 
        doctorName: "", 
        date: "", 
        time: "", 
        status: "Scheduled" 
      })
      setIsDialogOpen(false)
    }
  }

  const getStatusColor = (status: Appointment["status"]) => {
    switch (status) {
      case "Scheduled":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "No-show":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getStatusText = (status: Appointment["status"]) => {
    switch (status) {
      case "Scheduled":
        return "مجدول"
      case "Completed":
        return "مكتمل"
      case "Cancelled":
        return "ملغي"
      case "No-show":
        return "لم يحضر"
      default:
        return status
    }
  }

  // Statistics
  const totalAppointments = appointments.length
  const scheduledCount = appointments.filter(a => a.status === "Scheduled").length
  const completedCount = appointments.filter(a => a.status === "Completed").length
  const cancelledCount = appointments.filter(a => a.status === "Cancelled").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">المواعيد</h1>
          <p className="text-muted-foreground">إدارة مواعيد المرضى والأطباء</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              إضافة موعد جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>إضافة موعد جديد</DialogTitle>
              <DialogDescription>
                أدخل تفاصيل الموعد الجديد هنا. انقر حفظ عند الانتهاء.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="patient" className="text-right">
                  اسم المريض
                </Label>
                <Select
                  value={newAppointment.patientName}
                  onValueChange={(value) => 
                    setNewAppointment({...newAppointment, patientName: value})
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="اختر المريض" />
                  </SelectTrigger>
                  <SelectContent className="z-50">
                    {patients.map((patient) => (
                      <SelectItem key={patient.id} value={patient.name}>
                        {patient.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="doctor" className="text-right">
                  اسم الطبيب
                </Label>
                <Input
                  id="doctor"
                  value={newAppointment.doctorName}
                  onChange={(e) => setNewAppointment({...newAppointment, doctorName: e.target.value})}
                  className="col-span-3"
                  placeholder="د. اسم الطبيب"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  التاريخ
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={newAppointment.date}
                  onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="time" className="text-right">
                  الوقت
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={newAppointment.time}
                  onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  الحالة
                </Label>
                <Select
                  value={newAppointment.status}
                  onValueChange={(value: Appointment["status"]) => 
                    setNewAppointment({...newAppointment, status: value})
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="اختر الحالة" />
                  </SelectTrigger>
                  <SelectContent className="z-50">
                    <SelectItem value="Scheduled">مجدول</SelectItem>
                    <SelectItem value="Completed">مكتمل</SelectItem>
                    <SelectItem value="Cancelled">ملغي</SelectItem>
                    <SelectItem value="No-show">لم يحضر</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddAppointment}>
                حفظ الموعد
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي المواعيد</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAppointments}</div>
            <p className="text-xs text-muted-foreground">جميع المواعيد المسجلة</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">المواعيد المجدولة</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{scheduledCount}</div>
            <p className="text-xs text-muted-foreground">مواعيد قادمة</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">المواعيد المكتملة</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{completedCount}</div>
            <p className="text-xs text-muted-foreground">مواعيد منتهية</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">المواعيد الملغية</CardTitle>
            <Filter className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{cancelledCount}</div>
            <p className="text-xs text-muted-foreground">مواعيد ملغية</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex items-center space-x-2 flex-1">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="البحث في المواعيد (مريض، طبيب، رقم الموعد، تاريخ)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="تصفية حسب الحالة" />
          </SelectTrigger>
          <SelectContent className="z-50">
            <SelectItem value="all">جميع الحالات</SelectItem>
            <SelectItem value="Scheduled">مجدول</SelectItem>
            <SelectItem value="Completed">مكتمل</SelectItem>
            <SelectItem value="Cancelled">ملغي</SelectItem>
            <SelectItem value="No-show">لم يحضر</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Appointments Table */}
      <div className="rounded-md border">
        <Table>
          <TableCaption>قائمة بجميع المواعيد المسجلة في النظام</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right w-[100px]">رقم الموعد</TableHead>
              <TableHead className="text-right min-w-[150px]">اسم المريض</TableHead>
              <TableHead className="text-right min-w-[150px]">اسم الطبيب</TableHead>
              <TableHead className="text-right w-[120px]">التاريخ</TableHead>
              <TableHead className="text-right w-[80px]">الوقت</TableHead>
              <TableHead className="text-right w-[100px]">الحالة</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAppointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell className="font-medium text-right">{appointment.appointmentId}</TableCell>
                <TableCell className="text-right">{appointment.patientName}</TableCell>
                <TableCell className="text-right">{appointment.doctorName}</TableCell>
                <TableCell className="text-right">{appointment.date}</TableCell>
                <TableCell className="text-right">{appointment.time}</TableCell>
                <TableCell className="text-right">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(appointment.status)}`}>
                    {getStatusText(appointment.status)}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* No Results Message */}
      {filteredAppointments.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            {searchTerm || statusFilter !== "all" 
              ? `لا توجد نتائج للبحث "${searchTerm}" مع الفلتر المحدد`
              : "لا توجد مواعيد مسجلة"
            }
          </p>
        </div>
      )}
    </div>
  )
}