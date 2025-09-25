"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Calendar,
  FileText,
  Download,
  Filter,
  Eye,
  PieChart,
  Activity,
  DollarSign,
  Clock
} from "lucide-react";

export default function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");

  const reportTypes = [
    {
      id: "patients",
      title: "تقرير المرضى",
      description: "إحصائيات شاملة عن المرضى والزيارات",
      icon: Users,
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900",
      count: "1,234 مريض",
      trend: "+12%"
    },
    {
      id: "appointments", 
      title: "تقرير المواعيد",
      description: "تحليل المواعيد والحضور",
      icon: Calendar,
      color: "bg-green-100 text-green-600 dark:bg-green-900",
      count: "456 موعد",
      trend: "+8%"
    },
    {
      id: "prescriptions",
      title: "تقرير الوصفات",
      description: "إحصائيات الوصفات الطبية والأدوية",
      icon: FileText,
      color: "bg-purple-100 text-purple-600 dark:bg-purple-900",
      count: "789 وصفة",
      trend: "+15%"
    },
    {
      id: "revenue",
      title: "تقرير الإيرادات",
      description: "تحليل مالي شامل للعيادة",
      icon: DollarSign,
      color: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900",
      count: "125,450 ر.س",
      trend: "+22%"
    }
  ];

  const recentReports = [
    {
      id: "R001",
      name: "تقرير المرضى الشهري - يناير 2024",
      type: "مرضى",
      generatedDate: "2024-01-31",
      status: "مكتمل",
      size: "2.4 MB"
    },
    {
      id: "R002", 
      name: "تحليل الإيرادات - الربع الأول",
      type: "مالي",
      generatedDate: "2024-01-30",
      status: "مكتمل",
      size: "1.8 MB"
    },
    {
      id: "R003",
      name: "تقرير المواعيد الأسبوعي",
      type: "مواعيد",
      generatedDate: "2024-01-29",
      status: "قيد المعالجة",
      size: "0.9 MB"
    },
    {
      id: "R004",
      name: "إحصائيات الوصفات الطبية",
      type: "وصفات",
      generatedDate: "2024-01-28",
      status: "مكتمل",
      size: "3.2 MB"
    }
  ];

  const analyticsData = [
    {
      title: "معدل الحضور",
      value: "87%",
      change: "+5%",
      trend: "up",
      description: "من إجمالي المواعيد المحجوزة"
    },
    {
      title: "متوسط وقت الانتظار",
      value: "12 دقيقة",
      change: "-3 دقائق",
      trend: "down",
      description: "تحسن في إدارة الوقت"
    },
    {
      title: "رضا المرضى",
      value: "4.8/5",
      change: "+0.2",
      trend: "up",
      description: "بناءً على التقييمات الأخيرة"
    },
    {
      title: "معدل العودة",
      value: "73%",
      change: "+8%",
      trend: "up",
      description: "المرضى الذين عادوا للعيادة"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            التقارير والإحصائيات
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            تحليل شامل لأداء العيادة والبيانات الطبية
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            تصفية
          </Button>
          <Button className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            تصدير التقارير
          </Button>
        </div>
      </div>

      {/* Quick Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analyticsData.map((item, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{item.title}</p>
                  <p className="text-2xl font-bold mt-1">{item.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                </div>
                <div className={`flex items-center gap-1 text-sm ${
                  item.trend === "up" ? "text-green-600" : "text-red-600"
                }`}>
                  <TrendingUp className={`h-4 w-4 ${item.trend === "down" ? "rotate-180" : ""}`} />
                  <span>{item.change}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Report Types */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            أنواع التقارير المتاحة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reportTypes.map((report) => {
              const IconComponent = report.icon;
              return (
                <div key={report.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${report.color}`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{report.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{report.description}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-sm font-medium">{report.count}</span>
                          <span className="text-sm text-green-600">{report.trend}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        عرض
                      </Button>
                      <Button size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        تحميل
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              التقارير الأخيرة
            </span>
            <Badge variant="secondary">{recentReports.length} تقارير</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">{report.name}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <span>النوع: {report.type}</span>
                      <span>التاريخ: {report.generatedDate}</span>
                      <span>الحجم: {report.size}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={report.status === "مكتمل" ? "default" : "secondary"}>
                    {report.status}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              توزيع المرضى حسب العمر
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <PieChart className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">مخطط دائري - توزيع الأعمار</p>
                <p className="text-sm text-gray-400">سيتم إضافة البيانات قريباً</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              نشاط العيادة الشهري
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">مخطط بياني - النشاط الشهري</p>
                <p className="text-sm text-gray-400">سيتم إضافة البيانات قريباً</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}