import { Role } from "./Role"

export interface User {
    username: string,
    password: string,
    enabled: boolean,
    roles: Role[]
}