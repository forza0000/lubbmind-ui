"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import AddPrescriptionModal from "@/components/modals/AddPrescriptionModal";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Pill, 
  Search, 
  Plus, 
  FileText,
  User,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Eye,
  Edit,
  Printer,
  Filter,
  Download,
  Stethoscope,
  Activity
} from "lucide-react";

export default function PrescriptionsPage() {
  const { hasPermission } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [prescriptions, setPrescriptions] = useState(mockPrescriptions);

  const prescriptionStats = [
    {
      title: "إجمالي الوصفات",
      value: "1,247",
      change: "+23",
      trend: "up",
      icon: FileText,
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900"
    },
    {
      title: "وصفات اليوم",
      value: "45",
      change: "+12",
      trend: "up", 
      icon: Calendar,
      color: "bg-green-100 text-green-600 dark:bg-green-900"
    },
    {
      title: "قيد المراجعة",
      value: "8",
      change: "-3",
      trend: "down",
      icon: Clock,
      color: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900"
    },
    {
      title: "مكتملة",
      value: "1,194",
      change: "+18",
      trend: "up",
      icon: CheckCircle,
      color: "bg-purple-100 text-purple-600 dark:bg-purple-900"
    }
  ];

  const mockPrescriptions = [
    {
      id: "RX001",
      patientName: "أحمد محمد علي",
      patientId: "P001",
      doctorName: "د. سارة أحمد",
      date: "2024-01-31",
      time: "10:30 ص",
      status: "مكتملة",
      medications: [
        { name: "أموكسيسيلين 500mg", dosage: "حبة واحدة كل 8 ساعات", duration: "7 أيام" },
        { name: "باراسيتامول 500mg", dosage: "حبة واحدة عند الحاجة", duration: "حسب الحاجة" }
      ],
      diagnosis: "التهاب الحلق",
      notes: "مراجعة بعد أسبوع إذا لم تتحسن الأعراض"
    },
    {
      id: "RX002",
      patientName: "فاطمة عبدالله",
      patientId: "P002",
      doctorName: "د. محمد حسن",
      date: "2024-01-31",
      time: "11:15 ص",
      status: "قيد المراجعة",
      medications: [
        { name: "ميتفورمين 500mg", dosage: "حبة واحدة مرتين يومياً", duration: "شهر واحد" },
        { name: "أتورفاستاتين 20mg", dosage: "حبة واحدة مساءً", duration: "شهر واحد" }
      ],
      diagnosis: "داء السكري النوع الثاني",
      notes: "فحص السكر التراكمي بعد 3 أشهر"
    },
    {
      id: "RX003",
      patientName: "خالد إبراهيم",
      patientId: "P003",
      doctorName: "د. ليلى محمود",
      date: "2024-01-30",
      time: "02:45 م",
      status: "مكتملة",
      medications: [
        { name: "أوميبرازول 20mg", dosage: "حبة واحدة قبل الإفطار", duration: "أسبوعين" },
        { name: "دومبيريدون 10mg", dosage: "حبة واحدة قبل الوجبات", duration: "أسبوع واحد" }
      ],
      diagnosis: "ارتجاع المريء",
      notes: "تجنب الأطعمة الحارة والدهنية"
    },
    {
      id: "RX004",
      patientName: "مريم سالم",
      patientId: "P004",
      doctorName: "د. عمر الزهراني",
      date: "2024-01-30",
      time: "09:20 ص",
      status: "ملغية",
      medications: [
        { name: "إيبوبروفين 400mg", dosage: "حبة واحدة كل 6 ساعات", duration: "3 أيام" }
      ],
      diagnosis: "صداع نصفي",
      notes: "ألغيت بناءً على طلب المريضة - حساسية من الدواء"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "مكتملة":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "قيد المراجعة":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "ملغية":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "مكتملة":
        return <CheckCircle className="h-4 w-4" />;
      case "قيد المراجعة":
        return <Clock className="h-4 w-4" />;
      case "ملغية":
        return <XCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  // Handle prescription creation
  const handleCreatePrescription = (prescriptionData: any) => {
    const newPrescription = {
      id: `RX${String(prescriptions.length + 1).padStart(3, '0')}`,
      patientId: prescriptionData.patientId,
      patientName: prescriptionData.patientName,
      doctorName: prescriptionData.doctorName,
      date: new Date().toLocaleDateString('ar-SA'),
      time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
      status: "قيد المراجعة",
      medications: prescriptionData.medications,
      diagnosis: prescriptionData.diagnosis,
      notes: prescriptionData.notes
    };
    
    setPrescriptions([newPrescription, ...prescriptions]);
    setIsAddModalOpen(false);
  };

  // Filter prescriptions based on search term and status
  const filteredPrescriptions = prescriptions.filter(prescription => {
    const matchesSearch = prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.medications.some(med => med.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = selectedStatus === "all" || prescription.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            الوصفات الطبية
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            إدارة وتتبع الوصفات الطبية والأدوية
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            تصفية
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            تصدير
          </Button>
          {hasPermission('canCreatePrescriptions') && (
             <Button 
               className="flex items-center gap-2"
               onClick={() => setIsAddModalOpen(true)}
             >
               <Plus className="h-4 w-4" />
               وصفة جديدة
             </Button>
           )}
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {prescriptionStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    <p className={`text-sm mt-1 ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                      {stat.change} من الأمس
                    </p>
                  </div>
                  <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="البحث بالاسم، رقم الوصفة، أو اسم الطبيب..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={selectedStatus === "all" ? "default" : "outline"}
                onClick={() => setSelectedStatus("all")}
                size="sm"
              >
                الكل
              </Button>
              <Button
                variant={selectedStatus === "مكتملة" ? "default" : "outline"}
                onClick={() => setSelectedStatus("مكتملة")}
                size="sm"
              >
                مكتملة
              </Button>
              <Button
                variant={selectedStatus === "قيد المراجعة" ? "default" : "outline"}
                onClick={() => setSelectedStatus("قيد المراجعة")}
                size="sm"
              >
                قيد المراجعة
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prescriptions List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Pill className="h-5 w-5" />
              قائمة الوصفات ({filteredPrescriptions.length})
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPrescriptions.map((prescription) => (
              <div key={prescription.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                      <FileText className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{prescription.patientName}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {prescription.patientId}
                        </span>
                        <span className="flex items-center gap-1">
                          <Stethoscope className="h-4 w-4" />
                          {prescription.doctorName}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {prescription.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {prescription.time}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={`flex items-center gap-1 ${getStatusColor(prescription.status)}`}>
                      {getStatusIcon(prescription.status)}
                      {prescription.status}
                    </Badge>
                    <span className="text-sm font-medium text-gray-500">#{prescription.id}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <Pill className="h-4 w-4" />
                      الأدوية المصروفة
                    </h4>
                    <div className="space-y-2">
                      {prescription.medications.map((med, index) => (
                        <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                          <p className="font-medium">{med.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">الجرعة: {med.dosage}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">المدة: {med.duration}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <Activity className="h-4 w-4" />
                      التشخيص والملاحظات
                    </h4>
                    <div className="space-y-3">
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">التشخيص:</p>
                        <p className="font-medium">{prescription.diagnosis}</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">ملاحظات:</p>
                        <p className="text-sm">{prescription.notes}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    عرض
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    تعديل
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Printer className="h-4 w-4 mr-1" />
                    طباعة
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              إجراءات سريعة
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {hasPermission('canCreatePrescriptions') && (
               <Button 
                 className="w-full justify-start" 
                 variant="outline"
                 onClick={() => setIsAddModalOpen(true)}
               >
                 <FileText className="h-4 w-4 mr-2" />
                 إنشاء وصفة جديدة
               </Button>
             )}
            <Button className="w-full justify-start" variant="outline">
              <Search className="h-4 w-4 mr-2" />
              البحث في الأدوية
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              تصدير التقارير
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              تنبيهات مهمة
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <div className="h-2 w-2 bg-red-500 rounded-full"></div>
              <span>8 وصفات تحتاج مراجعة</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
              <span>3 أدوية منتهية الصلاحية</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
              <span>12 وصفة جديدة اليوم</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              إحصائيات سريعة
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>متوسط الوصفات اليومية</span>
              <span className="font-medium">42</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>أكثر الأدوية وصفاً</span>
              <span className="font-medium">باراسيتامول</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>معدل الامتثال</span>
              <span className="font-medium text-green-600">94%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Prescription Modal */}
       <AddPrescriptionModal 
         isOpen={isAddModalOpen}
         onClose={() => setIsAddModalOpen(false)}
         onSubmit={handleCreatePrescription}
       />
    </div>
  );
}