export const appRoutes = {
    LOGIN_PAGE : "/" ,
    FORGOT_PASSWORD : "/forgetPassword",
    RESET_PASSWORD : "/resetPassword",
    USERS : "/users",
    CATEGORIES : "/categories",
    CONTENTS : "/contents",
    BANNERS : "/banners",
    ALERTS : "/alerts", 
    PROFESSOR: "/teacher",
    DASHBOARD: "/dashboard",  
}

export const unprotectedRoutes = [appRoutes.LOGIN_PAGE,
                                  appRoutes.FORGOT_PASSWORD, 
                                  appRoutes.RESET_PASSWORD]


export const professorRoutes = [appRoutes.PROFESSOR,
                                appRoutes.DASHBOARD]

export const adminRoutes = [professorRoutes,
                            appRoutes.USERS,
                            appRoutes.CATEGORIES,
                            appRoutes.CONTENTS,
                            appRoutes.BANNERS,
                            appRoutes.BANNERS     

                           ]