"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2, User, Stethoscope } from "lucide-react";

interface Medication {
  name: string;
  dosage: string;
  duration: string;
  instructions: string;
}

interface PrescriptionFormData {
  patientId: string;
  patientName: string;
  doctorName: string;
  diagnosis: string;
  notes: string;
  medications: Medication[];
}

interface AddPrescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (prescriptionData: PrescriptionFormData) => void;
}

export default function AddPrescriptionModal({ isOpen, onClose, onSubmit }: AddPrescriptionModalProps) {
  const [formData, setFormData] = useState<PrescriptionFormData>({
    patientId: "",
    patientName: "",
    doctorName: "",
    diagnosis: "",
    notes: "",
    medications: [{ name: "", dosage: "", duration: "", instructions: "" }]
  });

  // Sample patients (in real app, this would come from API)
  const availablePatients = [
    { id: "P001", name: "أحمد محمد علي", phone: "0501234567" },
    { id: "P002", name: "فاطمة عبدالله", phone: "0509876543" },
    { id: "P003", name: "محمد سعد الدين", phone: "0551234567" },
    { id: "P004", name: "نورا حسن", phone: "0559876543" },
    { id: "P005", name: "خالد إبراهيم", phone: "0561234567" }
  ];

  // Available doctors (in real app, this would come from API)
  const availableDoctors = [
    { id: "D001", name: "د. سارة أحمد", specialty: "طب عام", available: true },
    { id: "D002", name: "د. محمد حسن", specialty: "طب الأطفال", available: true },
    { id: "D003", name: "د. نورا علي", specialty: "طب النساء", available: true },
    { id: "D004", name: "د. أحمد محمود", specialty: "طب القلب", available: false },
    { id: "D005", name: "د. ليلى محمود", specialty: "طب الأسنان", available: true }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.patientId || !formData.doctorName || !formData.diagnosis || formData.medications.some(med => !med.name)) {
      alert("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    onSubmit({
      ...formData,
      medications: formData.medications.filter(med => med.name.trim() !== "")
    });
    
    // Reset form
    setFormData({
      patientId: "",
      patientName: "",
      doctorName: "",
      diagnosis: "",
      notes: "",
      medications: [{ name: "", dosage: "", duration: "", instructions: "" }]
    });
  };

  const addMedication = () => {
    setFormData({
      ...formData,
      medications: [...formData.medications, { name: "", dosage: "", duration: "", instructions: "" }]
    });
  };

  const removeMedication = (index: number) => {
    if (formData.medications.length > 1) {
      const newMedications = formData.medications.filter((_, i) => i !== index);
      setFormData({ ...formData, medications: newMedications });
    }
  };

  const updateMedication = (index: number, field: keyof Medication, value: string) => {
    const newMedications = [...formData.medications];
    newMedications[index] = { ...newMedications[index], [field]: value };
    setFormData({ ...formData, medications: newMedications });
  };

  const handlePatientSelect = (patientId: string) => {
    const selectedPatient = availablePatients.find(p => p.id === patientId);
    setFormData({
      ...formData,
      patientId,
      patientName: selectedPatient?.name || ""
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-right">إنشاء وصفة طبية جديدة</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Patient and Doctor Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Patient Selection */}
            <div className="space-y-2">
              <Label htmlFor="patient" className="text-right flex items-center gap-2">
                <User className="h-4 w-4" />
                المريض *
              </Label>
              <Select value={formData.patientId} onValueChange={handlePatientSelect}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر المريض" />
                </SelectTrigger>
                <SelectContent>
                  {availablePatients.map((patient) => (
                    <SelectItem key={patient.id} value={patient.id}>
                      <div className="flex flex-col items-start">
                        <span>{patient.name}</span>
                        <span className="text-sm text-gray-500">{patient.id} - {patient.phone}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Doctor Selection */}
            <div className="space-y-2">
              <Label htmlFor="doctor" className="text-right flex items-center gap-2">
                <Stethoscope className="h-4 w-4" />
                الطبيب *
              </Label>
              <Select value={formData.doctorName} onValueChange={(value) => setFormData({ ...formData, doctorName: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الطبيب" />
                </SelectTrigger>
                <SelectContent>
                  {availableDoctors
                    .filter(doctor => doctor.available)
                    .map((doctor) => (
                      <SelectItem key={doctor.id} value={doctor.name}>
                        <div className="flex flex-col items-start">
                          <span>{doctor.name}</span>
                          <span className="text-sm text-gray-500">{doctor.specialty}</span>
                        </div>
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Diagnosis */}
          <div className="space-y-2">
            <Label htmlFor="diagnosis" className="text-right">التشخيص *</Label>
            <Input
              id="diagnosis"
              value={formData.diagnosis}
              onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
              placeholder="أدخل التشخيص"
              className="text-right"
              required
            />
          </div>

          {/* Medications */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Button type="button" onClick={addMedication} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-1" />
                إضافة دواء
              </Button>
              <Label className="text-right font-medium">الأدوية *</Label>
            </div>
            
            <div className="space-y-3">
              {formData.medications.map((medication, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                      <div className="space-y-1">
                        <Label className="text-sm">اسم الدواء *</Label>
                        <Input
                          value={medication.name}
                          onChange={(e) => updateMedication(index, "name", e.target.value)}
                          placeholder="اسم الدواء"
                          className="text-right"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-sm">الجرعة</Label>
                        <Input
                          value={medication.dosage}
                          onChange={(e) => updateMedication(index, "dosage", e.target.value)}
                          placeholder="مثال: حبة واحدة"
                          className="text-right"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-sm">المدة</Label>
                        <Input
                          value={medication.duration}
                          onChange={(e) => updateMedication(index, "duration", e.target.value)}
                          placeholder="مثال: 7 أيام"
                          className="text-right"
                        />
                      </div>
                      <div className="space-y-1 flex items-end">
                        <Button
                          type="button"
                          onClick={() => removeMedication(index)}
                          variant="outline"
                          size="sm"
                          className="w-full"
                          disabled={formData.medications.length === 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="mt-3">
                      <Label className="text-sm">تعليمات الاستخدام</Label>
                      <Input
                        value={medication.instructions}
                        onChange={(e) => updateMedication(index, "instructions", e.target.value)}
                        placeholder="مثال: بعد الأكل، مرتين يومياً"
                        className="text-right mt-1"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-right">ملاحظات إضافية</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="أي ملاحظات أو تعليمات إضافية..."
              className="text-right min-h-[80px]"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              إلغاء
            </Button>
            <Button type="submit">
              إنشاء الوصفة
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}