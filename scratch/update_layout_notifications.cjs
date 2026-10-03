const fs = require('fs');

let content = fs.readFileSync('src/components/Layout.jsx', 'utf8');

// 1. Ensure Trash2 is imported
if (!content.includes('Trash2')) {
  content = content.replace(
    "import { LifeBuoy, Menu, LogOut,",
    "import { LifeBuoy, Menu, LogOut, Trash2,"
  );
}

// 2. Add clearAllNotifications and deleteSingleNotification
const oldMarkAll = `  const markAllAsRead = async () => {
      try {
          await api.put(\`/notifications/read-all\`);
          fetchNotifications();
      } catch (err) {
          console.error('Failed to mark all as read', err);
      }
  };`;

const newMarkAll = `  const markAllAsRead = async (e) => {
      if (e) e.stopPropagation();
      try {
          await api.put(\`/notifications/read-all\`);
          fetchNotifications();
      } catch (err) {
          console.error('Failed to mark all as read', err);
      }
  };

  const clearAllNotifications = async (e) => {
      if (e) e.stopPropagation();
      try {
          await api.delete('/notifications/clear-all');
          fetchNotifications();
      } catch (err) {
          console.error('Failed to clear all notifications', err);
      }
  };

  const deleteSingleNotification = async (e, id) => {
      if (e) e.stopPropagation();
      try {
          await api.delete(\`/notifications/\${id}\`);
          fetchNotifications();
      } catch (err) {
          console.error('Failed to delete notification', err);
      }
  };`;

// Handle CRLF or LF in replacement
if (content.includes(oldMarkAll)) {
  content = content.replace(oldMarkAll, newMarkAll);
} else {
  const oldMarkAllCRLF = oldMarkAll.replace(/\n/g, '\r\n');
  const newMarkAllCRLF = newMarkAll.replace(/\n/g, '\r\n');
  content = content.replace(oldMarkAllCRLF, newMarkAllCRLF);
}

// 3. Update the notification header with Clear All button
const oldHeaderButtons = `{unreadCount > 0 && (
                            <button onClick={markAllAsRead} className="text-[10px] font-black text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors px-3 py-1.5 rounded-xl border border-indigo-100/50 flex items-center gap-1.5">
                                <CheckCircle2 size={12} /> {t('MARK ALL READ')}
                            </button>
                        )}`;

const newHeaderButtons = `<div className="flex items-center gap-1.5">
                          {unreadCount > 0 && (
                            <button 
                              type="button"
                              onClick={markAllAsRead} 
                              title={t('Mark all as read')}
                              className="text-[10px] font-black text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors px-2.5 py-1.5 rounded-xl border border-indigo-100/50 flex items-center gap-1 cursor-pointer shadow-xs"
                            >
                              <CheckCircle2 size={11} />
                              <span className="hidden sm:inline">{t('MARK ALL READ')}</span>
                            </button>
                          )}
                          {notificationsList.length > 0 && (
                            <button 
                              type="button"
                              onClick={clearAllNotifications} 
                              title={t('Clear All Notifications')}
                              className="text-[10px] font-black text-rose-600 bg-rose-50 hover:bg-rose-100 hover:text-rose-700 transition-colors px-2.5 py-1.5 rounded-xl border border-rose-100/60 flex items-center gap-1 cursor-pointer shadow-xs"
                            >
                              <Trash2 size={11} />
                              <span>{t('Clear All')}</span>
                            </button>
                          )}
                        </div>`;

if (content.includes(oldHeaderButtons)) {
  content = content.replace(oldHeaderButtons, newHeaderButtons);
} else {
  const oldHeaderButtonsCRLF = oldHeaderButtons.replace(/\n/g, '\r\n');
  const newHeaderButtonsCRLF = newHeaderButtons.replace(/\n/g, '\r\n');
  content = content.replace(oldHeaderButtonsCRLF, newHeaderButtonsCRLF);
}

// 4. Update the item delete button
const oldItemTop = `<p className={\`text-sm font-black truncate transition-colors \${n.is_read ? 'text-slate-700' : 'text-slate-900 group-hover:text-indigo-600'}\`}>{n.title}</p>
                                      {!n.is_read && <span className="h-2 w-2 rounded-full bg-indigo-500 shrink-0 mt-1.5 shadow-[0_0_8px_rgba(99,102,241,0.6)]"></span>}`;

const newItemTop = `<p className={\`text-sm font-black truncate transition-colors \${n.is_read ? 'text-slate-700' : 'text-slate-900 group-hover:text-indigo-600'}\`}>{n.title}</p>
                                      <div className="flex items-center gap-1.5 shrink-0">
                                        {!n.is_read && <span className="h-2 w-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]"></span>}
                                        <button
                                          type="button"
                                          onClick={(e) => deleteSingleNotification(e, n.id)}
                                          title={t('Delete')}
                                          className="opacity-0 group-hover:opacity-100 p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
                                        >
                                          <X size={12} />
                                        </button>
                                      </div>`;

if (content.includes(oldItemTop)) {
  content = content.replace(oldItemTop, newItemTop);
} else {
  const oldItemTopCRLF = oldItemTop.replace(/\n/g, '\r\n');
  const newItemTopCRLF = newItemTop.replace(/\n/g, '\r\n');
  content = content.replace(oldItemTopCRLF, newItemTopCRLF);
}

fs.writeFileSync('src/components/Layout.jsx', content, 'utf8');
console.log('Layout.jsx updated successfully with Clear All functionality!');
