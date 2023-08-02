import { Link } from "@/utils/Link";

export function customFetch(
    url: string,
    method: string,
    body?: any,
    contentType: string = "application/json",
) {

    return fetch(`${Link}/${url}`, {
        method,
        body,
        headers: {
            "Content-Type": contentType,
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "6024",
            Authorization:`Bearer ${typeof window !== "undefined" && localStorage.getItem("JWT")}`
        },
    });
}
