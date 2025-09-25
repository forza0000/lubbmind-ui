"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import AddPatientModal from "@/components/modals/AddPatientModal";
import { 
  Search, 
  UserPlus, 
  Phone, 
  Mail, 
  Calendar,
  FileText,
  MoreHorizontal,
  Filter,
  Download,
  ChevronDown,
  ChevronUp,
  Edit,
  Eye,
  Trash2
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Patients() {
  const { t } = useTranslation();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [isAddPatientModalOpen, setIsAddPatientModalOpen] = useState(false);

  const handleAddPatient = (patientData: any) => {
    console.log("New patient data:", patientData);
    // Here you would typically send the data to your backend API
    // For now, we'll just log it
  };

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

  // Enhanced search functionality
  const filteredPatients = patients.filter(patient => {
    if (!searchTerm.trim()) return true;
    
    const searchLower = searchTerm.toLowerCase().trim();
    return (
      patient.name.toLowerCase().includes(searchLower) ||
      patient.id.toLowerCase().includes(searchLower) ||
      patient.condition.toLowerCase().includes(searchLower) ||
      patient.phone.includes(searchTerm.trim()) ||
      patient.email.toLowerCase().includes(searchLower) ||
      patient.status.toLowerCase().includes(searchLower) ||
      patient.gender.toLowerCase().includes(searchLower)
    );
  });

  // CSV Export functionality
  const handleExportCSV = () => {
    const headers = ['ID', 'Name', 'Age', 'Gender', 'Phone', 'Email', 'Last Visit', 'Condition', 'Status'];
    const csvContent = [
      headers.join(','),
      ...filteredPatients.map(patient => [
        patient.id,
        `"${patient.name}"`,
        patient.age,
        patient.gender,
        patient.phone,
        patient.email,
        patient.lastVisit,
        `"${patient.condition}"`,
        patient.status
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `patients_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleRowExpansion = (patientId: string) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(patientId)) {
      newExpandedRows.delete(patientId);
    } else {
      newExpandedRows.add(patientId);
    }
    setExpandedRows(newExpandedRows);
  };

  const handleViewPatientFile = (patientId: string) => {
    router.push(`/patients/${patientId}`);
  };

  const handleEditPatient = (patientId: string) => {
    // TODO: Implement edit functionality
    alert(`تحرير بيانات المريض ${patientId}`);
  };

  const handleDeletePatient = (patientId: string) => {
    // TODO: Implement delete functionality
    if (confirm('هل أنت متأكد من حذف هذا المريض؟')) {
      alert(`حذف المريض ${patientId}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('patientManagement')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            إدارة ملفات المرضى ومعلوماتهم الطبية
          </p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={handleExportCSV}
          >
            <Download className="h-4 w-4" />
            {t('export')}
          </Button>
          <Button 
            className="flex items-center gap-2"
            onClick={() => setIsAddPatientModalOpen(true)}
          >
            <UserPlus className="h-4 w-4" />
            {t('addPatient')}
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

      {/* Patients Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>قائمة المرضى ({filteredPatients.length})</span>
            <Badge variant="secondary">{filteredPatients.length} من {patients.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Desktop Table View */}
          <div className="hidden lg:block">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-right p-4 font-semibold text-gray-900 dark:text-white">{t('patientName')}</th>
                    <th className="text-right p-4 font-semibold text-gray-900 dark:text-white">{t('id')}</th>
                    <th className="text-right p-4 font-semibold text-gray-900 dark:text-white">{t('phone')}</th>
                    <th className="text-right p-4 font-semibold text-gray-900 dark:text-white">{t('lastVisit')}</th>
                    <th className="text-right p-4 font-semibold text-gray-900 dark:text-white">{t('status')}</th>
                    <th className="text-center p-4 font-semibold text-gray-900 dark:text-white">{t('actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPatients.map((patient) => (
                    <tr key={patient.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 bg-lubbmind-100 dark:bg-lubbmind-900 rounded-full flex items-center justify-center">
                            <span className="text-lubbmind-600 dark:text-lubbmind-400 font-semibold">
                              {patient.name.split(' ')[0].charAt(0)}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">{patient.name}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{patient.age} سنة • {patient.gender}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-gray-600 dark:text-gray-400">{patient.id}</td>
                      <td className="p-4 text-gray-600 dark:text-gray-400 font-mono text-sm">{patient.phone}</td>
                      <td className="p-4 text-gray-600 dark:text-gray-400">{patient.lastVisit}</td>
                      <td className="p-4">
                        <Badge variant={patient.status === "نشط" ? "default" : "secondary"}>
                          {patient.status}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-xs"
                            onClick={() => handleViewPatientFile(patient.id)}
                          >
                            {t('viewFile')}
                          </Button>
                          <Button size="sm" variant="outline" className="text-xs">
                            {t('appointments')}
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewPatientFile(patient.id)}>
                                <Eye className="h-4 w-4 mr-2" />
                                عرض التفاصيل
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEditPatient(patient.id)}>
                                <Edit className="h-4 w-4 mr-2" />
                                تحرير
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleDeletePatient(patient.id)}
                                className="text-red-600 dark:text-red-400"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                حذف
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile/Tablet Card View */}
          <div className="lg:hidden space-y-4">
            {filteredPatients.map((patient) => (
              <div key={patient.id} className="border border-gray-200 dark:border-gray-700 rounded-lg">
                {/* Main Row */}
                <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="h-12 w-12 bg-lubbmind-100 dark:bg-lubbmind-900 rounded-full flex items-center justify-center">
                        <span className="text-lubbmind-600 dark:text-lubbmind-400 font-semibold text-lg">
                          {patient.name.split(' ')[0].charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 dark:text-white truncate">{patient.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{patient.id}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 font-mono">{patient.phone}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={patient.status === "نشط" ? "default" : "secondary"}>
                        {patient.status}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="p-2">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewPatientFile(patient.id)}>
                            <Eye className="h-4 w-4 mr-2" />
                            عرض التفاصيل
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditPatient(patient.id)}>
                            <Edit className="h-4 w-4 mr-2" />
                            تحرير
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDeletePatient(patient.id)}
                            className="text-red-600 dark:text-red-400"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            حذف
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleRowExpansion(patient.id)}
                        className="p-2"
                      >
                        {expandedRows.has(patient.id) ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedRows.has(patient.id) && (
                  <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">العمر: {patient.age} سنة</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">الجنس: {patient.gender}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{patient.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">آخر زيارة: {patient.lastVisit}</span>
                      </div>
                      <div className="flex items-center gap-2 sm:col-span-2">
                        <FileText className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">الحالة الطبية: {patient.condition}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-xs"
                        onClick={() => handleViewPatientFile(patient.id)}
                      >
                        عرض الملف
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs">
                        تحديد موعد
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs">
                        إنشاء وصفة
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add Patient Modal */}
      <AddPatientModal
        isOpen={isAddPatientModalOpen}
        onClose={() => setIsAddPatientModalOpen(false)}
        onSubmit={handleAddPatient}
      />
    </div>
  );
}