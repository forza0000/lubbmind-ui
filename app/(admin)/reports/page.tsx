"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ReportsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          التقارير
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>تقرير المرضى</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400">
              عرض إحصائيات وتقارير المرضى
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>تقرير المواعيد</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400">
              عرض إحصائيات وتقارير المواعيد
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>التقرير المالي</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400">
              عرض التقارير المالية والإيرادات
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
            ستتوفر المزيد من التقارير والإحصائيات قريباً...
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsPage;