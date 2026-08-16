/**
 * API Service
 * Kumpulan fungsi untuk API calls yang dikelompokkan berdasarkan resource
 */

import {
  apiGet,
  apiPost,
  apiPut,
  apiDelete,
  apiPatch,
} from "./apiClient";

/**
 * ============================================
 * TICKETS API
 * ============================================
 */
export const ticketService = {
  /**
   * Ambil semua tickets
   */
  getAllTickets: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/tickets${queryString ? `?${queryString}` : ""}`;
    return apiGet(endpoint);
  },

  /**
   * Ambil detail ticket by ID
   */
  getTicketById: async (ticketId) => {
    return apiGet(`/tickets/${ticketId}`);
  },

  /**
   * Buat ticket baru
   */
  createTicket: async (ticketData) => {
    return apiPost("/tickets", ticketData);
  },

  /**
   * Update ticket
   */
  updateTicket: async (ticketId, ticketData) => {
    return apiPut(`/tickets/${ticketId}`, ticketData);
  },

  /**
   * Delete ticket
   */
  deleteTicket: async (ticketId) => {
    return apiDelete(`/tickets/${ticketId}`);
  },
};

/**
 * ============================================
 * EVENTS API
 * ============================================
 */
export const eventService = {
  /**
   * Ambil semua events
   */
  getAllEvents: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/events${queryString ? `?${queryString}` : ""}`;
    return apiGet(endpoint);
  },

  /**
   * Ambil detail event by ID
   */
  getEventById: async (eventId) => {
    return apiGet(`/events/${eventId}`);
  },

  /**
   * Buat event baru
   */
  createEvent: async (eventData) => {
    return apiPost("/events", eventData);
  },

  /**
   * Update event
   */
  updateEvent: async (eventId, eventData) => {
    return apiPut(`/events/${eventId}`, eventData);
  },

  /**
   * Delete event
   */
  deleteEvent: async (eventId) => {
    return apiDelete(`/events/${eventId}`);
  },

  /**
   * Ambil participants dari event
   */
  getEventParticipants: async (eventId, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/events/${eventId}/participants${
      queryString ? `?${queryString}` : ""
    }`;
    return apiGet(endpoint);
  },
};

/**
 * ============================================
 * AUTHENTICATION API
 * ============================================
 */
export const authService = {
  /**
   * Login user
   */
  login: async (email, password) => {
    const response = await apiPost("/auth/login", { email, password });
    if (response.token) {
      localStorage.setItem("authToken", response.token);
    }
    return response;
  },

  /**
   * Logout user
   */
  logout: () => {
    localStorage.removeItem("authToken");
  },

  /**
   * Get current user info
   */
  getCurrentUser: async () => {
    return apiGet("/auth/me");
  },

  /**
   * Register user baru
   */
  register: async (userData) => {
    return apiPost("/auth/register", userData);
  },

  /**
   * Refresh token
   */
  refreshToken: async () => {
    const response = await apiPost("/auth/refresh-token");
    if (response.token) {
      localStorage.setItem("authToken", response.token);
    }
    return response;
  },
};

/**
 * ============================================
 * USERS API
 * ============================================
 */
export const userService = {
  /**
   * Ambil semua users
   */
  getAllUsers: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/users${queryString ? `?${queryString}` : ""}`;
    return apiGet(endpoint);
  },

  /**
   * Ambil user by ID
   */
  getUserById: async (userId) => {
    return apiGet(`/users/${userId}`);
  },

  /**
   * Update user profile
   */
  updateProfile: async (userData) => {
    return apiPut("/users/profile", userData);
  },

  /**
   * Change password
   */
  changePassword: async (oldPassword, newPassword) => {
    return apiPost("/users/change-password", {
      oldPassword,
      newPassword,
    });
  },
};

/**
 * ============================================
 * PAYMENTS API
 * ============================================
 */
export const paymentService = {
  /**
   * Ambil semua payments
   */
  getAllPayments: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/payments${queryString ? `?${queryString}` : ""}`;
    return apiGet(endpoint);
  },

  /**
   * Ambil detail payment by ID
   */
  getPaymentById: async (paymentId) => {
    return apiGet(`/payments/${paymentId}`);
  },

  /**
   * Buat payment baru
   */
  createPayment: async (paymentData) => {
    return apiPost("/payments", paymentData);
  },

  /**
   * Update payment status
   */
  updatePaymentStatus: async (paymentId, status) => {
    return apiPatch(`/payments/${paymentId}`, { status });
  },

  /**
   * Verifikasi payment
   */
  verifyPayment: async (paymentId) => {
    return apiPost(`/payments/${paymentId}/verify`);
  },
};

/**
 * ============================================
 * EXPORT semua services
 * ============================================
 */
export default {
  ticket: ticketService,
  event: eventService,
  auth: authService,
  user: userService,
  payment: paymentService,
};
