export const appRoutes = {
    LOGIN_PAGE : "/" ,
    FORGOT_PASSWORD : "/password",
    RESET_PASSWORD : "/reset-password", 
    DASHBOARD: "/dashboard",    
    CATEGORIES : "/categories",
    CONTENTS : "/contents",
    BANNERS : "/banners",
    ALERTS : "/alerts", 
    PLANNS: "/planns",
    COURSES: "/courses",
    BOOKS: "/books",
    TRAININGS: "/trainings",
    ROOMS: "/rooms",
    COUPONS: "/coupons",
    SALES: "/sales",    
    USERS : "/users", 
    LOGOUT: "/logout",
    UNAUTHORIZED: "/unauthorized"

}

export const unprotectedRoutes = [appRoutes.LOGIN_PAGE,
                                  appRoutes.FORGOT_PASSWORD, 
                                  appRoutes.RESET_PASSWORD]


export const professorRoutes = [appRoutes.COURSES,
                                appRoutes.BOOKS]

export const adminRoutes = [appRoutes.USERS,
                            appRoutes.CATEGORIES,
                            appRoutes.CONTENTS,
                            appRoutes.BANNERS,
                            appRoutes.BANNERS
                           ].concat(professorRoutes)