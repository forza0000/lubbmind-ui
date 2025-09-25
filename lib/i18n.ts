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
      view: "عرض",
      close: "إغلاق",
      submit: "إرسال",
      
      // Dashboard Cards
      monthlyRevenue: "الإيرادات الشهرية",
      totalPatients: "إجمالي المرضى",
      todayAppointments: "مواعيد اليوم",
      pendingReports: "التقارير المعلقة",
      patientTrends: "اتجاهات المرضى والمواعيد",
      recentActivity: "النشاط الأخير",
      
      // Table Headers
      name: "الاسم",
      patientName: "اسم المريض",
      doctorName: "اسم الطبيب",
      doctor: "الطبيب",
      date: "التاريخ",
      time: "الوقت",
      type: "النوع",
      actions: "الإجراءات",
      id: "المعرف",
      condition: "الحالة",
      medication: "الدواء",
      dosage: "الجرعة",
      frequency: "التكرار",
      
      // Patient Management
      patientManagement: "إدارة المرضى",
      newPatient: "مريض جديد",
      addPatient: "إضافة مريض",
      newAppointment: "موعد جديد",
      addAppointment: "إضافة موعد",
      viewFile: "عرض الملف",
      patientDetails: "تفاصيل المريض",
      patientList: "قائمة المرضى",
      appointmentList: "قائمة المواعيد",
      
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
      reason: "السبب",
      
      // Form Labels
      selectPatient: "اختر المريض",
      selectDoctor: "اختر الطبيب",
      selectDate: "اختر التاريخ",
      selectTime: "اختر الوقت",
      selectStatus: "اختر الحالة",
      selectGender: "اختر الجنس",
      
      // Status Values
      active: "نشط",
      inactive: "غير نشط",
      confirmed: "مؤكد",
      pending: "في الانتظار",
      cancelled: "ملغي",
      completed: "مكتمل",
      
      // Gender Values
      male: "ذكر",
      female: "أنثى",
      
      // Appointment Types
      consultation: "استشارة",
      followUp: "متابعة",
      emergency: "طوارئ",
      checkup: "فحص دوري",
      
      // Messages
      welcome: "مرحباً، د. أحمد",
      patientAdded: "تم إضافة المريض بنجاح",
      appointmentScheduled: "تم تحديد الموعد بنجاح",
      noDataAvailable: "لا توجد بيانات متاحة",
      loading: "جاري التحميل...",
      
      // Tabs
      overview: "نظرة عامة",
      medicalHistory: "التاريخ الطبي",
      prescriptions: "الوصفات",
      appointments: "المواعيد",
      
      // Medical Info
      contactInfo: "معلومات الاتصال",
      medicalInfo: "المعلومات الطبية",
      upcomingAppointments: "المواعيد القادمة",
      
      // Reports
      generateReport: "إنشاء تقرير",
      reportType: "نوع التقرير",
      dateRange: "نطاق التاريخ",
      patientReport: "تقرير المريض",
      appointmentReport: "تقرير المواعيد",
      revenueReport: "تقرير الإيرادات"
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
      view: "View",
      close: "Close",
      submit: "Submit",
      
      // Dashboard Cards
      monthlyRevenue: "Monthly Revenue",
      totalPatients: "Total Patients",
      todayAppointments: "Today's Appointments",
      pendingReports: "Pending Reports",
      patientTrends: "Patient & Appointment Trends",
      recentActivity: "Recent Activity",
      
      // Table Headers
      name: "Name",
      patientName: "Patient Name",
      doctorName: "Doctor Name",
      doctor: "Doctor",
      date: "Date",
      time: "Time",
      type: "Type",
      actions: "Actions",
      id: "ID",
      condition: "Condition",
      medication: "Medication",
      dosage: "Dosage",
      frequency: "Frequency",
      
      // Patient Management
      patientManagement: "Patient Management",
      newPatient: "New Patient",
      addPatient: "Add Patient",
      newAppointment: "New Appointment",
      addAppointment: "Add Appointment",
      viewFile: "View File",
      patientDetails: "Patient Details",
      patientList: "Patient List",
      appointmentList: "Appointment List",
      
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
      reason: "Reason",
      
      // Form Labels
      selectPatient: "Select Patient",
      selectDoctor: "Select Doctor",
      selectDate: "Select Date",
      selectTime: "Select Time",
      selectStatus: "Select Status",
      selectGender: "Select Gender",
      
      // Status Values
      active: "Active",
      inactive: "Inactive",
      confirmed: "Confirmed",
      pending: "Pending",
      cancelled: "Cancelled",
      completed: "Completed",
      
      // Gender Values
      male: "Male",
      female: "Female",
      
      // Appointment Types
      consultation: "Consultation",
      followUp: "Follow-up",
      emergency: "Emergency",
      checkup: "Check-up",
      
      // Messages
      welcome: "Welcome, Dr. Ahmed",
      patientAdded: "Patient added successfully",
      appointmentScheduled: "Appointment scheduled successfully",
      noDataAvailable: "No data available",
      loading: "Loading...",
      
      // Tabs
      overview: "Overview",
      medicalHistory: "Medical History",
      prescriptions: "Prescriptions",
      appointments: "Appointments",
      
      // Medical Info
      contactInfo: "Contact Information",
      medicalInfo: "Medical Information",
      upcomingAppointments: "Upcoming Appointments",
      
      // Reports
      generateReport: "Generate Report",
      reportType: "Report Type",
      dateRange: "Date Range",
      patientReport: "Patient Report",
      appointmentReport: "Appointment Report",
      revenueReport: "Revenue Report"
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
      view: "Voir",
      close: "Fermer",
      submit: "Soumettre",
      
      // Dashboard Cards
      monthlyRevenue: "Revenus mensuels",
      totalPatients: "Total des patients",
      todayAppointments: "Rendez-vous d'aujourd'hui",
      pendingReports: "Rapports en attente",
      patientTrends: "Tendances des patients et rendez-vous",
      recentActivity: "Activité récente",
      
      // Table Headers
      name: "Nom",
      patientName: "Nom du patient",
      doctorName: "Nom du médecin",
      doctor: "Médecin",
      date: "Date",
      time: "Heure",
      type: "Type",
      actions: "Actions",
      id: "ID",
      condition: "Condition",
      medication: "Médicament",
      dosage: "Dosage",
      frequency: "Fréquence",
      
      // Patient Management
      patientManagement: "Gestion des patients",
      newPatient: "Nouveau patient",
      addPatient: "Ajouter un patient",
      newAppointment: "Nouveau rendez-vous",
      addAppointment: "Ajouter un rendez-vous",
      viewFile: "Voir le dossier",
      patientDetails: "Détails du patient",
      patientList: "Liste des patients",
      appointmentList: "Liste des rendez-vous",
      
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
      reason: "Raison",
      
      // Form Labels
      selectPatient: "Sélectionner un patient",
      selectDoctor: "Sélectionner un médecin",
      selectDate: "Sélectionner une date",
      selectTime: "Sélectionner une heure",
      selectStatus: "Sélectionner un statut",
      selectGender: "Sélectionner un sexe",
      
      // Status Values
      active: "Actif",
      inactive: "Inactif",
      confirmed: "Confirmé",
      pending: "En attente",
      cancelled: "Annulé",
      completed: "Terminé",
      
      // Gender Values
      male: "Homme",
      female: "Femme",
      
      // Appointment Types
      consultation: "Consultation",
      followUp: "Suivi",
      emergency: "Urgence",
      checkup: "Examen",
      
      // Messages
      welcome: "Bienvenue, Dr. Ahmed",
      patientAdded: "Patient ajouté avec succès",
      appointmentScheduled: "Rendez-vous programmé avec succès",
      noDataAvailable: "Aucune donnée disponible",
      loading: "Chargement...",
      
      // Tabs
      overview: "Aperçu",
      medicalHistory: "Historique médical",
      prescriptions: "Ordonnances",
      appointments: "Rendez-vous",
      
      // Medical Info
      contactInfo: "Informations de contact",
      medicalInfo: "Informations médicales",
      upcomingAppointments: "Rendez-vous à venir",
      
      // Reports
      generateReport: "Générer un rapport",
      reportType: "Type de rapport",
      dateRange: "Plage de dates",
      patientReport: "Rapport patient",
      appointmentReport: "Rapport de rendez-vous",
      revenueReport: "Rapport de revenus"
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