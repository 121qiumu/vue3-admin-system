export default {
  login: {
    badge: 'Vue 3 Admin Template',
    title: 'Build a real admin system from zero to one',
    description:
      'This step wires together local mocks, permission menus, button permissions and the sign-in flow so the learning project behaves like a real admin system.',
    hero: {
      toolbarSubtitle: 'Sign-in entry / Admin Starter',
      eyebrow: 'Mock, permissions and routing are already wired together',
      stageTag: 'Current stage',
      stageTitle: 'Stabilise the admin flow first, then switch to the real backend smoothly',
      stageDescription:
        'This page is no longer just a form demo. It now makes the user session, dynamic menus, button permissions and route guards work as one chain, so replacing the API later does not require a rewrite.',
      metrics: {
        accounts: 'Demo accounts',
        menus: 'Dynamic menus',
        permissions: 'Button permissions'
      }
    },
    featureList: {
      mockDriven: {
        title: 'Local mock first',
        description:
          'Mock APIs are enabled by default in development so the page flow, state flow and permission flow can be built before the real backend is ready.'
      },
      switchBackend: {
        title: 'Easy switch to the real backend',
        description:
          'The API layer decides whether to use mocks or the real request layer, so it is not tightly coupled to any single mock tool.'
      },
      permission: {
        title: 'Menus and button permissions are separate',
        description:
          'admin and editor receive different dynamic menus and button permission codes, which makes the permission model easier to learn.'
      }
    },
    card: {
      title: 'Account sign-in',
      subtitle:
        'Keep the focus on the current account and permission entry so the sign-in action feels clear and efficient.',
      mockTag: 'Mock is enabled in development',
      alertTitle: 'Development environment note',
      alert:
        'The current stage uses local mock APIs first. When you switch to a real backend later, you only need to disable VITE_USE_MOCK and replace the API address.',
      helperTitle: 'Start with a demo account',
      helperText:
        'Click an account card below to auto-fill the form and quickly compare the menu scope and button permissions across roles.'
    },
    form: {
      username: 'Username',
      password: 'Password',
      usernamePlaceholder: 'Please enter your username',
      passwordPlaceholder: 'Please enter your password',
      submit: 'Sign in',
      submitting: 'Signing in, please wait...'
    },
    accountPanel: {
      title: 'Ready-to-use mock accounts',
      tip: 'Click an account card to auto-fill the form',
      current: 'Current fill',
      fillAction: 'Fill form',
      account: 'Account',
      password: 'Password',
      asyncMenuCount: '{count} dynamic menu groups',
      buttonPermissionCount: '{count} button permissions'
    },
    validation: {
      usernameRequired: 'Please enter your username',
      usernameLength: 'The username should be between 3 and 20 characters.',
      passwordRequired: 'Please enter your password',
      passwordLength: 'The password should be between 6 and 20 characters.'
    },
    messages: {
      loadMockAccountFailed: 'Failed to load the demo account list.',
      loginSuccessTitle: 'Welcome in',
      loginSuccess: 'Signed in successfully. Welcome back, {name}.',
      loginFailedTitle: 'Sign-in not completed',
      loginFailed: 'Sign-in failed. Please try again later.'
    }
  }
}
