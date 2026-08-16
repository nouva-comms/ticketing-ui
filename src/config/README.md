# Configuration Files

Kumpulan file konfigurasi untuk menyimpan data dan setting yang dipakai berulang-ulang di seluruh aplikasi.

## Struktur Folder

```
src/
├── config/
│   ├── constants.js     # Constants: pilihan, status, validasi, dll
│   ├── settings.js      # Settings: API, auth, UI, feature flags, dll
│   ├── messages.js      # Messages: label, validation, error, success, dll
│   ├── colors.js        # Color palette: warna & opacity
│   ├── index.js         # Export point untuk semua config
│   └── README.md        # Dokumentasi ini
```

## File Descriptions

### 1. `constants.js` - Application Constants

Menyimpan nilai-nilai konstan yang sering digunakan:

```javascript
import { 
  IDENTITY_TYPE_OPTIONS,
  AGE_OPTIONS,
  GENDER_OPTIONS,
  SHIRT_SIZE_OPTIONS,
  TICKET_STATUS,
  PAYMENT_STATUS,
  PAYMENT_METHODS,
  EVENT_STATUS,
  USER_ROLES,
  PAGINATION,
  DATE_FORMATS,
  VALIDATION,
  REGEX
} from "@/config";
```

**Contoh penggunaan:**

```javascript
// Form options
<Select options={GENDER_OPTIONS} />

// Status checking
if (ticket.status === TICKET_STATUS.PENDING) { }

// Validation
const regex = REGEX.EMAIL;

// Pagination
const { DEFAULT_PAGE, DEFAULT_LIMIT } = PAGINATION;
```

### 2. `settings.js` - Application Settings

Konfigurasi global aplikasi:

```javascript
import { 
  API_CONFIG,
  AUTH_CONFIG,
  STORAGE_CONFIG,
  UI_CONFIG,
  API_ENDPOINTS,
  ROUTE_PATHS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  ENVIRONMENT,
  FEATURE_FLAGS
} from "@/config";
```

**Contoh penggunaan:**

```javascript
// API Configuration
const { BASE_URL, TIMEOUT } = API_CONFIG;

// Route navigation
navigate(ROUTE_PATHS.DASHBOARD);

// Feature flags
if (FEATURE_FLAGS.ENABLE_ANALYTICS) { }

// Environment check
if (ENVIRONMENT.IS_DEVELOPMENT) {
  console.log("Debug mode");
}

// Error handling
showErrorToast(ERROR_MESSAGES.NETWORK_ERROR);
```

### 3. `messages.js` - Application Messages

Pesan dan label yang digunakan di UI:

```javascript
import { 
  VALIDATION_MESSAGES,
  FORM_LABELS,
  ACTION_BUTTONS,
  CONFIRMATION_MESSAGES,
  EMPTY_STATE_MESSAGES,
  PLACEHOLDERS,
  LOADING_MESSAGES,
  ERROR_MESSAGES_DETAILED,
  SUCCESS_MESSAGES_DETAILED,
  STATUS_LABELS,
  DATE_TIME_LABELS,
  HELP_MESSAGES
} from "@/config";
```

**Contoh penggunaan:**

```javascript
// Form labels
<Label>{FORM_LABELS.FULL_NAME}</Label>

// Validation messages
if (!email) error = VALIDATION_MESSAGES.FIELD_REQUIRED;

// Button labels
<Button>{ACTION_BUTTONS.SUBMIT}</Button>

// Status display
<span>{STATUS_LABELS.COMPLETED}</span>

// Error toast
toast.error(ERROR_MESSAGES_DETAILED.NETWORK_ERROR);

// Confirmation dialog
confirm(CONFIRMATION_MESSAGES.DELETE_ITEM("ticket"));

// Placeholder
<input placeholder={PLACEHOLDERS.ENTER_NAME} />

// Help text
<HelpText>{HELP_MESSAGES.PASSWORD_REQUIREMENTS}</HelpText>
```

### 4. `colors.js` - Color Palette

Definisi warna dan fungsi warna:

```javascript
import { 
  PRIMARY_COLORS,
  SECONDARY_COLORS,
  SUCCESS_COLORS,
  ERROR_COLORS,
  WARNING_COLORS,
  NEUTRAL_COLORS,
  TEXT_COLORS,
  BACKGROUND_COLORS,
  STATUS_COLORS,
  OPACITY,
  getColorWithOpacity,
  getStatusColor
} from "@/config";
```

**Contoh penggunaan:**

```javascript
// Direct color
<Box sx={{ color: TEXT_COLORS.PRIMARY }} />

// Primary color
<Button sx={{ backgroundColor: PRIMARY_COLORS.MAIN }} />

// With opacity
const color = getColorWithOpacity(PRIMARY_COLORS.MAIN, OPACITY.HOVER);

// Status color
const color = getStatusColor("completed"); // Returns green

// Neutral grays
<Box sx={{ backgroundColor: NEUTRAL_COLORS.GRAY_100 }} />
```

## Usage Examples

### Example 1: Form Validation

```javascript
import { 
  VALIDATION_MESSAGES,
  FORM_LABELS,
  REGEX 
} from "@/config";

const validateEmail = (email) => {
  if (!email) {
    return VALIDATION_MESSAGES.FIELD_REQUIRED;
  }
  if (!REGEX.EMAIL.test(email)) {
    return VALIDATION_MESSAGES.INVALID_EMAIL;
  }
  return "";
};

const validatePhone = (phone) => {
  if (!phone) {
    return VALIDATION_MESSAGES.FIELD_REQUIRED;
  }
  if (!REGEX.PHONE.test(phone)) {
    return VALIDATION_MESSAGES.INVALID_PHONE;
  }
  return "";
};
```

### Example 2: Select Options

```javascript
import { 
  GENDER_OPTIONS,
  AGE_OPTIONS,
  PAYMENT_METHOD_OPTIONS 
} from "@/config";

<Form>
  <FormField
    label="Jenis Kelamin"
    options={GENDER_OPTIONS}
  />
  <FormField
    label="Usia"
    options={AGE_OPTIONS}
  />
  <FormField
    label="Metode Pembayaran"
    options={PAYMENT_METHOD_OPTIONS}
  />
</Form>
```

### Example 3: API Endpoints

```javascript
import { API_ENDPOINTS, API_CONFIG } from "@/config";

const getTicket = async (ticketId) => {
  const endpoint = API_ENDPOINTS.GET_TICKET.replace(":id", ticketId);
  const response = await fetch(
    `${API_CONFIG.BASE_URL}${endpoint}`
  );
  return response.json();
};
```

### Example 4: Status Display

```javascript
import { STATUS_COLORS, STATUS_LABELS, TICKET_STATUS } from "@/config";

const TicketStatusBadge = ({ status }) => {
  return (
    <Badge 
      color={STATUS_COLORS[status.toUpperCase()]}
      label={STATUS_LABELS[status.toUpperCase()]}
    />
  );
};
```

### Example 5: Toast Notifications

```javascript
import { SUCCESS_MESSAGES_DETAILED, ERROR_MESSAGES_DETAILED } from "@/config";

try {
  await ticketService.createTicket(data);
  toast.success(SUCCESS_MESSAGES_DETAILED.CREATE_SUCCESS);
} catch (error) {
  toast.error(ERROR_MESSAGES_DETAILED.SERVER_ERROR);
}
```

## Adding New Configuration

Untuk menambah konfigurasi baru, pilih file yang sesuai:

1. **Constants** - Pilihan/opsi yang statis
2. **Settings** - API URL, feature flags, timeout, dll
3. **Messages** - Teks UI, label, error message
4. **Colors** - Warna aplikasi

**Template untuk menambah opsi:**

```javascript
// Di constants.js
export const NEW_CONSTANT = {
  OPTION_1: "option_1",
  OPTION_2: "option_2",
};

export const NEW_CONSTANT_OPTIONS = [
  { value: NEW_CONSTANT.OPTION_1, label: "Label 1" },
  { value: NEW_CONSTANT.OPTION_2, label: "Label 2" },
];
```

## Best Practices

✅ **DO:**
- Gunakan constants untuk nilai yang berulang
- Gunakan VALIDATION_MESSAGES untuk error UI
- Gunakan STATUS_COLORS untuk warna status
- Group related config dalam satu object
- Dokumentasi di README jika ada config baru

❌ **DON'T:**
- Hardcode string di component
- Hardcode warna di component
- Menyimpan config di .env tanpa dokumentasi
- Membuat constant yang terlalu spesifik

## Import Patterns

```javascript
// Import specific
import { GENDER_OPTIONS, TICKET_STATUS } from "@/config";

// Import all from specific file
import * as Constants from "@/config/constants";

// Import everything
import Config from "@/config";
```

---

**Last Updated:** August 2024
