import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function validateUserInput(per_page: number, page: number, location: string, sort: string) {
    if (per_page == 0 || per_page > 100)
        throw new Error("Invalid per_page value (max 100) (min 1)")
    if (page == 0 || page > 10)
        throw new Error("Invalid page value (max 10) (min 1)")
    if (location != "Morocco" && location != "France")
        throw new Error("Invalid location value (morocco or france are the only valid locations for this demo)")
    if (sort != "followers" && sort != "repositories")
        throw new Error("Invalid sort value (followers or repositories)")
}
