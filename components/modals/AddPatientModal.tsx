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
import { CalendarIcon, User, Phone, Mail, MapPin } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

interface AddPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (patientData: any) => void;
}

export default function AddPatientModal({
  isOpen,
  onClose,
  onSubmit,
}: AddPatientModalProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: undefined as Date | undefined,
    gender: "",
    phone: "",
    email: "",
    address: "",
    emergencyContact: "",
    emergencyPhone: "",
    medicalHistory: "",
    allergies: "",
    currentMedications: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate patient ID
    const patientId = `P${Date.now().toString().slice(-6)}`;
    
    // Calculate age from date of birth
    const age = formData.dateOfBirth 
      ? new Date().getFullYear() - formData.dateOfBirth.getFullYear()
      : 0;

    const patientData = {
      id: patientId,
      name: `${formData.firstName} ${formData.lastName}`,
      age,
      gender: formData.gender,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      emergencyContact: formData.emergencyContact,
      emergencyPhone: formData.emergencyPhone,
      medicalHistory: formData.medicalHistory,
      allergies: formData.allergies,
      currentMedications: formData.currentMedications,
      status: "نشط",
      lastVisit: "جديد",
      condition: "فحص أولي",
      dateOfBirth: formData.dateOfBirth,
      createdAt: new Date(),
    };

    onSubmit(patientData);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      firstName: "",
      lastName: "",
      dateOfBirth: undefined,
      gender: "",
      phone: "",
      email: "",
      address: "",
      emergencyContact: "",
      emergencyPhone: "",
      medicalHistory: "",
      allergies: "",
      currentMedications: "",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl w-[95vw] max-h-[95vh] overflow-y-auto p-0">
        <div className="p-6">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
              <User className="h-6 w-6 text-lubbmind-600" />
              إضافة مريض جديد
            </DialogTitle>
          </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <User className="h-5 w-5 text-lubbmind-600" />
              المعلومات الشخصية
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">الاسم الأول *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder="أدخل الاسم الأول"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">اسم العائلة *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  placeholder="أدخل اسم العائلة"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>تاريخ الميلاد *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.dateOfBirth ? (
                        format(formData.dateOfBirth, "PPP", { locale: ar })
                      ) : (
                        <span>اختر تاريخ الميلاد</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.dateOfBirth}
                      onSelect={(date) => setFormData({ ...formData, dateOfBirth: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>الجنس *</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => setFormData({ ...formData, gender: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الجنس" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ذكر">ذكر</SelectItem>
                    <SelectItem value="أنثى">أنثى</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Phone className="h-5 w-5 text-lubbmind-600" />
              معلومات الاتصال
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">رقم الهاتف *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0123456789"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="example@email.com"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">العنوان</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="أدخل العنوان الكامل"
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="space-y-4 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Phone className="h-5 w-5 text-red-600" />
              جهة الاتصال في حالات الطوارئ
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="emergencyContact">اسم جهة الاتصال</Label>
                <Input
                  id="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                  placeholder="اسم الشخص المسؤول"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="emergencyPhone">رقم هاتف الطوارئ</Label>
                <Input
                  id="emergencyPhone"
                  type="tel"
                  value={formData.emergencyPhone}
                  onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
                  placeholder="0123456789"
                />
              </div>
            </div>
          </div>

          {/* Medical Information */}
          <div className="space-y-4 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <User className="h-5 w-5 text-green-600" />
              المعلومات الطبية
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="medicalHistory">التاريخ المرضي</Label>
                <Textarea
                  id="medicalHistory"
                  value={formData.medicalHistory}
                  onChange={(e) => setFormData({ ...formData, medicalHistory: e.target.value })}
                  placeholder="أدخل التاريخ المرضي والأمراض السابقة"
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="allergies">الحساسية</Label>
                <Textarea
                  id="allergies"
                  value={formData.allergies}
                  onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                  placeholder="أدخل أي حساسية معروفة"
                  rows={2}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="currentMedications">الأدوية الحالية</Label>
                <Textarea
                  id="currentMedications"
                  value={formData.currentMedications}
                  onChange={(e) => setFormData({ ...formData, currentMedications: e.target.value })}
                  placeholder="أدخل الأدوية التي يتناولها المريض حالياً"
                  rows={2}
                />
              </div>
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
              إضافة المريض
            </Button>
          </DialogFooter>
        </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}