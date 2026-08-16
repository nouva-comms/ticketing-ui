/**
 * API Client Configuration
 * Base configuration untuk semua HTTP requests
 */

const API_BASE_URL = "https://rlhhz9pp-5700.asse.devtunnels.ms/api";

/**
 * Request headers default
 */
const getDefaultHeaders = () => ({
  "Content-Type": "application/json",
});

/**
 * Get token dari localStorage (jika ada)
 */
const getAuthToken = () => {
  try {
    return localStorage.getItem("authToken");
  } catch (error) {
    console.error("Error getting auth token:", error);
    return null;
  }
};

/**
 * Build headers dengan authentication
 */
const buildHeaders = (customHeaders = {}) => {
  const headers = {
    ...getDefaultHeaders(),
    ...customHeaders,
  };

  const token = getAuthToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

/**
 * Handle response error
 */
const handleError = (error, response) => {
  if (response?.status === 401) {
    // Token expired atau unauthorized
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  }

  const errorData = {
    status: response?.status,
    message: error.message || "An error occurred",
    data: error,
  };

  throw new Error(JSON.stringify(errorData));
};

/**
 * Generic GET request
 */
export const apiGet = async (endpoint, options = {}) => {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      method: "GET",
      headers: buildHeaders(options.headers),
      ...options,
    });

    if (!response.ok) {
      handleError(new Error(`HTTP ${response.status}`), response);
    }

    return await response.json();
  } catch (error) {
    console.error(`GET ${endpoint} error:`, error);
    throw error;
  }
};

/**
 * Generic POST request
 */
export const apiPost = async (endpoint, data = {}, options = {}) => {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      method: "POST",
      headers: buildHeaders(options.headers),
      body: JSON.stringify(data),
      ...options,
    });

    if (!response.ok) {
      handleError(new Error(`HTTP ${response.status}`), response);
    }

    return await response.json();
  } catch (error) {
    console.error(`POST ${endpoint} error:`, error);
    throw error;
  }
};

/**
 * Generic PUT request
 */
export const apiPut = async (endpoint, data = {}, options = {}) => {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: buildHeaders(options.headers),
      body: JSON.stringify(data),
      ...options,
    });

    if (!response.ok) {
      handleError(new Error(`HTTP ${response.status}`), response);
    }

    return await response.json();
  } catch (error) {
    console.error(`PUT ${endpoint} error:`, error);
    throw error;
  }
};

/**
 * Generic DELETE request
 */
export const apiDelete = async (endpoint, options = {}) => {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: buildHeaders(options.headers),
      ...options,
    });

    if (!response.ok) {
      handleError(new Error(`HTTP ${response.status}`), response);
    }

    return await response.json();
  } catch (error) {
    console.error(`DELETE ${endpoint} error:`, error);
    throw error;
  }
};

/**
 * Generic PATCH request
 */
export const apiPatch = async (endpoint, data = {}, options = {}) => {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      method: "PATCH",
      headers: buildHeaders(options.headers),
      body: JSON.stringify(data),
      ...options,
    });

    if (!response.ok) {
      handleError(new Error(`HTTP ${response.status}`), response);
    }

    return await response.json();
  } catch (error) {
    console.error(`PATCH ${endpoint} error:`, error);
    throw error;
  }
};

export { API_BASE_URL };
