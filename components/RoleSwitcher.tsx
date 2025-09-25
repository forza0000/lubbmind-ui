"use client";

import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { User, Shield, Stethoscope } from 'lucide-react';

const mockUsers = [
  {
    id: '1',
    name: 'د. سارة أحمد',
    email: 'doctor@clinic.com',
    role: 'doctor' as UserRole,
    specialty: 'طب عام'
  },
  {
    id: '2',
    name: 'أحمد محمد',
    email: 'assistant@clinic.com',
    role: 'assistant' as UserRole
  },
  {
    id: '3',
    name: 'مدير النظام',
    email: 'admin@clinic.com',
    role: 'admin' as UserRole
  }
];

export default function RoleSwitcher() {
  const { user, login } = useAuth();

  const handleRoleChange = async (userId: string) => {
    const selectedUser = mockUsers.find(u => u.id === userId);
    if (selectedUser) {
      await login(selectedUser.email, 'password');
    }
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'doctor':
        return <Stethoscope className="h-4 w-4" />;
      case 'admin':
        return <Shield className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case 'doctor':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'admin':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default:
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    }
  };

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case 'doctor':
        return 'طبيب';
      case 'admin':
        return 'مدير';
      case 'assistant':
        return 'مساعد';
      default:
        return role;
    }
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600 dark:text-gray-400">المستخدم الحالي:</span>
        {user && (
          <Badge className={`flex items-center gap-1 ${getRoleColor(user.role)}`}>
            {getRoleIcon(user.role)}
            {getRoleLabel(user.role)}
          </Badge>
        )}
      </div>
      
      <Select value={user?.id || ''} onValueChange={handleRoleChange}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="اختر المستخدم" />
        </SelectTrigger>
        <SelectContent>
          {mockUsers.map((mockUser) => (
            <SelectItem key={mockUser.id} value={mockUser.id}>
              <div className="flex items-center gap-2">
                {getRoleIcon(mockUser.role)}
                <div className="flex flex-col">
                  <span>{mockUser.name}</span>
                  <span className="text-xs text-gray-500">{getRoleLabel(mockUser.role)}</span>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}