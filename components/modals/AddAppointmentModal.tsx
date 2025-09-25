"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Clock, User, FileText, Phone } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

interface AddAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (appointmentData: any) => void;
}

export default function AddAppointmentModal({
  isOpen,
  onClose,
  onSubmit,
}: AddAppointmentModalProps) {
  const [formData, setFormData] = useState({
    patientName: "",
    patientPhone: "",
    doctorName: "",
    appointmentDate: undefined as Date | undefined,
    appointmentTime: "",
    appointmentType: "",
    duration: "30",
    notes: "",
    urgency: "عادي",
  });

  // Sample patients for autocomplete (in real app, this would come from API)
  const samplePatients = [
    { id: "P001", name: "أحمد محمد علي", phone: "0123456789" },
    { id: "P002", name: "فاطمة سالم", phone: "0987654321" },
    { id: "P003", name: "محمد أحمد", phone: "0555123456" },
    { id: "P004", name: "سارة علي", phone: "0666789012" },
  ];

  // Available doctors (in real app, this would come from API)
  const availableDoctors = [
    { id: "D001", name: "د. سارة أحمد", specialty: "طب عام", available: true },
    { id: "D002", name: "د. محمد حسن", specialty: "طب الأطفال", available: true },
    { id: "D003", name: "د. نورا علي", specialty: "طب النساء", available: true },
    { id: "D004", name: "د. أحمد محمود", specialty: "طب القلب", available: true },
    { id: "D005", name: "د. فاطمة سالم", specialty: "طب الجلدية", available: false },
    { id: "D006", name: "د. خالد عبدالله", specialty: "طب العيون", available: true },
  ];

  // Available time slots
  const timeSlots = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
    "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
    "17:00", "17:30", "18:00", "18:30"
  ];

  const appointmentTypes = [
    "فحص عام",
    "استشارة",
    "متابعة",
    "فحص دوري",
    "طوارئ",
    "تحاليل",
    "أشعة",
    "علاج طبيعي"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate appointment ID
    const appointmentId = `A${Date.now().toString().slice(-6)}`;
    
    const appointmentData = {
      id: appointmentId,
      patientName: formData.patientName,
      patientPhone: formData.patientPhone,
      doctorName: formData.doctorName,
      date: formData.appointmentDate,
      time: formData.appointmentTime,
      type: formData.appointmentType,
      duration: parseInt(formData.duration),
      notes: formData.notes,
      urgency: formData.urgency,
      status: "مجدول",
      createdAt: new Date(),
    };

    onSubmit(appointmentData);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      patientName: "",
      patientPhone: "",
      doctorName: "",
      appointmentDate: undefined,
      appointmentTime: "",
      appointmentType: "",
      duration: "30",
      notes: "",
      urgency: "عادي",
    });
    onClose();
  };

  const handlePatientSelect = (patientName: string) => {
    const patient = samplePatients.find(p => p.name === patientName);
    if (patient) {
      setFormData({
        ...formData,
        patientName: patient.name,
        patientPhone: patient.phone,
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl w-[95vw] max-h-[95vh] overflow-y-auto p-0">
        <div className="p-6">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
              <CalendarIcon className="h-6 w-6 text-lubbmind-600" />
              تحديد موعد جديد
            </DialogTitle>
          </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Patient Information */}
          <div className="space-y-4 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <User className="h-5 w-5 text-lubbmind-600" />
              معلومات المريض
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="patientName">اسم المريض *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="patientName"
                    value={formData.patientName}
                    onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                    placeholder="أدخل اسم المريض أو اختر من القائمة"
                    className="pl-10"
                    list="patients-list"
                    required
                  />
                  <datalist id="patients-list">
                    {samplePatients.map((patient) => (
                      <option key={patient.id} value={patient.name} />
                    ))}
                  </datalist>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="patientPhone">رقم الهاتف *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="patientPhone"
                    type="tel"
                    value={formData.patientPhone}
                    onChange={(e) => setFormData({ ...formData, patientPhone: e.target.value })}
                    placeholder="0123456789"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Doctor Selection */}
          <div className="space-y-4 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <User className="h-5 w-5 text-green-600" />
              اختيار الطبيب
            </h3>
            
            <div className="space-y-2">
              <Label>الطبيب المعالج *</Label>
              <Select
                value={formData.doctorName}
                onValueChange={(value) => setFormData({ ...formData, doctorName: value })}
              >
                <SelectTrigger>
                  <User className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="اختر الطبيب المعالج" />
                </SelectTrigger>
                <SelectContent>
                  {availableDoctors
                    .filter(doctor => doctor.available)
                    .map((doctor) => (
                      <SelectItem key={doctor.id} value={doctor.name}>
                        <div className="flex flex-col">
                          <span>{doctor.name}</span>
                          <span className="text-sm text-gray-500">{doctor.specialty}</span>
                        </div>
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-500">
                يتم عرض الأطباء المتاحين فقط
              </p>
            </div>
          </div>

          {/* Appointment Details */}
          <div className="space-y-4 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-blue-600" />
              تفاصيل الموعد
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>تاريخ الموعد *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.appointmentDate ? (
                        format(formData.appointmentDate, "PPP", { locale: ar })
                      ) : (
                        <span>اختر تاريخ الموعد</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.appointmentDate}
                      onSelect={(date) => setFormData({ ...formData, appointmentDate: date })}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>وقت الموعد *</Label>
                <Select
                  value={formData.appointmentTime}
                  onValueChange={(value) => setFormData({ ...formData, appointmentTime: value })}
                >
                  <SelectTrigger>
                    <Clock className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="اختر وقت الموعد" />
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>نوع الموعد *</Label>
                <Select
                  value={formData.appointmentType}
                  onValueChange={(value) => setFormData({ ...formData, appointmentType: value })}
                >
                  <SelectTrigger>
                    <FileText className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="اختر نوع الموعد" />
                  </SelectTrigger>
                  <SelectContent>
                    {appointmentTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>مدة الموعد (دقيقة)</Label>
                <Select
                  value={formData.duration}
                  onValueChange={(value) => setFormData({ ...formData, duration: value })}
                >
                  <SelectTrigger>
                    <Clock className="mr-2 h-4 w-4" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 دقيقة</SelectItem>
                    <SelectItem value="30">30 دقيقة</SelectItem>
                    <SelectItem value="45">45 دقيقة</SelectItem>
                    <SelectItem value="60">60 دقيقة</SelectItem>
                    <SelectItem value="90">90 دقيقة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>درجة الأولوية</Label>
              <Select
                value={formData.urgency}
                onValueChange={(value) => setFormData({ ...formData, urgency: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="عادي">عادي</SelectItem>
                  <SelectItem value="مهم">مهم</SelectItem>
                  <SelectItem value="عاجل">عاجل</SelectItem>
                  <SelectItem value="طوارئ">طوارئ</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Additional Notes */}
          <div className="space-y-4 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <User className="h-5 w-5 text-purple-600" />
              ملاحظات إضافية
            </h3>
            
            <div className="space-y-2">
              <Label htmlFor="notes">ملاحظات الموعد</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="أدخل أي ملاحظات خاصة بالموعد..."
                rows={3}
              />
            </div>
          </div>

          <DialogFooter className="gap-2 pt-6 border-t bg-white dark:bg-gray-900 sticky bottom-0">
            <Button type="button" variant="outline" onClick={handleClose}>
              إلغاء
            </Button>
            <Button 
              type="submit" 
              className="bg-lubbmind-600 hover:bg-lubbmind-700 text-white"
            >
              تحديد الموعد
            </Button>
          </DialogFooter>
        </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}