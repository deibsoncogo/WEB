export const appRoutes = {
  LOGIN_PAGE: '/',
  FORGOT_PASSWORD: '/password',
  RESET_PASSWORD: '/reset-password',
  DASHBOARD: '/dashboard',
  CATEGORIES: '/categories',
  CONTENTS: '/contents',
  BANNERS: '/banners',
  ALERTS: '/alerts',
  PLANS: '/plans',
  COURSES: '/courses',
  BOOKS: '/books',
  TRAININGS: '/trainings',
  ROOMS: '/rooms',
  COUPONS: '/coupons',
  SALES: '/sales',
  USERS: '/users',
}

export const publicRoutes = [
  appRoutes.LOGIN_PAGE,
  appRoutes.FORGOT_PASSWORD,
  appRoutes.RESET_PASSWORD,
]

export const professorRoutes = [
  appRoutes.ALERTS,
  appRoutes.COURSES,
  appRoutes.DASHBOARD,
  appRoutes.ROOMS,
  appRoutes.TRAININGS,
]

export const adminRoutes = [
  appRoutes.ALERTS,
  appRoutes.BOOKS,
  appRoutes.CONTENTS,
  appRoutes.BANNERS,
  appRoutes.PLANS,
  appRoutes.CATEGORIES,
  appRoutes.USERS,
  appRoutes.SALES,
  appRoutes.COUPONS,
].concat(professorRoutes)
