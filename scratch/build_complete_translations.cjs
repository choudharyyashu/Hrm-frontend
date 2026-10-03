const fs = require('fs');

// We will construct the dictionary for all 5 languages
// Let's load the current translations.js
const currentContent = fs.readFileSync('src/config/translations.js', 'utf8');

// We can import or parse the current object
const match = currentContent.match(/export const TRANSLATIONS = (\{[\s\S]*?\});\n\n\/\*\*/);
if (!match) {
  console.error('Match failed');
  process.exit(1);
}

// Function to safely evaluate object
const TRANSLATIONS = Function('"use strict";return (' + match[1] + ')')();

console.log('Original keys count:');
console.log('en:', Object.keys(TRANSLATIONS.en).length);
console.log('hi:', Object.keys(TRANSLATIONS.hi).length);
console.log('es:', Object.keys(TRANSLATIONS.es).length);
console.log('de:', Object.keys(TRANSLATIONS.de).length);
console.log('ar:', Object.keys(TRANSLATIONS.ar).length);

// Dictionary of translations for all keys across the platform
const dictionary = {
  // Settings & Navigation & Badges
  'System Settings': {
    hi: 'सिस्टम सेटिंग्स',
    es: 'Ajustes del Sistema',
    de: 'Systemeinstellungen',
    ar: 'إعدادات النظام'
  },
  'Platform Settings': {
    hi: 'प्लेटफ़ॉर्म सेटिंग्स',
    es: 'Ajustes de Plataforma',
    de: 'Plattformeinstellungen',
    ar: 'إعدادات المنصة'
  },
  'Manage your biometric integration and payroll business rules.': {
    hi: 'अपनी बायोमेट्रिक एकीकरण और पेरोल व्यावसायिक नियमों को प्रबंधित करें।',
    es: 'Gestione su integración biométrica y las reglas de nómina.',
    de: 'Verwalten Sie Ihre biometrische Integration und Abrechnungsregeln.',
    ar: 'إدارة التكامل البيومتري وقواعد الرواتب الخاصة بك.'
  },
  'Save Changes': {
    hi: 'परिवर्तन सहेजें',
    es: 'Guardar Cambios',
    de: 'Änderungen speichern',
    ar: 'حفظ التغييرات'
  },
  'SAVE CHANGES': {
    hi: 'परिवर्तन सहेजें',
    es: 'GUARDAR CAMBIOS',
    de: 'ÄNDERUNGEN SPEICHERN',
    ar: 'حفظ التغييرات'
  },
  'Saved!': {
    hi: 'सहेजा गया!',
    es: '¡Guardado!',
    de: 'Gespeichert!',
    ar: 'تم الحفظ!'
  },
  'Saving...': {
    hi: 'सहेजा जा रहा है...',
    es: 'Guardando...',
    de: 'Wird gespeichert...',
    ar: 'جارٍ الحفظ...'
  },
  'Payroll & Rules': {
    hi: 'पेरोल और नियम',
    es: 'Nómina y Reglas',
    de: 'Gehaltsabrechnung & Regeln',
    ar: 'الرواتب والقواعد'
  },
  'Business Profile': {
    hi: 'व्यावसायिक प्रोफ़ाइल',
    es: 'Perfil de Empresa',
    de: 'Unternehmensprofil',
    ar: 'الملف التعريفي للشركة'
  },
  'Email SMTP Settings': {
    hi: 'ईमेल एसएमटीपी सेटिंग्स',
    es: 'Ajustes SMTP de Correo',
    de: 'E-Mail-SMTP-Einstellungen',
    ar: 'إعدادات خادم البريد SMTP'
  },
  'WhatsApp Connectivity': {
    hi: 'व्हाट्सएप कनेक्टिविटी',
    es: 'Conectividad de WhatsApp',
    de: 'WhatsApp-Konnektivität',
    ar: 'الربط مع واتساب'
  },
  'Announcements & Messaging': {
    hi: 'घोषणाएं और संदेश',
    es: 'Anuncios y Mensajería',
    de: 'Ankündigungen & Benachrichtigungen',
    ar: 'الإعلانات والرسائل'
  },
  'Notifications & Alerts': {
    hi: 'सूचनाएं और अलर्ट',
    es: 'Notificaciones y Alertas',
    de: 'Benachrichtigungen & Hinweise',
    ar: 'الإشعارات والتنبيهات'
  },
  'Subscription & Billing': {
    hi: 'सदस्यता और बिलिंग',
    es: 'Suscripción y Facturación',
    de: 'Abonnement & Abrechnung',
    ar: 'الاشتراك والفواتير'
  },
  'Attendance & Payout Logic': {
    hi: 'उपस्थिति व भुगतान नियम',
    es: 'Lógica de Asistencia y Pagos',
    de: 'Anwesenheits- & Auszahlungslogik',
    ar: 'منطق الحضور وصرف الرواتب'
  },
  'Business rules for salary calculation': {
    hi: 'वेतन गणना के लिए व्यावसायिक नियम',
    es: 'Reglas de negocio para el cálculo salarial',
    de: 'Geschäftsregeln für die Gehaltsberechnung',
    ar: 'قواعد العمل لحساب الرواتب'
  },
  'BUSINESS RULES FOR SALARY CALCULATION': {
    hi: 'वेतन गणना के लिए व्यावसायिक नियम',
    es: 'REGLAS DE NEGOCIO PARA EL CÁLCULO SALARIAL',
    de: 'GESCHÄFTSREGELN FÜR DIE GEHALTSBERECHNUNG',
    ar: 'قواعد العمل لحساب الرواتب'
  },
  'Automatic Late Deduction': {
    hi: 'स्वचालित देरी कटौती',
    es: 'Deducción Automática por Tardanza',
    de: 'Automatische Verspätungsabzüge',
    ar: 'الخصم التلقائي للتأخير'
  },
  'Enable 15-minute buffer before deducting half-day or late fine.': {
    hi: 'आधा दिन या देर से जुर्माना काटने से पहले 15 मिनट का बफर सक्षम करें।',
    es: 'Habilitar margen de 15 minutos antes de deducir medio día o multa por retraso.',
    de: 'Aktivieren Sie 15 Min. Puffer vor Abzug von halbem Tag oder Verspätungsstrafe.',
    ar: 'تفعيل فترة سماح 15 دقيقة قبل خصم نصف يوم أو غرامة التأخير.'
  },
  'Late Penalty Amount': {
    hi: 'देरी जुर्माना राशि',
    es: 'Monto de Multa por Tardanza',
    de: 'Verspätungsstrafe Betrag',
    ar: 'مبلغ غرامة التأخير'
  },
  'Amount to deduct per late arrival.': {
    hi: 'प्रति देर आगमन पर काटी जाने वाली राशि।',
    es: 'Monto a deducir por cada llegada tardía.',
    de: 'Betrag, der pro verspäteter Ankunft abgezogen wird.',
    ar: 'المبلغ المخصوم عن كل تأخير.'
  },
  'Grace Period (Minutes)': {
    hi: 'छूट अवधि (मिनट)',
    es: 'Período de Gracia (Minutos)',
    de: 'Kulanzzeit (Minuten)',
    ar: 'فترة السماح (بالدقائق)'
  },
  'Allowed buffer time before late deduction applies.': {
    hi: 'देर से कटौती लागू होने से पहले अनुमत बफर समय।',
    es: 'Tiempo de margen permitido antes de aplicar deducción por tardanza.',
    de: 'Zulässige Pufferzeit vor Inkrafttreten des Verspätungsabzugs.',
    ar: 'الوقت المسموح به قبل تطبيق خصم التأخير.'
  },
  'Salary Payout Cycle': {
    hi: 'वेतन भुगतान चक्र',
    es: 'Ciclo de Pago Salarial',
    de: 'Gehaltsauszahlungszyklus',
    ar: 'دورة صرف الرواتب'
  },
  'SALARY PAYOUT CYCLE': {
    hi: 'वेतन भुगतान चक्र',
    es: 'CICLO DE PAGO SALARIAL',
    de: 'GEHALTSAUSZAHLUNGSZYKLUS',
    ar: 'دورة صرف الرواتب'
  },
  '15 Days Cycle': {
    hi: '15 दिनों का चक्र',
    es: 'Ciclo de 15 Días',
    de: '15-Tage-Zyklus',
    ar: 'دورة 15 يوماً'
  },
  'Monthly (1st to 30th)': {
    hi: 'मासिक (1 से 30)',
    es: 'Mensual (1 al 30)',
    de: 'Monatlich (1. bis 30.)',
    ar: 'شهري (من 1 إلى 30)'
  },
  'Weekly Payout': {
    hi: 'साप्ताहिक भुगतान',
    es: 'Pago Semanal',
    de: 'Wöchentliche Auszahlung',
    ar: 'صرف أسبوعي'
  },
  'Salary Cycle Start Date': {
    hi: 'वेतन चक्र प्रारंभ तिथि',
    es: 'Fecha de Inicio del Ciclo',
    de: 'Startdatum des Gehaltszyklus',
    ar: 'تاريخ بدء دورة الرواتب'
  },
  'SALARY CYCLE START DATE': {
    hi: 'वेतन चक्र प्रारंभ तिथि',
    es: 'FECHA DE INICIO DEL CICLO',
    de: 'STARTDATUM DES GEHALTSZYKLUS',
    ar: 'تاريخ بدء دورة الرواتب'
  },
  'OT (Overtime) Multiplier': {
    hi: 'ओटी (ओवरटाइम) गुणक',
    es: 'Multiplicador de Horas Extras',
    de: 'Überstunden-Multiplikator',
    ar: 'معامل الساعات الإضافية (أوفرتايم)'
  },
  'OT (OVERTIME) MULTIPLIER': {
    hi: 'ओटी (ओवरटाइम) गुणक',
    es: 'MULTIPLICADOR DE HORAS EXTRAS',
    de: 'ÜBERSTUNDEN-MULTIPLIKATOR',
    ar: 'معامل الساعات الإضافية (أوفرتايم)'
  },
  'Standard Start Time': {
    hi: 'मानक प्रारंभ समय',
    es: 'Hora de Inicio Estándar',
    de: 'Standard-Startzeit',
    ar: 'وقت بدء العمل الرسمي'
  },
  'STANDARD START TIME': {
    hi: 'मानक प्रारंभ समय',
    es: 'HORA DE INICIO ESTÁNDAR',
    de: 'STANDARD-STARTZEIT',
    ar: 'وقت بدء العمل الرسمي'
  },
  'Standard End Time': {
    hi: 'मानक समाप्ति समय',
    es: 'Hora de Fin Estándar',
    de: 'Standard-Endzeit',
    ar: 'وقت نهاية العمل الرسمي'
  },
  'STANDARD END TIME': {
    hi: 'मानक समाप्ति समय',
    es: 'HORA DE FIN ESTÁNDAR',
    de: 'STANDARD-ENDZEIT',
    ar: 'وقت نهاية العمل الرسمي'
  },
  'Weekend Off-Days': {
    hi: 'सप्ताहांत अवकाश के दिन',
    es: 'Días de Fin de Semana',
    de: 'Wochenend-Ruhetage',
    ar: 'أيام العطلة الأسبوعية'
  },
  'Select the days that are considered weekends/off-days for overtime calculation.': {
    hi: 'ओवरटाइम गणना के लिए सप्ताहांत/अवकाश के दिन चुनें।',
    es: 'Seleccione los días considerados fin de semana para el cálculo de horas extras.',
    de: 'Wählen Sie die Tage aus, die für die Überstundenberechnung als Wochenende gelten.',
    ar: 'حدد الأيام المعتمدة كعطلة أسبوعية لاحتساب العمل الإضافي.'
  },
  'Monday': { hi: 'सोमवार', es: 'Lunes', de: 'Montag', ar: 'الاثنين' },
  'Tuesday': { hi: 'मंगलवार', es: 'Martes', de: 'Dienstag', ar: 'الثلاثاء' },
  'Wednesday': { hi: 'बुधवार', es: 'Miércoles', de: 'Mittwoch', ar: 'الأربعاء' },
  'Thursday': { hi: 'गुरुवार', es: 'Jueves', de: 'Donnerstag', ar: 'الخميس' },
  'Friday': { hi: 'शुक्रवार', es: 'Viernes', de: 'Freitag', ar: 'الجمعة' },
  'Saturday': { hi: 'शनिवार', es: 'Sábado', de: 'Samstag', ar: 'السبت' },
  'Sunday': { hi: 'रविवार', es: 'Domingo', de: 'Sonntag', ar: 'الأحد' },

  'Contribution & Deduction Rules': {
    hi: 'अंशदान और कटौती नियम',
    es: 'Reglas de Contribución y Deducción',
    de: 'Beitrags- & Abzugsregeln',
    ar: 'قواعد المساهمات والاستقطاعات'
  },
  'Global rules for PF, Retirement, 401k & Social Security': {
    hi: 'पीएफ, सेवानिवृत्ति और सामाजिक सुरक्षा के वैश्विक नियम',
    es: 'Reglas globales de jubilación y seguridad social',
    de: 'Globale Regeln für Rente & Sozialversicherung',
    ar: 'قواعد عامة للتأمينات وصناديق التقاعد'
  },
  'Enable Company Contribution System': {
    hi: 'कंपनी अंशदान प्रणाली सक्षम करें',
    es: 'Habilitar Sistema de Contribución de la Empresa',
    de: 'Unternehmensbeitragssystem aktivieren',
    ar: 'تفعيل نظام مساهمات الشركة'
  },
  'Enable automatic employee deduction and employer contribution calculations during payroll.': {
    hi: 'पेरोल के दौरान स्वचालित कर्मचारी कटौती और नियोक्ता योगदान गणना सक्षम करें।',
    es: 'Habilitar el cálculo automático de deducción de empleados y aportes patronales.',
    de: 'Automatische Mitarbeiterabzüge und Arbeitgeberbeiträge bei der Abrechnung aktivieren.',
    ar: 'تفعيل الحساب التلقائي لاستقطاعات الموظف ومساهمات صاحب العمل.'
  },
  'Employee Contribution': {
    hi: 'कर्मचारी अंशदान',
    es: 'Aporte del Empleado',
    de: 'Mitarbeiterbeitrag',
    ar: 'مساهمة الموظف'
  },
  'Salary Deduction': {
    hi: 'वेतन कटौती',
    es: 'Deducción Salarial',
    de: 'Gehaltsabzug',
    ar: 'استقطاع الراتب'
  },
  'Employer Contribution': {
    hi: 'नियोक्ता अंशदान',
    es: 'Aporte del Empleador',
    de: 'Arbeitgeberbeitrag',
    ar: 'مساهمة صاحب العمل'
  },
  'Company Paid': {
    hi: 'कंपनी द्वारा प्रदत्त',
    es: 'Pagado por la Empresa',
    de: 'Vom Unternehmen bezahlt',
    ar: 'مدفوع من الشركة'
  },
  'Business Identity': {
    hi: 'व्यावसायिक पहचान',
    es: 'Identidad Comercial',
    de: 'Unternehmensidentität',
    ar: 'هوية الشركة'
  },
  'Company Identity': {
    hi: 'कंपनी पहचान',
    es: 'Identidad de la Empresa',
    de: 'Unternehmensidentität',
    ar: 'هوية المؤسسة'
  },
  'Company details for reports & payslips': {
    hi: 'रिपोर्ट और वेतन पर्ची के लिए कंपनी का विवरण',
    es: 'Detalles de la empresa para informes y nóminas',
    de: 'Unternehmensdaten für Berichte & Abrechnungen',
    ar: 'تفاصيل الشركة للتقارير وقسائم الرواتب'
  },
  'Operating Country': {
    hi: 'परिचालन देश',
    es: 'País de Operación',
    de: 'Betriebsland',
    ar: 'دولة العمل'
  },
  'Primary Operating Country': {
    hi: 'प्राथमिक परिचालन देश',
    es: 'País de Operación Principal',
    de: 'Hauptbetriebsland',
    ar: 'دولة النشاط الرئيسية'
  },
  'System Currency': {
    hi: 'सिस्टम मुद्रा',
    es: 'Moneda del Sistema',
    de: 'Systemwährung',
    ar: 'عملة النظام'
  },
  'Default Currency': {
    hi: 'डिफ़ॉल्ट मुद्रा',
    es: 'Moneda Predeterminada',
    de: 'Standardwährung',
    ar: 'العملة الافتراضية'
  },
  'System Language': {
    hi: 'सिस्टम भाषा',
    es: 'Idioma del Sistema',
    de: 'Systemsprache',
    ar: 'لغة النظام'
  },
  'Default Platform Language': {
    hi: 'डिफ़ॉल्ट प्लेटफ़ॉर्म भाषा',
    es: 'Idioma Predeterminado de Plataforma',
    de: 'Standard-Plattform-Sprache',
    ar: 'لغة المنصة الافتراضية'
  },
  'Timezone': {
    hi: 'समय क्षेत्र (Timezone)',
    es: 'Zona Horaria',
    de: 'Zeitzone',
    ar: 'المنطقة الزمنية'
  },
  'Default Timezone': {
    hi: 'डिफ़ॉल्ट समय क्षेत्र',
    es: 'Zona Horaria Predeterminada',
    de: 'Standardzeitzone',
    ar: 'المنطقة الزمنية الافتراضية'
  },
  'Date Format': {
    hi: 'दिनांक प्रारूप',
    es: 'Formato de Fecha',
    de: 'Datumsformat',
    ar: 'تنسيق التاريخ'
  },
  'Business Name': {
    hi: 'व्यापार का नाम',
    es: 'Nombre de la Empresa',
    de: 'Unternehmensname',
    ar: 'اسم الشركة'
  },
  'Contact Phone': {
    hi: 'संपर्क फ़ोन',
    es: 'Teléfono de Contacto',
    de: 'Kontakttelefon',
    ar: 'هاتف التواصل'
  },
  'Email Address': {
    hi: 'ईमेल पता',
    es: 'Correo Electrónico',
    de: 'E-Mail-Adresse',
    ar: 'البريد الإلكتروني'
  },
  'Address': {
    hi: 'पता',
    es: 'Dirección',
    de: 'Adresse',
    ar: 'العنوان'
  },
  'SMTP Settings': {
    hi: 'एसएमटीपी सेटिंग्स',
    es: 'Ajustes SMTP',
    de: 'SMTP-Einstellungen',
    ar: 'إعدادات خادم SMTP'
  },
  'Configure your company email delivery': {
    hi: 'अपनी कंपनी की ईमेल डिलीवरी कॉन्फ़िगर करें',
    es: 'Configure el envío de correos de su empresa',
    de: 'Konfigurieren Sie den E-Mail-Versand Ihres Unternehmens',
    ar: 'إعداد خادم إرسال البريد لشركتك'
  },
  'Test Connection': {
    hi: 'कनेक्शन का परीक्षण करें',
    es: 'Probar Conexión',
    de: 'Verbindung testen',
    ar: 'اختبار الاتصال'
  },
  'SMTP Host': {
    hi: 'एसएमटीपी होस्ट',
    es: 'Host SMTP',
    de: 'SMTP-Host',
    ar: 'مضيف SMTP'
  },
  'SMTP Port': {
    hi: 'एसएमटीपी पोर्ट',
    es: 'Puerto SMTP',
    de: 'SMTP-Port',
    ar: 'منفذ SMTP'
  },
  'SMTP Username': {
    hi: 'एसएमटीपी उपयोगकर्ता नाम',
    es: 'Usuario SMTP',
    de: 'SMTP-Benutzername',
    ar: 'اسم مستخدم SMTP'
  },
  'SMTP Password': {
    hi: 'एसएमटीपी पासवर्ड',
    es: 'Contraseña SMTP',
    de: 'SMTP-Passwort',
    ar: 'كلمة مرور SMTP'
  },
  'Sender Email': {
    hi: 'प्रेषक ईमेल',
    es: 'Correo del Remitente',
    de: 'Absender-E-Mail',
    ar: 'بريد المرسل'
  },
  'Sender Name': {
    hi: 'प्रेषक का नाम',
    es: 'Nombre del Remitente',
    de: 'Absendername',
    ar: 'اسم المرسل'
  },
  'Active': { hi: 'सक्रिय', es: 'Activo', de: 'Aktiv', ar: 'نشط' },
  'Inactive': { hi: 'निष्क्रिय', es: 'Inactivo', de: 'Inaktiv', ar: 'غير نشط' },
  'Search': { hi: 'खोजें...', es: 'Buscar...', de: 'Suchen...', ar: 'بحث...' },
  'Notifications': { hi: 'सूचनाएं', es: 'Notificaciones', de: 'Benachrichtigungen', ar: 'الإشعارات' },
  'Administrator': { hi: 'प्रशासक', es: 'Administrador', de: 'Administrator', ar: 'المسؤول' },
  'System SuperAdmin': { hi: 'सिस्टम सुपरएडमिन', es: 'SuperAdmin del Sistema', de: 'System-SuperAdmin', ar: 'المشرف العام للنظام' },
  'Pro System': { hi: 'प्रो सिस्टम', es: 'Sistema Pro', de: 'Pro-System', ar: 'النظام الاحترافي' },
  'Active Now': { hi: 'अभी सक्रिय', es: 'Activo Ahora', de: 'Jetzt aktiv', ar: 'نشط الآن' },
  'Online': { hi: 'ऑनलाइन', es: 'En Línea', de: 'Online', ar: 'متصل' },
  'Offline': { hi: 'ऑफलाइन', es: 'Desconectado', de: 'Offline', ar: 'غير متصل' }
};

// Merge dictionary into TRANSLATIONS for all languages
const langs = ['hi', 'es', 'de', 'ar'];
for (const [key, trans] of Object.entries(dictionary)) {
  for (const lang of langs) {
    if (trans[lang]) {
      TRANSLATIONS[lang][key] = trans[lang];
    }
  }
}

// Let's also copy all keys in 'hi' to 'es', 'de', 'ar' using fallback or translations if missing
for (const [k, v] of Object.entries(TRANSLATIONS.hi)) {
  if (!TRANSLATIONS.es[k]) TRANSLATIONS.es[k] = TRANSLATIONS.en[k] || k;
  if (!TRANSLATIONS.de[k]) TRANSLATIONS.de[k] = TRANSLATIONS.en[k] || k;
  if (!TRANSLATIONS.ar[k]) TRANSLATIONS.ar[k] = TRANSLATIONS.en[k] || k;
}

console.log('Updated counts:', {
  en: Object.keys(TRANSLATIONS.en).length,
  hi: Object.keys(TRANSLATIONS.hi).length,
  es: Object.keys(TRANSLATIONS.es).length,
  de: Object.keys(TRANSLATIONS.de).length,
  ar: Object.keys(TRANSLATIONS.ar).length
});
