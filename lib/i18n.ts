import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  ar: {
    translation: {
      // Navigation
      dashboard: "لوحة التحكم",
      patients: "المرضى",
      appointments: "المواعيد",
      prescriptions: "الوصفات",
      reports: "التقارير",
      
      // Common Actions
      add: "إضافة",
      edit: "تعديل",
      delete: "حذف",
      save: "حفظ",
      cancel: "إلغاء",
      search: "بحث",
      filter: "تصفية",
      export: "تصدير",
      print: "طباعة",
      back: "العودة",
      
      // Patient Management
      patientManagement: "إدارة المرضى",
      newPatient: "مريض جديد",
      newAppointment: "موعد جديد",
      viewFile: "عرض الملف",
      patientDetails: "تفاصيل المريض",
      
      // Patient Form Fields
      fullName: "الاسم الكامل",
      age: "العمر",
      gender: "الجنس",
      phone: "رقم الهاتف",
      email: "البريد الإلكتروني",
      address: "العنوان",
      nationalId: "رقم الهوية",
      emergencyContact: "جهة الاتصال في الطوارئ",
      bloodType: "فصيلة الدم",
      allergies: "الحساسية",
      chronicConditions: "الأمراض المزمنة",
      lastVisit: "آخر زيارة",
      status: "الحالة",
      medicalCondition: "الحالة الطبية",
      
      // Appointment Fields
      appointmentDate: "تاريخ الموعد",
      appointmentTime: "وقت الموعد",
      appointmentType: "نوع الموعد",
      duration: "المدة",
      urgency: "الأولوية",
      notes: "ملاحظات",
      
      // Status Values
      active: "نشط",
      inactive: "غير نشط",
      confirmed: "مؤكد",
      pending: "في الانتظار",
      cancelled: "ملغي",
      
      // Gender Values
      male: "ذكر",
      female: "أنثى",
      
      // Messages
      welcome: "مرحباً، د. أحمد",
      patientAdded: "تم إضافة المريض بنجاح",
      appointmentScheduled: "تم تحديد الموعد بنجاح",
      
      // Tabs
      overview: "نظرة عامة",
      medicalHistory: "التاريخ الطبي",
      prescriptions: "الوصفات",
      appointments: "المواعيد",
      
      // Medical Info
      contactInfo: "معلومات الاتصال",
      medicalInfo: "المعلومات الطبية",
      upcomingAppointments: "المواعيد القادمة"
    }
  },
  en: {
    translation: {
      // Navigation
      dashboard: "Dashboard",
      patients: "Patients",
      appointments: "Appointments",
      prescriptions: "Prescriptions",
      reports: "Reports",
      
      // Common Actions
      add: "Add",
      edit: "Edit",
      delete: "Delete",
      save: "Save",
      cancel: "Cancel",
      search: "Search",
      filter: "Filter",
      export: "Export",
      print: "Print",
      back: "Back",
      
      // Patient Management
      patientManagement: "Patient Management",
      newPatient: "New Patient",
      newAppointment: "New Appointment",
      viewFile: "View File",
      patientDetails: "Patient Details",
      
      // Patient Form Fields
      fullName: "Full Name",
      age: "Age",
      gender: "Gender",
      phone: "Phone Number",
      email: "Email",
      address: "Address",
      nationalId: "National ID",
      emergencyContact: "Emergency Contact",
      bloodType: "Blood Type",
      allergies: "Allergies",
      chronicConditions: "Chronic Conditions",
      lastVisit: "Last Visit",
      status: "Status",
      medicalCondition: "Medical Condition",
      
      // Appointment Fields
      appointmentDate: "Appointment Date",
      appointmentTime: "Appointment Time",
      appointmentType: "Appointment Type",
      duration: "Duration",
      urgency: "Urgency",
      notes: "Notes",
      
      // Status Values
      active: "Active",
      inactive: "Inactive",
      confirmed: "Confirmed",
      pending: "Pending",
      cancelled: "Cancelled",
      
      // Gender Values
      male: "Male",
      female: "Female",
      
      // Messages
      welcome: "Welcome, Dr. Ahmed",
      patientAdded: "Patient added successfully",
      appointmentScheduled: "Appointment scheduled successfully",
      
      // Tabs
      overview: "Overview",
      medicalHistory: "Medical History",
      prescriptions: "Prescriptions",
      appointments: "Appointments",
      
      // Medical Info
      contactInfo: "Contact Information",
      medicalInfo: "Medical Information",
      upcomingAppointments: "Upcoming Appointments"
    }
  },
  fr: {
    translation: {
      // Navigation
      dashboard: "Tableau de bord",
      patients: "Patients",
      appointments: "Rendez-vous",
      prescriptions: "Ordonnances",
      reports: "Rapports",
      
      // Common Actions
      add: "Ajouter",
      edit: "Modifier",
      delete: "Supprimer",
      save: "Enregistrer",
      cancel: "Annuler",
      search: "Rechercher",
      filter: "Filtrer",
      export: "Exporter",
      print: "Imprimer",
      back: "Retour",
      
      // Patient Management
      patientManagement: "Gestion des patients",
      newPatient: "Nouveau patient",
      newAppointment: "Nouveau rendez-vous",
      viewFile: "Voir le dossier",
      patientDetails: "Détails du patient",
      
      // Patient Form Fields
      fullName: "Nom complet",
      age: "Âge",
      gender: "Sexe",
      phone: "Numéro de téléphone",
      email: "Email",
      address: "Adresse",
      nationalId: "Numéro d'identité",
      emergencyContact: "Contact d'urgence",
      bloodType: "Groupe sanguin",
      allergies: "Allergies",
      chronicConditions: "Maladies chroniques",
      lastVisit: "Dernière visite",
      status: "Statut",
      medicalCondition: "Condition médicale",
      
      // Appointment Fields
      appointmentDate: "Date du rendez-vous",
      appointmentTime: "Heure du rendez-vous",
      appointmentType: "Type de rendez-vous",
      duration: "Durée",
      urgency: "Urgence",
      notes: "Notes",
      
      // Status Values
      active: "Actif",
      inactive: "Inactif",
      confirmed: "Confirmé",
      pending: "En attente",
      cancelled: "Annulé",
      
      // Gender Values
      male: "Homme",
      female: "Femme",
      
      // Messages
      welcome: "Bienvenue, Dr. Ahmed",
      patientAdded: "Patient ajouté avec succès",
      appointmentScheduled: "Rendez-vous programmé avec succès",
      
      // Tabs
      overview: "Aperçu",
      medicalHistory: "Historique médical",
      prescriptions: "Ordonnances",
      appointments: "Rendez-vous",
      
      // Medical Info
      contactInfo: "Informations de contact",
      medicalInfo: "Informations médicales",
      upcomingAppointments: "Rendez-vous à venir"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ar', // Default to Arabic
    lng: 'ar', // Default language
    
    interpolation: {
      escapeValue: false, // React already does escaping
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;