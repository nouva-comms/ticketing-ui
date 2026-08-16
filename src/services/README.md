# API Service Documentation

Service untuk manage semua HTTP requests ke API dengan pattern yang konsisten dan mudah digunakan.

## Struktur Folder

```
src/
├── services/
│   ├── apiClient.js    # Base API client dengan fetch
│   ├── api.js          # Service collection untuk berbagai resources
│   └── index.js        # Export point untuk semua services
```

## Base URL

```
https://rlhhz9pp-5700.asse.devtunnels.ms/ap
```

## Features

✅ Automatic Authorization Header (Bearer Token)  
✅ Error Handling  
✅ Auto redirect ke login jika token expired (401)  
✅ Support GET, POST, PUT, DELETE, PATCH  
✅ Query parameters support  

## Cara Menggunakan

### 1. Import Service

```javascript
import { ticketService, eventService, authService } from "@/services";

// atau
import { apiService } from "@/services";
```

### 2. Tickets Service

```javascript
// Ambil semua tickets
const tickets = await ticketService.getAllTickets();

// Ambil dengan filter/pagination
const tickets = await ticketService.getAllTickets({
  page: 1,
  limit: 10,
  status: "active"
});

// Ambil detail ticket
const ticket = await ticketService.getTicketById("123");

// Buat ticket baru
const newTicket = await ticketService.createTicket({
  name: "John Doe",
  email: "john@example.com",
  // ... other fields
});

// Update ticket
const updated = await ticketService.updateTicket("123", {
  status: "paid"
});

// Delete ticket
await ticketService.deleteTicket("123");
```

### 3. Events Service

```javascript
// Ambil semua events
const events = await eventService.getAllEvents();

// Ambil event by ID
const event = await eventService.getEventById("123");

// Buat event
const newEvent = await eventService.createEvent({
  title: "Music Festival 2024",
  date: "2024-12-25"
});

// Update event
const updated = await eventService.updateEvent("123", {
  title: "New Title"
});

// Ambil participants
const participants = await eventService.getEventParticipants("123");
```

### 4. Auth Service

```javascript
// Login
const response = await authService.login("user@example.com", "password");
// Token otomatis disimpan di localStorage

// Logout
authService.logout();

// Get current user info
const user = await authService.getCurrentUser();

// Register
const newUser = await authService.register({
  email: "user@example.com",
  password: "secure123"
});

// Refresh token
const newToken = await authService.refreshToken();
```

### 5. Gunakan di React Component

```javascript
import { useEffect, useState } from "react";
import { ticketService } from "@/services";

export const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        const data = await ticketService.getAllTickets();
        setTickets(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {tickets.map(ticket => (
        <div key={ticket.id}>{ticket.name}</div>
      ))}
    </div>
  );
};
```

## Error Handling

### Try-Catch Pattern

```javascript
try {
  const ticket = await ticketService.getTicketById("123");
  console.log(ticket);
} catch (error) {
  // Error otomatis di-log di console
  // Response format: { status, message, data }
  console.error("Failed:", error);
  
  // Parse error
  try {
    const errorData = JSON.parse(error.message);
    if (errorData.status === 401) {
      // Handle unauthorized
    }
  } catch (e) {
    // Error message biasa
  }
}
```

## Authentication

Token otomatis ditambahkan ke semua requests:

```
Authorization: Bearer <token>
```

Token disimpan di `localStorage.authToken` dan ditambahkan automatically oleh `apiClient`.

Jika mendapat 401 Unauthorized:
- Token dihapus dari localStorage
- User redirect ke `/login`

## Custom Headers

Tambahkan custom headers:

```javascript
await apiGet("/tickets", {
  headers: {
    "X-Custom-Header": "value"
  }
});
```

## Adding New Service

Edit `src/services/api.js` dan tambahkan:

```javascript
export const customService = {
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/custom${queryString ? `?${queryString}` : ""}`;
    return apiGet(endpoint);
  },

  getById: async (id) => {
    return apiGet(`/custom/${id}`);
  },

  create: async (data) => {
    return apiPost("/custom", data);
  },

  update: async (id, data) => {
    return apiPut(`/custom/${id}`, data);
  },

  delete: async (id) => {
    return apiDelete(`/custom/${id}`);
  },
};
```

## API Endpoints Reference

Base: `https://rlhhz9pp-5700.asse.devtunnels.ms/ap`

### Tickets
- `GET /tickets` - Ambil semua
- `GET /tickets/:id` - Detail
- `POST /tickets` - Buat baru
- `PUT /tickets/:id` - Update
- `DELETE /tickets/:id` - Hapus

### Events
- `GET /events` - Ambil semua
- `GET /events/:id` - Detail
- `POST /events` - Buat baru
- `PUT /events/:id` - Update
- `DELETE /events/:id` - Hapus
- `GET /events/:id/participants` - List participants

### Auth
- `POST /auth/login` - Login
- `POST /auth/register` - Register
- `GET /auth/me` - Current user
- `POST /auth/refresh-token` - Refresh token

### Users
- `GET /users` - Ambil semua
- `GET /users/:id` - Detail
- `PUT /users/profile` - Update profile
- `POST /users/change-password` - Change password

### Payments
- `GET /payments` - Ambil semua
- `GET /payments/:id` - Detail
- `POST /payments` - Buat baru
- `PATCH /payments/:id` - Update status
- `POST /payments/:id/verify` - Verify

---

**Last Updated:** 2024
