import { UserLogout } from "../../../models/userLogout";

export interface ILogout {
    logout:(userLogout: UserLogout) => Promise<boolean>
}