const fs = require('fs');

const currentContent = fs.readFileSync('src/config/translations.js', 'utf8');

const match = currentContent.match(/export const TRANSLATIONS = (\{[\s\S]*?\});\n\n\/\*\*/);
if (!match) {
  console.error('Match failed');
  process.exit(1);
}

const TRANSLATIONS = Function('"use strict";return (' + match[1] + ')')();

// Rich master translation dictionary for common modules
const translationsMaster = {
  // Navigation & Core
  'Dashboard': { es: 'Panel Principal', de: 'Dashboard', ar: 'لوحة التحكم' },
  'Employees': { es: 'Empleados', de: 'Mitarbeiter', ar: 'الموظفون' },
  'Attendance': { es: 'Asistencia', de: 'Zeiterfassung', ar: 'سجل الحضور' },
  'Face Register': { es: 'Registro Facial', de: 'Gesichtsregistrierung', ar: 'تسجيل الوجه' },
  'Leaves': { es: 'Permisos', de: 'Urlaubsverwaltung', ar: 'الإجازات' },
  'Geo-Fencing': { es: 'Geovallado (GPS)', de: 'GPS-Geofencing', ar: 'السياج الجغرافي' },
  'Claims': { es: 'Reclamaciones y Gastos', de: 'Spesenabrechnung', ar: 'المطالبات والنفقات' },
  'KPI & Goals': { es: 'KPI y Objetivos', de: 'KPI & Ziele', ar: 'مؤشرات الأداء والأهداف' },
  'Kiosk Settings': { es: 'Ajustes de Quiosco', de: 'Kiosk-Einstellungen', ar: 'إعدادات الكشك' },
  'Payroll': { es: 'Nóminas y Salarios', de: 'Gehaltsabrechnung', ar: 'الرواتب والمسيرات' },
  'Invoices': { es: 'Facturas', de: 'Rechnungen', ar: 'الفواتير' },
  'Reports': { es: 'Informes', de: 'Berichte', ar: 'التقارير' },
  'How to Use': { es: 'Guía de Uso', de: 'Bedienungsanleitung', ar: 'دليل الاستخدام' },
  'Support': { es: 'Soporte', de: 'Support', ar: 'الدعم الفني' },
  'Help Desk': { es: 'Mesa de Ayuda', de: 'Helpdesk', ar: 'مركز المساعدة' },
  'Audit Logs': { es: 'Registros de Auditoría', de: 'Audit-Protokolle', ar: 'سجلات التدقيق' },
  'Backup & Data': { es: 'Copia y Datos', de: 'Datensicherung', ar: 'النسخ الاحتياطي والبيانات' },
  'Settings': { es: 'Ajustes', de: 'Einstellungen', ar: 'الإعدادات' },
  'Profile': { es: 'Perfil', de: 'Profil', ar: 'الملف الشخصي' },
  'Logout': { es: 'Cerrar Sesión', de: 'Abmelden', ar: 'تسجيل الخروج' },

  // Settings Header & Tabs
  'System Settings': { es: 'Ajustes del Sistema', de: 'Systemeinstellungen', ar: 'إعدادات النظام' },
  'Platform Settings': { es: 'Ajustes de Plataforma', de: 'Plattformeinstellungen', ar: 'إعدادات المنصة' },
  'Manage your biometric integration and payroll business rules.': {
    es: 'Gestione su integración biométrica y las reglas de negocio de nómina.',
    de: 'Verwalten Sie Ihre biometrische Integration und Abrechnungsregeln.',
    ar: 'إدارة التكامل البيومتري وقواعد العمل لمسيرات الرواتب.'
  },
  'Save Changes': { es: 'Guardar Cambios', de: 'Änderungen speichern', ar: 'حفظ التغييرات' },
  'SAVE CHANGES': { es: 'GUARDAR CAMBIOS', de: 'ÄNDERUNGEN SPEICHERN', ar: 'حفظ التغييرات' },
  'Saved!': { es: '¡Guardado!', de: 'Gespeichert!', ar: 'تم الحفظ!' },
  'Saving...': { es: 'Guardando...', de: 'Wird gespeichert...', ar: 'جارٍ الحفظ...' },

  // Settings Tabs
  'Payroll & Rules': { es: 'Nómina y Reglas', de: 'Gehaltsabrechnung & Regeln', ar: 'الرواتب والقواعد' },
  'Business Profile': { es: 'Perfil de la Empresa', de: 'Unternehmensprofil', ar: 'الملف التعريفي للشركة' },
  'Email SMTP Settings': { es: 'Ajustes SMTP de Correo', de: 'E-Mail-SMTP-Einstellungen', ar: 'إعدادات خادم البريد SMTP' },
  'WhatsApp Connectivity': { es: 'Conectividad de WhatsApp', de: 'WhatsApp-Konnektivität', ar: 'الربط مع واتساب' },
  'Announcements & Messaging': { es: 'Anuncios y Mensajería', de: 'Ankündigungen & Benachrichtigungen', ar: 'الإعلانات والرسائل' },
  'Notifications & Alerts': { es: 'Notificaciones y Alertas', de: 'Benachrichtigungen & Hinweise', ar: 'الإشعارات والتنبيهات' },
  'Subscription & Billing': { es: 'Suscripción y Facturación', de: 'Abonnement & Abrechnung', ar: 'الاشتراك والفواتير' },

  // Attendance & Payout Logic
  'Attendance & Payout Logic': { es: 'Lógica de Asistencia y Pagos', de: 'Anwesenheits- & Auszahlungslogik', ar: 'منطق الحضور وصرف الرواتب' },
  'Business rules for salary calculation': { es: 'Reglas de negocio para el cálculo salarial', de: 'Geschäftsregeln für die Gehaltsberechnung', ar: 'قواعد العمل لحساب الرواتب' },
  'BUSINESS RULES FOR SALARY CALCULATION': { es: 'REGLAS DE NEGOCIO PARA EL CÁLCULO SALARIAL', de: 'GESCHÄFTSREGELN FÜR DIE GEHALTSBERECHNUNG', ar: 'قواعد العمل لحساب الرواتب' },
  'Automatic Late Deduction': { es: 'Deducción Automática por Tardanza', de: 'Automatische Verspätungsabzüge', ar: 'الخصم التلقائي للتأخير' },
  'Enable 15-minute buffer before deducting half-day or late fine.': {
    es: 'Habilitar margen de 15 minutos antes de deducir medio día o multa por retraso.',
    de: 'Aktivieren Sie einen 15-Minuten-Puffer vor Abzug von halbem Tag oder Verspätungsstrafe.',
    ar: 'تفعيل مهلة 15 دقيقة قبل خصم نصف يوم أو تطبيق غرامة التأخير.'
  },
  'Late Penalty Amount': { es: 'Monto de Multa por Tardanza', de: 'Verspätungsstrafe Betrag', ar: 'مبلغ غرامة التأخير' },
  'Amount to deduct per late arrival.': { es: 'Monto a deducir por cada llegada tardía.', de: 'Betrag, der pro verspäteter Ankunft abgezogen wird.', ar: 'المبلغ المخصوم عن كل تأخير.' },
  'Grace Period (Minutes)': { es: 'Período de Gracia (Minutos)', de: 'Kulanzzeit (Minuten)', ar: 'فترة السماح (بالدقائق)' },
  'Allowed buffer time before late deduction applies.': { es: 'Tiempo de margen permitido antes de aplicar deducción por tardanza.', de: 'Zulässige Pufferzeit vor Inkrafttreten des Verspätungsabzugs.', ar: 'الوقت المسموح به قبل تطبيق خصم التأخير.' },
  'Salary Payout Cycle': { es: 'Ciclo de Pago Salarial', de: 'Gehaltsauszahlungszyklus', ar: 'دورة صرف الرواتب' },
  'SALARY PAYOUT CYCLE': { es: 'CICLO DE PAGO SALARIAL', de: 'GEHALTSAUSZAHLUNGSZYKLUS', ar: 'دورة صرف الرواتب' },
  '15 Days Cycle': { es: 'Ciclo de 15 Días', de: '15-Tage-Zyklus', ar: 'دورة 15 يوماً' },
  'Monthly (1st to 30th)': { es: 'Mensual (1 al 30)', de: 'Monatlich (1. bis 30.)', ar: 'شهري (من 1 إلى 30)' },
  'Weekly Payout': { es: 'Pago Semanal', de: 'Wöchentliche Auszahlung', ar: 'صرف أسبوعي' },
  'Salary Cycle Start Date': { es: 'Fecha de Inicio del Ciclo', de: 'Startdatum des Gehaltszyklus', ar: 'تاريخ بدء دورة الرواتب' },
  'SALARY CYCLE START DATE': { es: 'FECHA DE INICIO DEL CICLO', de: 'STARTDATUM DES GEHALTSZYKLUS', ar: 'تاريخ بدء دورة الرواتب' },
  'OT (Overtime) Multiplier': { es: 'Multiplicador de Horas Extras', de: 'Überstunden-Multiplikator', ar: 'معامل الساعات الإضافية (أوفرتايم)' },
  'OT (OVERTIME) MULTIPLIER': { es: 'MULTIPLICADOR DE HORAS EXTRAS', de: 'ÜBERSTUNDEN-MULTIPLIKATOR', ar: 'معامل الساعات الإضافية (أوفرتايم)' },
  'Standard Start Time': { es: 'Hora de Inicio Estándar', de: 'Standard-Startzeit', ar: 'وقت بدء العمل الرسمي' },
  'STANDARD START TIME': { es: 'HORA DE INICIO ESTÁNDAR', de: 'STANDARD-STARTZEIT', ar: 'وقت بدء العمل الرسمي' },
  'Standard End Time': { es: 'Hora de Fin Estándar', de: 'Standard-Endzeit', ar: 'وقت نهاية العمل الرسمي' },
  'STANDARD END TIME': { es: 'HORA DE FIN ESTÁNDAR', de: 'STANDARD-ENDZEIT', ar: 'وقت نهاية العمل الرسمي' },
  'Weekend Off-Days': { es: 'Días de Fin de Semana', de: 'Wochenend-Ruhetage', ar: 'أيام العطلة الأسبوعية' },
  'Select the days that are considered weekends/off-days for overtime calculation.': {
    es: 'Seleccione los días considerados fines de semana para el cálculo de horas extras.',
    de: 'Wählen Sie die Tage aus, die für die Überstundenberechnung als Wochenende gelten.',
    ar: 'حدد الأيام المعتمدة كعطلة أسبوعية لاحتساب العمل الإضافي.'
  },
  'Monday': { es: 'Lunes', de: 'Montag', ar: 'الاثنين' },
  'Tuesday': { es: 'Martes', de: 'Dienstag', ar: 'الثلاثاء' },
  'Wednesday': { es: 'Miércoles', de: 'Mittwoch', ar: 'الأربعاء' },
  'Thursday': { es: 'Jueves', de: 'Donnerstag', ar: 'الخميس' },
  'Friday': { es: 'Viernes', de: 'Freitag', ar: 'الجمعة' },
  'Saturday': { es: 'Sábado', de: 'Samstag', ar: 'السبت' },
  'Sunday': { es: 'Domingo', de: 'Sonntag', ar: 'الأحد' },

  // Contributions & Rules
  'Contribution & Deduction Rules': { es: 'Reglas de Contribución y Deducción', de: 'Beitrags- & Abzugsregeln', ar: 'قواعد المساهمات والاستقطاعات' },
  'Global rules for PF, Retirement, 401k & Social Security': { es: 'Reglas globales de jubilación y seguridad social', de: 'Globale Regeln für Rente & Sozialversicherung', ar: 'قواعد عامة للتأمينات وصناديق التقاعد' },
  'Enable Company Contribution System': { es: 'Habilitar Sistema de Contribución de la Empresa', de: 'Unternehmensbeitragssystem aktivieren', ar: 'تفعيل نظام مساهمات الشركة' },
  'Enable automatic employee deduction and employer contribution calculations during payroll.': {
    es: 'Habilitar el cálculo automático de deducción de empleados y aportes patronales.',
    de: 'Automatische Mitarbeiterabzüge und Arbeitgeberbeiträge bei der Abrechnung aktivieren.',
    ar: 'تفعيل الحساب التلقائي لاستقطاعات الموظف ومساهمات صاحب العمل.'
  },
  'Employee Contribution': { es: 'Aporte del Empleado', de: 'Mitarbeiterbeitrag', ar: 'مساهمة الموظف' },
  'Salary Deduction': { es: 'Deducción Salarial', de: 'Gehaltsabzug', ar: 'استقطاع الراتب' },
  'Employer Contribution': { es: 'Aporte del Empleador', de: 'Arbeitgeberbeitrag', ar: 'مساهمة صاحب العمل' },
  'Company Paid': { es: 'Pagado por la Empresa', de: 'Vom Unternehmen bezahlt', ar: 'مدفوع من الشركة' },
  'Default percentage deducted from employee\'s gross monthly/hourly wages.': {
    es: 'Porcentaje predeterminado deducido del salario bruto del empleado.',
    de: 'Standardprozentsatz, der vom Bruttolohn des Mitarbeiters abgezogen wird.',
    ar: 'النسبة المئوية الافتراضية المخصومة من الراتب الإجمالي للموظف.'
  },
  'Default percentage added by the employer on top of employee gross pay.': {
    es: 'Porcentaje predeterminado agregado por el empleador además del salario bruto.',
    de: 'Standardprozentsatz, den der Arbeitgeber zusätzlich zum Bruttolohn zahlt.',
    ar: 'النسبة المئوية الافتراضية التي يضيفها صاحب العمل فوق الراتب الأساسي.'
  },
  'Employee-Level Overrides:': { es: 'Excepciones por Empleado:', de: 'Mitarbeiterspezifische Anpassungen:', ar: 'استثناءات على مستوى الموظف:' },
  'Individual employees can have custom percentage overrides or be opted-in/out separately from their Employee Profile → Compensation & Sign tab.': {
    es: 'Los empleados individuales pueden tener porcentajes personalizados desde su Perfil → Compensación.',
    de: 'Einzelne Mitarbeiter können individuelle Prozentsätze im Profil unter Vergütung erhalten.',
    ar: 'يمكن تخصيص نسب استقطاع خاصة بكل موظف على حدة من خلال الملف الشخصي للموظف.'
  },

  // Business Profile
  'Business Identity': { es: 'Identidad Comercial', de: 'Unternehmensidentität', ar: 'هوية الشركة' },
  'Company Identity': { es: 'Identidad de la Empresa', de: 'Unternehmensidentität', ar: 'هوية المؤسسة' },
  'Company details for reports & payslips': { es: 'Detalles de la empresa para informes y nóminas', de: 'Unternehmensdaten für Berichte & Abrechnungen', ar: 'بيانات الشركة المعتمدة للتقارير والمسيرات' },
  'Operating Country': { es: 'País de Operación', de: 'Betriebsland', ar: 'دولة العمل' },
  'Primary Operating Country': { es: 'País de Operación Principal', de: 'Hauptbetriebsland', ar: 'دولة النشاط الرئيسية' },
  'System Currency': { es: 'Moneda del Sistema', de: 'Systemwährung', ar: 'عملة النظام' },
  'Default Currency': { es: 'Moneda Predeterminada', de: 'Standardwährung', ar: 'العملة الافتراضية' },
  'System Language': { es: 'Idioma del Sistema', de: 'Systemsprache', ar: 'لغة النظام' },
  'Default Platform Language': { es: 'Idioma Predeterminado de Plataforma', de: 'Standard-Plattform-Sprache', ar: 'لغة المنصة الافتراضية' },
  'Timezone': { es: 'Zona Horaria', de: 'Zeitzone', ar: 'المنطقة الزمنية' },
  'Default Timezone': { es: 'Zona Horaria Predeterminada', de: 'Standardzeitzone', ar: 'المنطقة الزمنية الافتراضية' },
  'Date Format': { es: 'Formato de Fecha', de: 'Datumsformat', ar: 'تنسيق التاريخ' },
  'Business Name': { es: 'Nombre de la Empresa', de: 'Unternehmensname', ar: 'اسم الشركة' },
  'Contact Phone': { es: 'Teléfono de Contacto', de: 'Kontakttelefon', ar: 'هاتف التواصل' },
  'Email Address': { es: 'Correo Electrónico', de: 'E-Mail-Adresse', ar: 'البريد الإلكتروني' },
  'Address': { es: 'Dirección', de: 'Adresse', ar: 'العنوان' },
  'Street, City, Province, Code': { es: 'Calle, Ciudad, Provincia, Código Postal', de: 'Straße, Stadt, Bundesland, PLZ', ar: 'الشارع، المدينة، المنطقة، الرمز البريدي' },

  // Email SMTP
  'SMTP Settings': { es: 'Ajustes SMTP', de: 'SMTP-Einstellungen', ar: 'إعدادات خادم SMTP' },
  'Configure your company email delivery': { es: 'Configure el envío de correos de su empresa', de: 'Konfigurieren Sie den E-Mail-Versand Ihres Unternehmens', ar: 'إعداد خادم إرسال البريد لشركتك' },
  'Test Connection': { es: 'Probar Conexión', de: 'Verbindung testen', ar: 'اختبار الاتصال' },
  'SMTP Host': { es: 'Host SMTP', de: 'SMTP-Host', ar: 'مضيف SMTP' },
  'SMTP Port': { es: 'Puerto SMTP', de: 'SMTP-Port', ar: 'منفذ SMTP' },
  'SMTP Username': { es: 'Usuario SMTP', de: 'SMTP-Benutzername', ar: 'اسم مستخدم SMTP' },
  'SMTP Password': { es: 'Contraseña SMTP', de: 'SMTP-Passwort', ar: 'كلمة مرور SMTP' },
  'Use App Passwords for Gmail/M365': { es: 'Usar contraseñas de aplicación para Gmail/M365', de: 'App-Passwörter für Gmail/M365 verwenden', ar: 'استخدم كلمات مرور التطبيقات لـ Gmail/M365' },
  'Sender Email': { es: 'Correo del Remitente', de: 'Absender-E-Mail', ar: 'بريد المرسل' },
  'Sender Name': { es: 'Nombre del Remitente', de: 'Absendername', ar: 'اسم المرسل' },
  'SMTP Delivery Status:': { es: 'Estado de Envío SMTP:', de: 'SMTP-Lieferstatus:', ar: 'حالة إرسال خادم SMTP:' },
  'Your company SMTP is currently active and delivering emails.': {
    es: 'El servidor SMTP de su empresa está activo y enviando correos.',
    de: 'Das SMTP Ihres Unternehmens ist aktiv und versendet E-Mails.',
    ar: 'خادم البريد الخاص بشركتك نشط ويعمل حالياً.'
  },
  'SMTP is currently disabled. System defaults will be used.': {
    es: 'SMTP está desactivado. Se usarán los valores por defecto del sistema.',
    de: 'SMTP ist deaktiviert. System-Standardwerte werden verwendet.',
    ar: 'خادم SMTP معطل حالياً. سيتم استخدام إعدادات النظام الافتراضية.'
  },
  'Remove SMTP': { es: 'Eliminar SMTP', de: 'SMTP entfernen', ar: 'إزالة إعدادات SMTP' },
  'Save Settings': { es: 'Guardar Ajustes', de: 'Einstellungen speichern', ar: 'حفظ الإعدادات' },

  // Notifications & Alerts Tab
  'Manage your system notification preferences': { es: 'Gestione las preferencias de notificación del sistema', de: 'Verwalten Sie Ihre Systembenachrichtigungen', ar: 'إدارة تفضيلات إشعارات النظام' },
  'Leave Requests': { es: 'Solicitudes de Permiso', de: 'Urlaubsanträge', ar: 'طلبات الإجازات' },
  'Get notified when an employee applies for a leave.': { es: 'Reciba notificaciones cuando un empleado solicite vacaciones o permisos.', de: 'Benachrichtigung bei neuen Urlaubsanträgen von Mitarbeitern.', ar: 'تلقي إشعار فور تقديم أي موظف لطلب إجازة.' },
  'Expense Claims': { es: 'Reclamaciones de Gastos', de: 'Spesenabrechnungen', ar: 'مطالبات المصروفات' },
  'Get notified when an employee submits a new claim.': { es: 'Reciba notificaciones cuando un empleado envíe una reclamación de gastos.', de: 'Benachrichtigung bei Einreichung neuer Spesenabrechnungen.', ar: 'تلقي إشعار فور تقديم الموظف لمطالبة مالية جديدة.' },
  'Password Reset Requests': { es: 'Solicitudes de Restablecimiento de Contraseña', de: 'Passwort-Reset-Anfragen', ar: 'طلبات إعادة تعيين كلمة المرور' },
  'Get notified when an employee requests a password reset.': { es: 'Reciba alertas cuando un empleado solicite restablecer su contraseña.', de: 'Benachrichtigung bei Passwort-Zurücksetzungsanfragen.', ar: 'تلقي تنبيه عند طلب الموظف إعادة تعيين كلمة المرور.' },

  // Subscription & Billing Tab
  'Manage your plan and licenses': { es: 'Gestione su plan y licencias', de: 'Verwalten Sie Ihren Tarif und Lizenzen', ar: 'إدارة باقتك والتراخيص' },
  'Current Active Plan': { es: 'Plan Activo Actual', de: 'Aktuell aktiver Tarif', ar: 'الباقة النشطة الحالية' },
  'Next billing date:': { es: 'Próxima fecha de facturación:', de: 'Nächstes Abrechnungsdatum:', ar: 'تاريخ الفاتورة القادمة:' },
  'left': { es: 'restantes', de: 'verbleibend', ar: 'متبقي' },
  'Loading current plan...': { es: 'Cargando plan actual...', de: 'Aktueller Tarif wird geladen...', ar: 'جارٍ تحميل الباقة الحالية...' },
  'Available Upgrades': { es: 'Mejoras Disponibles', de: 'Verfügbare Upgrades', ar: 'الباقات المتاحة للترقية' },
  'Most Popular': { es: 'Más Popular', de: 'Beliebtester Tarif', ar: 'الأكثر شعبية' },
  'RENEW': { es: 'RENOVAR', de: 'VERLÄNGERN', ar: 'تجديد الاشتراك' },
  'Renewing...': { es: 'Renovando...', de: 'Wird verlängert...', ar: 'جارٍ التجديد...' },
  'Payment History & Invoices': { es: 'Historial de Pagos y Facturas', de: 'Zahlungsverlauf & Rechnungen', ar: 'سجل المدفوعات والفواتير' },
  'Official billing records and payment receipts for your company.': { es: 'Registros oficiales de facturación y recibos de pago.', de: 'Offizielle Abrechnungsdaten und Zahlungsbelege Ihres Unternehmens.', ar: 'السجلات الرسمية للفواتير وإيصالات الدفع لمؤسستك.' },
  'Refresh Invoices': { es: 'Actualizar Facturas', de: 'Rechnungen aktualisieren', ar: 'تحديث الفواتير' },
  'No payment invoices yet.': { es: 'Aún no hay facturas de pago.', de: 'Noch keine Rechnungen vorhanden.', ar: 'لا توجد فواتير سابقة حتى الآن.' },
  'Invoices will appear here automatically after your first subscription payment.': { es: 'Las facturas aparecerán aquí tras su primer pago de suscripción.', de: 'Rechnungen erscheinen hier nach Ihrer ersten Abonnementzahlung.', ar: 'ستظهر الفواتير هنا تلقائياً بعد سداد أول اشتراك.' },
  'Invoice #': { es: 'Factura #', de: 'Rechnung #', ar: 'رقم الفاتورة' },
  'Plan': { es: 'Plan', de: 'Tarif', ar: 'الباقة' },
  'Amount': { es: 'Monto', de: 'Betrag', ar: 'المبلغ' },
  'Date': { es: 'Fecha', de: 'Datum', ar: 'التاريخ' },
  'Status': { es: 'Estado', de: 'Status', ar: 'الحالة' },
  'Razorpay ID': { es: 'ID de Razorpay', de: 'Razorpay-ID', ar: 'معرف Razorpay' },

  // Purge & Danger Zone
  'Are you absolutely sure?': { es: '¿Está totalmente seguro?', de: 'Sind Sie absolut sicher?', ar: 'هل أنت متأكد تماماً؟' },
  'This action will permanently delete all users, faces, fingerprints, and attendance logs from the physical biometric machine. This action cannot be undone.': {
    es: 'Esta acción eliminará permanentemente todos los usuarios, rostros, huellas y registros de la máquina biométrica. No se puede deshacer.',
    de: 'Diese Aktion löscht dauerhaft alle Benutzer, Gesichter, Fingerabdrücke und Protokolle vom biometrischen Gerät. Dies kann nicht rückgängig gemacht werden.',
    ar: 'سيؤدي هذا الإجراء إلى حذف جميع المستخدمين وبصمات الوجه والأصابع وسجلات الحضور نهائياً من جهاز البصمة ولا يمكن التراجع عنه.'
  },
  'Yes, Purge All': { es: 'Sí, Purgar Todo', de: 'Ja, alles löschen', ar: 'نعم، مسح جميع البيانات' },
  'Purging...': { es: 'Purgando...', de: 'Wird gelöscht...', ar: 'جارٍ المسح...' },

  // Header & Badges
  'Active': { es: 'Activo', de: 'Aktiv', ar: 'نشط' },
  'Inactive': { es: 'Inactivo', de: 'Inaktiv', ar: 'غير نشط' },
  'Search': { es: 'Buscar...', de: 'Suchen...', ar: 'بحث...' },
  'Notifications': { es: 'Notificaciones', de: 'Benachrichtigungen', ar: 'الإشعارات' },
  'Administrator': { es: 'Administrador', de: 'Administrator', ar: 'المسؤول' },
  'System SuperAdmin': { es: 'SuperAdmin del Sistema', de: 'System-SuperAdmin', ar: 'المشرف العام للنظام' },
  'Pro System': { es: 'Sistema Pro', de: 'Pro-System', ar: 'النظام الاحترافي' },
  'Active Now': { es: 'Activo Ahora', de: 'Jetzt aktiv', ar: 'نشط الآن' },
  'Online': { es: 'En Línea', de: 'Online', ar: 'متصل' },
  'Offline': { es: 'Desconectado', de: 'Offline', ar: 'غير متصل' },

  // Common Buttons & Actions
  'Refresh': { es: 'Actualizar', de: 'Aktualisieren', ar: 'تحديث' },
  'Download': { es: 'Descargar', de: 'Herunterladen', ar: 'تحميل' },
  'Upload': { es: 'Subir', de: 'Hochladen', ar: 'رفع' },
  'Export CSV': { es: 'Exportar CSV', de: 'CSV exportieren', ar: 'تصدير CSV' },
  'Export PDF': { es: 'Exportar PDF', de: 'PDF exportieren', ar: 'تصدير PDF' },
  'Print': { es: 'Imprimir', de: 'Drucken', ar: 'طباعة' },
  'Delete': { es: 'Eliminar', de: 'Löschen', ar: 'حذف' },
  'Edit': { es: 'Editar', de: 'Bearbeiten', ar: 'تعديل' },
  'Cancel': { es: 'Cancelar', de: 'Abbrechen', ar: 'إلغاء' },
  'Confirm': { es: 'Confirmar', de: 'Bestätigen', ar: 'تأكيد' },
  'Close': { es: 'Cerrar', de: 'Schließen', ar: 'إغلاق' },
  'Submit': { es: 'Enviar', de: 'Absenden', ar: 'إرسال' },
  'View': { es: 'Ver', de: 'Anzeigen', ar: 'عرض' },
  'Details': { es: 'Detalles', de: 'Details', ar: 'التفاصيل' },
  'Filter': { es: 'Filtrar', de: 'Filtern', ar: 'تصفية' },
  'Clear': { es: 'Limpiar', de: 'Zurücksetzen', ar: 'مسح' },
  'Clear All': { es: 'Borrar Todo', de: 'Alle löschen', ar: 'مسح الكل' },
  'Clear All Notifications': { es: 'Borrar Todas las Notificaciones', de: 'Alle Benachrichtigungen löschen', ar: 'مسح جميع الإشعارات' },
  'MARK ALL READ': { es: 'MARCAR TODO LEÍDO', de: 'ALLE ALS GELESEN MARKIEREN', ar: 'تحديد الكل كمقروء' },
  'Mark all as read': { es: 'Marcar todo como leído', de: 'Alle als gelesen markieren', ar: 'تحديد الكل كمقروء' },
  'Advance': { es: 'Anticipo', de: 'Vorschuss', ar: 'سلفة' },
  'Reset': { es: 'Restablecer', de: 'Zurücksetzen', ar: 'إعادة تعيين' }
};

// Apply all translations to all languages
for (const [key, transObj] of Object.entries(translationsMaster)) {
  for (const lang of ['es', 'de', 'ar']) {
    if (transObj[lang]) {
      TRANSLATIONS[lang][key] = transObj[lang];
    }
  }
}

// Ensure all keys from 'hi' are present in 'es', 'de', 'ar'
for (const [k, v] of Object.entries(TRANSLATIONS.hi)) {
  if (!TRANSLATIONS.es[k]) TRANSLATIONS.es[k] = TRANSLATIONS.en[k] || k;
  if (!TRANSLATIONS.de[k]) TRANSLATIONS.de[k] = TRANSLATIONS.en[k] || k;
  if (!TRANSLATIONS.ar[k]) TRANSLATIONS.ar[k] = TRANSLATIONS.en[k] || k;
}

// Generate the new translations.js content
let newCode = `/**
 * Complete UI Translations Dictionary for English, Hindi, Spanish, German & Arabic.
 * Covers all Sidebar, Header, Dashboard, Landing Page, Auth, Settings, Modals,
 * Forms, Badges, Features, Pricing, and FAQs across the platform.
 */

export const TRANSLATIONS = ` + JSON.stringify(TRANSLATIONS, null, 2) + `;\n\n` +
`/**
 * Resolver function to get translation with case-insensitive fallback matching
 */
export const translate = (key, language = 'en', fallback = null) => {
  if (!key) return '';
  const langKey = (language || 'en').toLowerCase();
  
  let targetLang = 'en';
  if (langKey.includes('hi') || langKey.includes('hindi')) targetLang = 'hi';
  else if (langKey.includes('es') || langKey.includes('span') || langKey.includes('español')) targetLang = 'es';
  else if (langKey.includes('de') || langKey.includes('ger') || langKey.includes('deutsch')) targetLang = 'de';
  else if (langKey.includes('ar') || langKey.includes('arab')) targetLang = 'ar';

  const dict = TRANSLATIONS[targetLang] || TRANSLATIONS['en'];
  
  // 1. Direct match
  if (dict[key]) return dict[key];

  // 2. Case-insensitive / normalized lookup
  const keyLower = String(key).trim().toLowerCase();
  const foundEntry = Object.entries(dict).find(([k]) => k.toLowerCase() === keyLower);
  if (foundEntry) return foundEntry[1];

  return fallback || key;
};
`;

fs.writeFileSync('src/config/translations.js', newCode, 'utf8');
console.log('Successfully written translations.js!');
console.log('Final counts:', {
  en: Object.keys(TRANSLATIONS.en).length,
  hi: Object.keys(TRANSLATIONS.hi).length,
  es: Object.keys(TRANSLATIONS.es).length,
  de: Object.keys(TRANSLATIONS.de).length,
  ar: Object.keys(TRANSLATIONS.ar).length
});
