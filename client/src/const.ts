// App-level constants for the user-facing frontend

export const AXIOS_TIMEOUT_MS = 30_000;
export const UNAUTHED_ERR_MSG = "Please login";
export const NOT_ADMIN_ERR_MSG = "You do not have required permission";

/**
 * Returns the URL to send unauthenticated users to.
 */
export const getLoginUrl = () => "/login";
