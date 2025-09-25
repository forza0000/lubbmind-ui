"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
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
import { Plus, Search, Calendar, Clock } from "lucide-react"

interface Appointment {
  id: string
  patient: string
  patientId: string
  date: string
  time: string
  doctor: string
  status: "Scheduled" | "Completed" | "Cancelled" | "No Show"
  notes?: string
}

export default function Appointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "1",
      patient: "أحمد محمد علي",
      patientId: "P001",
      date: "2024-01-20",
      time: "09:00",
      doctor: "د. سارة أحمد",
      status: "Scheduled",
      notes: "فحص دوري"
    },
    {
      id: "2",
      patient: "فاطمة عبدالله",
      patientId: "P002",
      date: "2024-01-20",
      time: "10:30",
      doctor: "د. محمد حسن",
      status: "Completed",
      notes: "متابعة علاج"
    },
    {
      id: "3",
      patient: "محمد سعد الدين",
      patientId: "P003",
      date: "2024-01-21",
      time: "14:00",
      doctor: "د. نورا علي",
      status: "Scheduled",
      notes: "استشارة أولى"
    },
    {
      id: "4",
      patient: "نورا حسن",
      patientId: "P004",
      date: "2024-01-19",
      time: "11:00",
      doctor: "د. سارة أحمد",
      status: "No Show",
      notes: "لم يحضر"
    },
    {
      id: "5",
      patient: "علي محمود",
      patientId: "P005",
      date: "2024-01-22",
      time: "16:30",
      doctor: "د. محمد حسن",
      status: "Cancelled",
      notes: "ألغى المريض"
    }
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [newAppointment, setNewAppointment] = useState({
    patient: "",
    patientId: "",
    date: "",
    time: "",
    doctor: "",
    status: "Scheduled" as Appointment["status"],
    notes: ""
  })

  // Sample patients for dropdown
  const patients = [
    { id: "P001", name: "أحمد محمد علي" },
    { id: "P002", name: "فاطمة عبدالله" },
    { id: "P003", name: "محمد سعد الدين" },
    { id: "P004", name: "نورا حسن" },
    { id: "P005", name: "علي محمود" },
    { id: "P006", name: "مريم أحمد" }
  ]

  const doctors = [
    "د. سارة أحمد",
    "د. محمد حسن", 
    "د. نورا علي",
    "د. أحمد محمود",
    "د. فاطمة سالم"
  ]

  const filteredAppointments = appointments.filter(appointment =>
    appointment.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddAppointment = () => {
    if (newAppointment.patient && newAppointment.date && newAppointment.time && newAppointment.doctor) {
      const selectedPatient = patients.find(p => p.id === newAppointment.patientId)
      
      const appointment: Appointment = {
        id: (appointments.length + 1).toString(),
        patient: selectedPatient?.name || newAppointment.patient,
        patientId: newAppointment.patientId,
        date: newAppointment.date,
        time: newAppointment.time,
        doctor: newAppointment.doctor,
        status: newAppointment.status,
        notes: newAppointment.notes
      }
      
      setAppointments([...appointments, appointment])
      setNewAppointment({ 
        patient: "", 
        patientId: "", 
        date: "", 
        time: "", 
        doctor: "", 
        status: "Scheduled", 
        notes: "" 
      })
      setIsDialogOpen(false)
    }
  }

  const handlePatientSelect = (patientId: string) => {
    const selectedPatient = patients.find(p => p.id === patientId)
    if (selectedPatient) {
      setNewAppointment({
        ...newAppointment,
        patientId: patientId,
        patient: selectedPatient.name
      })
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
      case "No Show":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">المواعيد</h1>
          <p className="text-muted-foreground">إدارة مواعيد المرضى والأطباء</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              حجز موعد جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>حجز موعد جديد</DialogTitle>
              <DialogDescription>
                أدخل تفاصيل الموعد الجديد هنا. انقر حفظ عند الانتهاء.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="patient" className="text-right">
                  المريض
                </Label>
                <Select
                  value={newAppointment.patientId}
                  onValueChange={handlePatientSelect}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="اختر المريض" />
                  </SelectTrigger>
                  <SelectContent>
                    {patients.map((patient) => (
                      <SelectItem key={patient.id} value={patient.id}>
                        {patient.name} ({patient.id})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                <Label htmlFor="doctor" className="text-right">
                  الطبيب
                </Label>
                <Select
                  value={newAppointment.doctor}
                  onValueChange={(value) => setNewAppointment({...newAppointment, doctor: value})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="اختر الطبيب" />
                  </SelectTrigger>
                  <SelectContent>
                    {doctors.map((doctor) => (
                      <SelectItem key={doctor} value={doctor}>
                        {doctor}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                  <SelectContent>
                    <SelectItem value="Scheduled">مجدول</SelectItem>
                    <SelectItem value="Completed">مكتمل</SelectItem>
                    <SelectItem value="Cancelled">ملغى</SelectItem>
                    <SelectItem value="No Show">لم يحضر</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="notes" className="text-right">
                  ملاحظات
                </Label>
                <Input
                  id="notes"
                  value={newAppointment.notes}
                  onChange={(e) => setNewAppointment({...newAppointment, notes: e.target.value})}
                  className="col-span-3"
                  placeholder="ملاحظات إضافية (اختياري)"
                />
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

      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="البحث في المواعيد..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableCaption>قائمة بجميع المواعيد المحجوزة في النظام</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">المريض</TableHead>
              <TableHead className="text-right">رقم الملف</TableHead>
              <TableHead className="text-right">التاريخ</TableHead>
              <TableHead className="text-right">الوقت</TableHead>
              <TableHead className="text-right">الطبيب</TableHead>
              <TableHead className="text-right">الحالة</TableHead>
              <TableHead className="text-right">ملاحظات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAppointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell className="font-medium">{appointment.patient}</TableCell>
                <TableCell>{appointment.patientId}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    {formatDate(appointment.date)}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    {appointment.time}
                  </div>
                </TableCell>
                <TableCell>{appointment.doctor}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(appointment.status)}`}>
                    {appointment.status === "Scheduled" && "مجدول"}
                    {appointment.status === "Completed" && "مكتمل"}
                    {appointment.status === "Cancelled" && "ملغى"}
                    {appointment.status === "No Show" && "لم يحضر"}
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {appointment.notes || "-"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredAppointments.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">لا توجد نتائج للبحث "{searchTerm}"</p>
        </div>
      )}
    </div>
  )
}