"use server"

import { findAllUsers } from "@/lib/user/queries"

export async function getUsers(page: number = 1, perPage: number = 10) {
    const result = await findAllUsers(page, perPage)
    return result
}