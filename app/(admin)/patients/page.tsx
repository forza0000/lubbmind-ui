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
import { Plus, Search } from "lucide-react"

interface Patient {
  id: string
  name: string
  age: number
  fileNumber: string
  lastVisit: string
  phone: string
  status: "Active" | "Inactive" | "Pending"
}

export default function Patients() {
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: "1",
      name: "أحمد محمد علي",
      age: 35,
      fileNumber: "P001",
      lastVisit: "2024-01-15",
      phone: "+966501234567",
      status: "Active"
    },
    {
      id: "2", 
      name: "فاطمة عبدالله",
      age: 28,
      fileNumber: "P002",
      lastVisit: "2024-01-10",
      phone: "+966507654321",
      status: "Active"
    },
    {
      id: "3",
      name: "محمد سعد الدين",
      age: 42,
      fileNumber: "P003", 
      lastVisit: "2023-12-20",
      phone: "+966509876543",
      status: "Inactive"
    },
    {
      id: "4",
      name: "نورا حسن",
      age: 31,
      fileNumber: "P004",
      lastVisit: "2024-01-12",
      phone: "+966502468135",
      status: "Pending"
    }
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    phone: "",
    status: "Active" as Patient["status"]
  })

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.fileNumber.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddPatient = () => {
    if (newPatient.name && newPatient.age && newPatient.phone) {
      const patient: Patient = {
        id: (patients.length + 1).toString(),
        name: newPatient.name,
        age: parseInt(newPatient.age),
        fileNumber: `P${String(patients.length + 1).padStart(3, '0')}`,
        lastVisit: new Date().toISOString().split('T')[0],
        phone: newPatient.phone,
        status: newPatient.status
      }
      
      setPatients([...patients, patient])
      setNewPatient({ name: "", age: "", phone: "", status: "Active" })
      setIsDialogOpen(false)
    }
  }

  const getStatusColor = (status: Patient["status"]) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Inactive":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "Pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">المرضى</h1>
          <p className="text-muted-foreground">إدارة بيانات المرضى والملفات الطبية</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              إضافة مريض جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>إضافة مريض جديد</DialogTitle>
              <DialogDescription>
                أدخل بيانات المريض الجديد هنا. انقر حفظ عند الانتهاء.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  الاسم
                </Label>
                <Input
                  id="name"
                  value={newPatient.name}
                  onChange={(e) => setNewPatient({...newPatient, name: e.target.value})}
                  className="col-span-3"
                  placeholder="اسم المريض"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="age" className="text-right">
                  العمر
                </Label>
                <Input
                  id="age"
                  type="number"
                  value={newPatient.age}
                  onChange={(e) => setNewPatient({...newPatient, age: e.target.value})}
                  className="col-span-3"
                  placeholder="العمر"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  الهاتف
                </Label>
                <Input
                  id="phone"
                  value={newPatient.phone}
                  onChange={(e) => setNewPatient({...newPatient, phone: e.target.value})}
                  className="col-span-3"
                  placeholder="+966xxxxxxxxx"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  الحالة
                </Label>
                <Select
                  value={newPatient.status}
                  onValueChange={(value: Patient["status"]) => 
                    setNewPatient({...newPatient, status: value})
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="اختر الحالة" />
                  </SelectTrigger>
                  <SelectContent className="z-50">
                    <SelectItem value="Active">نشط</SelectItem>
                    <SelectItem value="Inactive">غير نشط</SelectItem>
                    <SelectItem value="Pending">في الانتظار</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddPatient}>
                حفظ المريض
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="البحث عن مريض..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableCaption>قائمة بجميع المرضى المسجلين في النظام</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right w-[100px]">رقم الملف</TableHead>
              <TableHead className="text-right min-w-[150px]">اسم المريض</TableHead>
              <TableHead className="text-right w-[80px]">العمر</TableHead>
              <TableHead className="text-right w-[140px]">رقم الهاتف</TableHead>
              <TableHead className="text-right w-[120px]">آخر زيارة</TableHead>
              <TableHead className="text-right w-[100px]">الحالة</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPatients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell className="font-medium text-right">{patient.fileNumber}</TableCell>
                <TableCell className="text-right">{patient.name}</TableCell>
                <TableCell className="text-right">{patient.age} سنة</TableCell>
                <TableCell className="text-right">{patient.phone}</TableCell>
                <TableCell className="text-right">{patient.lastVisit}</TableCell>
                <TableCell className="text-right">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(patient.status)}`}>
                    {patient.status === "Active" && "نشط"}
                    {patient.status === "Inactive" && "غير نشط"}
                    {patient.status === "Pending" && "في الانتظار"}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredPatients.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">لا توجد نتائج للبحث "{searchTerm}"</p>
        </div>
      )}
    </div>
  )
}