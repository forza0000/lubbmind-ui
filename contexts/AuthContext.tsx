"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'doctor' | 'assistant' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  specialty?: string; // For doctors
}

export interface Permission {
  canViewPatients: boolean;
  canEditPatients: boolean;
  canViewAppointments: boolean;
  canEditAppointments: boolean;
  canViewPrescriptions: boolean;
  canCreatePrescriptions: boolean;
  canEditPrescriptions: boolean;
  canViewReports: boolean;
  canExportReports: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  permissions: Permission;
  hasPermission: (permission: keyof Permission) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define permissions for each role
const rolePermissions: Record<UserRole, Permission> = {
  admin: {
    canViewPatients: true,
    canEditPatients: true,
    canViewAppointments: true,
    canEditAppointments: true,
    canViewPrescriptions: true,
    canCreatePrescriptions: true,
    canEditPrescriptions: true,
    canViewReports: true,
    canExportReports: true,
  },
  doctor: {
    canViewPatients: true,
    canEditPatients: true,
    canViewAppointments: true,
    canEditAppointments: true,
    canViewPrescriptions: true,
    canCreatePrescriptions: true,
    canEditPrescriptions: true,
    canViewReports: true,
    canExportReports: true,
  },
  assistant: {
    canViewPatients: true,
    canEditPatients: true,
    canViewAppointments: true,
    canEditAppointments: true,
    canViewPrescriptions: true,
    canCreatePrescriptions: false, // Assistants cannot create prescriptions
    canEditPrescriptions: false,   // Assistants cannot edit prescriptions
    canViewReports: false,         // Assistants cannot view reports
    canExportReports: false,       // Assistants cannot export reports
  },
};

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    name: 'د. سارة أحمد',
    email: 'doctor@clinic.com',
    role: 'doctor',
    specialty: 'طب عام'
  },
  {
    id: '2',
    name: 'أحمد محمد',
    email: 'assistant@clinic.com',
    role: 'assistant'
  },
  {
    id: '3',
    name: 'مدير النظام',
    email: 'admin@clinic.com',
    role: 'admin'
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  // For demo purposes, start with a doctor user
  const [user, setUser] = useState<User | null>(mockUsers[0]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - in real app, this would call an API
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const permissions = user ? rolePermissions[user.role] : rolePermissions.assistant;

  const hasPermission = (permission: keyof Permission): boolean => {
    return permissions[permission];
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      permissions,
      hasPermission
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Higher-order component for protecting routes based on permissions
export function withPermission<T extends object>(
  Component: React.ComponentType<T>,
  requiredPermission: keyof Permission
) {
  return function ProtectedComponent(props: T) {
    const { hasPermission } = useAuth();
    
    if (!hasPermission(requiredPermission)) {
      return (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              غير مصرح لك بالوصول
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              ليس لديك الصلاحية للوصول إلى هذه الصفحة
            </p>
          </div>
        </div>
      );
    }
    
    return <Component {...props} />;
  };
}