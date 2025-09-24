export type Role = keyof typeof ROLES;
type Permission = (typeof ROLES)[Role][number];

const ROLES = {
  user: [
    "view:comments",
    "create:comments",
    "update:ownComments",
    "delete:ownComments",
  ],
  admin: [
    "view:comments",
    "create:comments",
    "delete:comments",
    "update:notModComments",
    "delete:notModComments",
  ],
  moderator: [
    "view:comments",
    "create:comments",
    "update:ownComments",
    "delete:comments",
  ],
};

export function hasPermission(
  user: { id: string; role: Role },
  permission: Permission,
  resource?: { userId: string; role?: string }
) {
  const permissions = ROLES[user.role];

  if (!permissions.includes(permission)) return false;

  // Handle "own" permissions
  if (
    permission === "update:ownComments" ||
    permission === "delete:ownComments"
  ) {
    return resource?.userId === user.id;
  }

  // Handle "notModComments"
  if (
    permission === "update:notModComments" ||
    permission === "delete:notModComments"
  ) {
    return resource?.role !== "moderator";
  }

  // "delete:comments" (moderator full permission) or other general permission
  return true;
}
