export const paths = {
  home: '/',
  auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up' },
  dashboard: {
    overview: '/dashboard',
    account: '/errors/not-found',
    customers: '/errors/not-found',
    integrations: '/errors/not-found',
    settings: '/errors/not-found',
  },
  errors: { notFound: '/errors/not-found' },
} as const;
