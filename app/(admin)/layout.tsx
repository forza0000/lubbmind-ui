"use client";

import React from "react";
import { useSidebar } from "@/context/SidebarContext";
import AppHeader from "@/layout/AppHeader";
import AppSidebar from "@/layout/AppSidebar";
import Backdrop from "@/layout/Backdrop";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  return (
    <div className="flex h-screen bg-background">
      <AppSidebar />
      <Backdrop />
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ease-in-out ${
          isExpanded || isHovered || isMobileOpen
            ? "lg:ml-64"
            : "lg:ml-20"
        }`}
      >
        <AppHeader />
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;