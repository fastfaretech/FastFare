export type UserRole = "admin" | "partner" | "user" | "guest";

export function getUserRole(): UserRole {
  return (localStorage.getItem("role") as UserRole) || "user";
}
