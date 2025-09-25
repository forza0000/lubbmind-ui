"use client";

import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AddPatientModal from "@/components/modals/AddPatientModal";
import AddAppointmentModal from "@/components/modals/AddAppointmentModal";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area
} from "recharts";
import {
  Users,
  Calendar,
  FileText,
  TrendingUp,
  Activity,
  Clock,
  Stethoscope,
  PieChart,
  DollarSign,
  UserPlus,
  CalendarPlus,
  BarChart3
} from "lucide-react";

export default function Dashboard() {
  const { t } = useTranslation();
  const [isAddPatientModalOpen, setIsAddPatientModalOpen] = useState(false);
  const [isAddAppointmentModalOpen, setIsAddAppointmentModalOpen] = useState(false);

  // Sample data - in a real app, this would come from your API/database
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
      status: "نشط",
      createdAt: "2024-01-01"
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
      status: "نشط",
      createdAt: "2024-01-05"
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
      status: "نشط",
      createdAt: "2024-01-08"
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
      status: "متابعة",
      createdAt: "2023-12-20"
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
      status: "نشط",
      createdAt: "2024-01-12"
    }
  ];

  const appointments = [
    {
      id: "1",
      appointmentId: "A001",
      patientName: "أحمد محمد علي",
      doctorName: "د. سارة أحمد",
      date: "2024-01-20",
      time: "09:30",
      status: "Scheduled",
      type: "فحص دوري",
      createdAt: "2024-01-15"
    },
    {
      id: "2",
      appointmentId: "A002",
      patientName: "فاطمة عبدالله",
      doctorName: "د. محمد حسن",
      date: "2024-01-20",
      time: "10:00",
      status: "Completed",
      type: "استشارة",
      createdAt: "2024-01-14"
    },
    {
      id: "3",
      appointmentId: "A003",
      patientName: "محمد سعد الدين",
      doctorName: "د. نورا علي",
      date: "2024-01-21",
      time: "14:30",
      status: "Scheduled",
      type: "متابعة",
      createdAt: "2024-01-16"
    },
    {
      id: "4",
      appointmentId: "A004",
      patientName: "نورا حسن",
      doctorName: "د. أحمد محمود",
      date: "2024-01-19",
      time: "11:00",
      status: "Cancelled",
      type: "فحص أولي",
      createdAt: "2024-01-10"
    },
    {
      id: "5",
      appointmentId: "A005",
      patientName: "علي عبدالرحمن",
      doctorName: "د. سارة أحمد",
      date: "2024-01-18",
      time: "15:00",
      status: "No-show",
      type: "فحص دوري",
      createdAt: "2024-01-12"
    }
  ];

  // Calculate dynamic statistics
  const statistics = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    // Total patients
    const totalPatients = patients.length;

    // Today's appointments
    const todaysAppointments = appointments.filter(apt => apt.date === today).length;

    // Active prescriptions (mock data - would come from prescriptions table)
    const activePrescriptions = 89; // This would be calculated from actual prescription data

    // Monthly revenue (mock calculation)
    const completedAppointments = appointments.filter(apt => apt.status === "Completed");
    const monthlyRevenue = completedAppointments.length * 150; // 150 SAR per appointment average

    // New patients this month
    const newPatientsThisMonth = patients.filter(patient => {
      const createdDate = new Date(patient.createdAt);
      return createdDate.getMonth() === currentMonth && createdDate.getFullYear() === currentYear;
    }).length;

    // Active patients
    const activePatients = patients.filter(patient => patient.status === "نشط").length;

    // Follow-up patients
    const followUpPatients = patients.filter(patient => patient.status === "متابعة").length;

    return {
      totalPatients,
      todaysAppointments,
      activePrescriptions,
      monthlyRevenue,
      newPatientsThisMonth,
      activePatients,
      followUpPatients
    };
  }, [patients, appointments]);

  // Helper function to get relative time
  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `منذ ${diffInMinutes} دقيقة`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `منذ ${hours} ساعة`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `منذ ${days} يوم`;
    }
  };

  // Recent activities based on actual data
  const recentActivities = useMemo(() => {
    const activities = [];
    
    // Add recent appointments
    const recentAppointments = appointments
      .filter(apt => apt.status === "Completed")
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 2);
    
    recentAppointments.forEach(apt => {
      activities.push({
        action: "تم إكمال موعد",
        patient: apt.patientName,
        time: getRelativeTime(apt.createdAt),
        type: "appointment"
      });
    });

    // Add recent patient registrations
    const recentPatients = patients
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 1);
    
    recentPatients.forEach(patient => {
      activities.push({
        action: "تم تسجيل مريض جديد",
        patient: patient.name,
        time: getRelativeTime(patient.createdAt),
        type: "patient"
      });
    });

    return activities.slice(0, 3);
  }, [patients, appointments]);

  const handleAddPatient = (patientData: any) => {
    console.log("New patient data:", patientData);
    alert("تم إضافة المريض بنجاح!");
  };

  const handleAddAppointment = (appointmentData: any) => {
    console.log("New appointment data:", appointmentData);
    alert("تم إضافة الموعد بنجاح!");
  };

  // Chart data
  const patientTrendData = [
    { month: "يناير", patients: 120, appointments: 180 },
    { month: "فبراير", patients: 135, appointments: 195 },
    { month: "مارس", patients: 148, appointments: 210 },
    { month: "أبريل", patients: 162, appointments: 225 },
    { month: "مايو", patients: 175, appointments: 240 },
    { month: "يونيو", patients: 190, appointments: 260 },
  ];

  const appointmentStatusData = [
    { name: "مكتملة", value: 65, color: "#10B981" },
    { name: "مجدولة", value: 25, color: "#0EA5E9" },
    { name: "ملغية", value: 10, color: "#F59E0B" },
  ];

  const revenueData = [
    { day: "السبت", revenue: 4500 },
    { day: "الأحد", revenue: 5200 },
    { day: "الاثنين", revenue: 4800 },
    { day: "الثلاثاء", revenue: 6100 },
    { day: "الأربعاء", revenue: 5500 },
    { day: "الخميس", revenue: 4900 },
    { day: "الجمعة", revenue: 3200 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('dashboard')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {t('welcome')}
          </p>
        </div>
        <div className="flex gap-3">
          <Button 
            className="flex items-center gap-2"
            onClick={() => setIsAddPatientModalOpen(true)}
          >
            <UserPlus className="h-4 w-4" />
            {t('addPatient')}
          </Button>
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => setIsAddAppointmentModalOpen(true)}
          >
            <CalendarPlus className="h-4 w-4" />
            {t('addAppointment')}
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('totalPatients')}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.totalPatients.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">{statistics.newPatientsThisMonth}</span> مرضى جدد هذا الشهر
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('todayAppointments')}</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.todaysAppointments}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-blue-600">{appointments.filter(apt => apt.status === "Scheduled").length}</span> مواعيد مجدولة
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('prescriptions')}</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.activePrescriptions}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">{statistics.activePatients}</span> مرضى نشطون
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('monthlyRevenue')}</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.monthlyRevenue.toLocaleString()} ر.س</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">{appointments.filter(apt => apt.status === "Completed").length}</span> مواعيد مكتملة
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient Trends Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              {t('patientTrends')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={patientTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="patients" 
                  stroke="#0EA5E9" 
                  strokeWidth={2}
                  name="المرضى"
                />
                <Line 
                  type="monotone" 
                  dataKey="appointments" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  name="المواعيد"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Appointment Status Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              حالة المواعيد
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={appointmentStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {appointmentStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            الإيرادات الأسبوعية
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value} ر.س`, "الإيرادات"]} />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#0EA5E9" 
                fill="#0EA5E9" 
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Appointments */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              المواعيد القادمة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { time: "09:00", patient: "أحمد محمد", type: "فحص دوري", status: "مؤكد" },
                { time: "10:30", patient: "فاطمة علي", type: "استشارة", status: "في الانتظار" },
                { time: "11:15", patient: "محمد سالم", type: "متابعة", status: "مؤكد" },
                { time: "14:00", patient: "نورا أحمد", type: "فحص أولي", status: "جديد" },
              ].map((appointment, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="text-sm font-medium text-blue-600">{appointment.time}</div>
                    <div>
                      <div className="font-medium">{appointment.patient}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{appointment.type}</div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    appointment.status === "مؤكد" ? "bg-green-100 text-green-800" :
                    appointment.status === "في الانتظار" ? "bg-yellow-100 text-yellow-800" :
                    "bg-blue-100 text-blue-800"
                  }`}>
                    {appointment.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions & Recent Activity */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                إجراءات سريعة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start gap-2"
                onClick={() => setIsAddPatientModalOpen(true)}
              >
                <Stethoscope className="h-4 w-4" />
                بدء فحص جديد
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start gap-2"
                onClick={() => alert("سيتم إضافة وظيفة إنشاء الوصفات الطبية قريباً")}
              >
                <FileText className="h-4 w-4" />
                إنشاء وصفة طبية
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start gap-2"
                onClick={() => window.location.href = '/patients'}
              >
                <Users className="h-4 w-4" />
                عرض قائمة المرضى
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start gap-2"
                onClick={() => setIsAddAppointmentModalOpen(true)}
              >
                <Calendar className="h-4 w-4" />
                جدولة موعد
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>النشاط الأخير</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivities.length > 0 ? recentActivities.map((activity, index) => (
                  <div key={index} className="text-sm">
                    <div className="font-medium">{activity.action}</div>
                    <div className="text-gray-600 dark:text-gray-400">
                      {activity.patient} • {activity.time}
                    </div>
                  </div>
                )) : (
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    لا توجد أنشطة حديثة
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Patient Modal */}
      <AddPatientModal
        isOpen={isAddPatientModalOpen}
        onClose={() => setIsAddPatientModalOpen(false)}
        onSubmit={handleAddPatient}
      />
      
      <AddAppointmentModal
        isOpen={isAddAppointmentModalOpen}
        onClose={() => setIsAddAppointmentModalOpen(false)}
        onSubmit={handleAddAppointment}
      />
    </div>
  );
}
