"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PrescriptionsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          الوصفات الطبية
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>إنشاء وصفة جديدة</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400">
              إنشاء وصفة طبية جديدة للمريض
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>الوصفات الحديثة</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400">
              عرض آخر الوصفات الطبية المكتوبة
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>قاعدة بيانات الأدوية</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400">
              البحث في قاعدة بيانات الأدوية
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>قريباً</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400">
            ستتوفر ميزات إدارة الوصفات الطبية قريباً...
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrescriptionsPage;