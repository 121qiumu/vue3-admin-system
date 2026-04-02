export default {
  dashboard: {
    page: {
      overviewTitle: 'Operations overview',
      overviewDesc:
        'Dashboard data is returned by mock APIs, and different roles will see different summaries.',
      refresh: 'Refresh dashboard',
      refreshSuccess: 'Dashboard data has been refreshed.',
      loadFailedTitle: 'Failed to load dashboard data',
      loadFailedTip: 'You can click the button below to reload the workspace data.'
    },
    welcome: {
      title: 'Welcome to today’s admin workspace',
      lastLogin: 'Last sign-in: {time}'
    },
    panels: {
      shortcut: {
        title: 'Quick access',
        description:
          'Place common actions on the homepage to avoid repeatedly searching through menus.',
        emptyTitle: 'No quick access yet',
        emptyDescription: 'No direct shortcuts have been configured for the current role yet.'
      },
      recent: {
        title: 'Recent actions',
        description: 'Helps you quickly review the latest activity for this role.',
        emptyTitle: 'No recent actions',
        emptyDescription: 'No recent records are available for the current role yet.',
        operator: 'Operator: {name}'
      },
      notice: {
        title: 'System notices',
        description:
          'Important reminders are placed on the dashboard so they are easier to notice.',
        emptyTitle: 'No system notices',
        emptyDescription: 'There are currently no new notices or maintenance reminders to display.',
        publishTime: 'Published at: {time}'
      }
    },
    shortcutMessages: {
      permissionAudit:
        'The permission audit page will be added in a later business module. For now, the shortcut stays here as a placeholder.',
      publishNotice:
        'Notice management will usually be expanded in the system module later. For now, this shortcut simply demonstrates the dashboard structure.',
      contentCalendar:
        'The content calendar is currently kept as a placeholder. The page can be added when a real business module is introduced later.',
      publishDraft:
        'The pending publish page normally belongs to a content module, so the shortcut is kept here as a reserved entry for now.',
      placeholder: 'This shortcut is currently reserved as a structural placeholder.'
    }
  }
}
