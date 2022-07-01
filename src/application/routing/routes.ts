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
  NOTFOUND: '/404',
}

export const publicRoutes = [
  appRoutes.LOGIN_PAGE,
  appRoutes.FORGOT_PASSWORD,
  appRoutes.RESET_PASSWORD,
]

export const professorRoutes = [
  appRoutes.ALERTS,
  appRoutes.CONTENTS,
  appRoutes.COURSES,
  appRoutes.DASHBOARD,
  appRoutes.ROOMS,
  appRoutes.TRAININGS,
  appRoutes.NOTFOUND
]

export const adminRoutes = [
  appRoutes.ALERTS,
  appRoutes.BOOKS,  
  appRoutes.BANNERS,
  appRoutes.PLANS,
  appRoutes.CATEGORIES,
  appRoutes.USERS,
  appRoutes.SALES,
  appRoutes.COUPONS,
].concat(professorRoutes)
