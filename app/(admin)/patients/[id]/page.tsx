"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  FileText, 
  Heart, 
  Activity,
  Pill,
  Clock,
  MapPin,
  Edit,
  Printer,
  Download
} from "lucide-react";

// Sample patient data - in a real app, this would come from an API
const samplePatients = [
  {
    id: "P001",
    name: "أحمد محمد علي",
    age: 45,
    gender: "ذكر",
    phone: "+966501234567",
    email: "ahmed.ali@email.com",
    address: "الرياض، حي النخيل، شارع الملك فهد",
    nationalId: "1234567890",
    emergencyContact: "فاطمة علي - +966507654321",
    bloodType: "O+",
    allergies: ["البنسلين", "الفول السوداني"],
    chronicConditions: ["ضغط الدم", "السكري النوع الثاني"],
    lastVisit: "2024-01-15",
    status: "نشط",
    medicalHistory: [
      {
        date: "2024-01-15",
        diagnosis: "فحص دوري",
        doctor: "د. سارة أحمد",
        notes: "الحالة مستقرة، يحتاج متابعة دورية"
      },
      {
        date: "2023-12-10",
        diagnosis: "ارتفاع ضغط الدم",
        doctor: "د. محمد حسن",
        notes: "تم تعديل الدواء"
      }
    ],
    prescriptions: [
      {
        date: "2024-01-15",
        medication: "أملوديبين 5mg",
        dosage: "مرة واحدة يومياً",
        duration: "30 يوم"
      },
      {
        date: "2024-01-15",
        medication: "ميتفورمين 500mg",
        dosage: "مرتين يومياً",
        duration: "30 يوم"
      }
    ],
    appointments: [
      {
        date: "2024-02-15",
        time: "10:00 ص",
        type: "فحص دوري",
        doctor: "د. سارة أحمد",
        status: "مؤكد"
      }
    ]
  }
];

export default function PatientDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const patientId = params.id as string;
  
  // Find patient by ID - in a real app, this would be an API call
  const patient = samplePatients.find(p => p.id === patientId) || samplePatients[0];
  
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "نظرة عامة", icon: User },
    { id: "history", label: "التاريخ الطبي", icon: FileText },
    { id: "prescriptions", label: "الوصفات", icon: Pill },
    { id: "appointments", label: "المواعيد", icon: Calendar }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            العودة
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              ملف المريض
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {patient.name} - {patient.id}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Edit className="h-4 w-4" />
            تعديل
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Printer className="h-4 w-4" />
            طباعة
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            تصدير
          </Button>
        </div>
      </div>

      {/* Patient Info Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            <div className="h-24 w-24 bg-lubbmind-100 dark:bg-lubbmind-900 rounded-full flex items-center justify-center">
              <span className="text-lubbmind-600 dark:text-lubbmind-400 font-bold text-2xl">
                {patient.name.split(' ')[0].charAt(0)}
              </span>
            </div>
            
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-400" />
                  <span className="font-medium">الاسم الكامل</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400">{patient.name}</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="font-medium">العمر</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400">{patient.age} سنة</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-400" />
                  <span className="font-medium">الجنس</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400">{patient.gender}</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="font-medium">رقم الهاتف</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400">{patient.phone}</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="font-medium">البريد الإلكتروني</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400">{patient.email}</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-gray-400" />
                  <span className="font-medium">الحالة</span>
                </div>
                <Badge variant={patient.status === "نشط" ? "default" : "secondary"}>
                  {patient.status}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8 rtl:space-x-reverse">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-lubbmind-500 text-lubbmind-600 dark:text-lubbmind-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                معلومات الاتصال
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="font-medium text-gray-700 dark:text-gray-300">العنوان</label>
                <p className="text-gray-600 dark:text-gray-400">{patient.address}</p>
              </div>
              <div>
                <label className="font-medium text-gray-700 dark:text-gray-300">رقم الهوية</label>
                <p className="text-gray-600 dark:text-gray-400">{patient.nationalId}</p>
              </div>
              <div>
                <label className="font-medium text-gray-700 dark:text-gray-300">جهة الاتصال في الطوارئ</label>
                <p className="text-gray-600 dark:text-gray-400">{patient.emergencyContact}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                المعلومات الطبية
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="font-medium text-gray-700 dark:text-gray-300">فصيلة الدم</label>
                <p className="text-gray-600 dark:text-gray-400">{patient.bloodType}</p>
              </div>
              <div>
                <label className="font-medium text-gray-700 dark:text-gray-300">الحساسية</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {patient.allergies.map((allergy, index) => (
                    <Badge key={index} variant="destructive">{allergy}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <label className="font-medium text-gray-700 dark:text-gray-300">الأمراض المزمنة</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {patient.chronicConditions.map((condition, index) => (
                    <Badge key={index} variant="secondary">{condition}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "history" && (
        <Card>
          <CardHeader>
            <CardTitle>التاريخ الطبي</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {patient.medicalHistory.map((record, index) => (
                <div key={index} className="border-l-4 border-lubbmind-500 pl-4 py-2">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900 dark:text-white">{record.diagnosis}</h4>
                    <span className="text-sm text-gray-500">{record.date}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">الطبيب: {record.doctor}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{record.notes}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "prescriptions" && (
        <Card>
          <CardHeader>
            <CardTitle>الوصفات الطبية</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {patient.prescriptions.map((prescription, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900 dark:text-white">{prescription.medication}</h4>
                    <span className="text-sm text-gray-500">{prescription.date}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">الجرعة: {prescription.dosage}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">المدة: {prescription.duration}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "appointments" && (
        <Card>
          <CardHeader>
            <CardTitle>المواعيد القادمة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {patient.appointments.map((appointment, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900 dark:text-white">{appointment.type}</h4>
                    <Badge variant={appointment.status === "مؤكد" ? "default" : "secondary"}>
                      {appointment.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {appointment.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {appointment.time}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {appointment.doctor}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}