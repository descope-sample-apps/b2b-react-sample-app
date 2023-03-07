export const getDisplayName = (user) => {
    return user?.name || user?.email || "";
}
