"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  UserPlus, 
  Phone, 
  Mail, 
  Calendar,
  FileText,
  MoreHorizontal,
  Filter,
  Download
} from "lucide-react";

export default function Patients() {
  const [searchTerm, setSearchTerm] = useState("");

  const patients = [
    {
      id: "P001",
      name: "أحمد محمد السالم",
      age: 45,
      gender: "ذكر",
      phone: "+966501234567",
      email: "ahmed.salem@email.com",
      lastVisit: "2024-01-15",
      condition: "ضغط الدم",
      status: "نشط"
    },
    {
      id: "P002", 
      name: "فاطمة علي أحمد",
      age: 32,
      gender: "أنثى",
      phone: "+966507654321",
      email: "fatima.ali@email.com",
      lastVisit: "2024-01-12",
      condition: "السكري",
      status: "نشط"
    },
    {
      id: "P003",
      name: "محمد سالم الأحمد",
      age: 28,
      gender: "ذكر", 
      phone: "+966509876543",
      email: "mohammed.salem@email.com",
      lastVisit: "2024-01-10",
      condition: "فحص دوري",
      status: "نشط"
    },
    {
      id: "P004",
      name: "نورا أحمد محمد",
      age: 55,
      gender: "أنثى",
      phone: "+966502468135",
      email: "nora.ahmed@email.com", 
      lastVisit: "2024-01-08",
      condition: "أمراض القلب",
      status: "متابعة"
    },
    {
      id: "P005",
      name: "خالد عبدالله الزهراني",
      age: 38,
      gender: "ذكر",
      phone: "+966503691472",
      email: "khalid.zahrani@email.com",
      lastVisit: "2024-01-05",
      condition: "الربو",
      status: "نشط"
    }
  ];

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            إدارة المرضى
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            إدارة ملفات المرضى ومعلوماتهم الطبية
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            تصدير البيانات
          </Button>
          <Button className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            إضافة مريض جديد
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">إجمالي المرضى</p>
                <p className="text-2xl font-bold">1,234</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <UserPlus className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">مرضى جدد هذا الشهر</p>
                <p className="text-2xl font-bold">89</p>
              </div>
              <div className="h-12 w-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">مرضى نشطون</p>
                <p className="text-2xl font-bold">987</p>
              </div>
              <div className="h-12 w-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">مرضى متابعة</p>
                <p className="text-2xl font-bold">156</p>
              </div>
              <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                <Phone className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="البحث عن مريض (الاسم، الرقم، الحالة)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              تصفية
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Patients List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>قائمة المرضى ({filteredPatients.length})</span>
            <Badge variant="secondary">{filteredPatients.length} من {patients.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPatients.map((patient) => (
              <div key={patient.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold text-lg">
                        {patient.name.split(' ')[0].charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{patient.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <span>رقم المريض: {patient.id}</span>
                        <span>العمر: {patient.age} سنة</span>
                        <span>الجنس: {patient.gender}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={patient.status === "نشط" ? "default" : "secondary"}>
                      {patient.status}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span>{patient.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span>{patient.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>آخر زيارة: {patient.lastVisit}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-gray-400" />
                    <span>الحالة: {patient.condition}</span>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <Button size="sm" variant="outline">عرض الملف</Button>
                  <Button size="sm" variant="outline">تحديد موعد</Button>
                  <Button size="sm" variant="outline">إنشاء وصفة</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}