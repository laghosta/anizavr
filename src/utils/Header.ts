export const header = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("JWT")}`,
}