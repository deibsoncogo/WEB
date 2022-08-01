export const appRoutes = {
  LOGIN_PAGE: '/',
  FORGOT_PASSWORD: '/password',
  RESET_PASSWORD: '/reset-password',
  DASHBOARD: '/dashboard',
  CATEGORIES: '/categories',
  CONTENTS: '/freeContent',
  CREATE_CONTENT: '/freeContent/create',
  EDIT_CONTENT: '/freeContent/edit/[id]',
  BANNERS: '/banners',
  ALERTS: '/notifications',
  PLANS: '/plans',
  COURSES: '/courses',
  EDIT_COURSES: '/courses/edit/[id]',
  BOOKS: '/books',
  TRAININGS: '/trainings',
  EDIT_TRAINING: '/trainings/edit/[id]',
  ROOMS: '/rooms',
  EDIT_ROOM: '/rooms/edit/[id]',
  COUPONS: '/coupons',
  SALES: '/sales',
  USERS: '/users',
  NOTFOUND: '/404',
  CHATROOM: '/rooms/chat/[id]',
  CHATTRAINING: '/trainings/chat/[id]',
}

export const publicRoutes = [
  appRoutes.LOGIN_PAGE,
  appRoutes.FORGOT_PASSWORD,
  appRoutes.RESET_PASSWORD,
]

export const professorRoutes = [
  appRoutes.ALERTS,
  appRoutes.CONTENTS,
  appRoutes.CREATE_CONTENT,
  appRoutes.EDIT_CONTENT,
  appRoutes.COURSES,
  appRoutes.EDIT_COURSES,
  appRoutes.CHATROOM,
  appRoutes.CHATTRAINING,
  appRoutes.DASHBOARD,
  appRoutes.ROOMS,
  appRoutes.EDIT_ROOM,
  appRoutes.TRAININGS,
  appRoutes.EDIT_TRAINING,
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
