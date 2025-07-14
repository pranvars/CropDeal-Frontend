
# 🌾 CropDeal Frontend

This is the **Angular-based frontend** for the CropDeal project — a platform that connects **Farmers** and **Dealers** for transparent crop transactions, profile management, and crop trading.

---

## 🖥️ Tech Stack

- **Frontend Framework**: Angular 16+
- **Styling**: Bootstrap 5
- **State Management**: Services with RxJS
- **Routing**: Angular Router (via `app.routes.ts`)
- **Module Setup**: Custom configuration using `app.config.ts`

---

## 📦 Features Overview

### 👤 Authentication
- Signup with roles: Farmer / Dealer
- Login and route-based role redirection
- JWT token stored for authorized API calls

### 🌱 Farmer Dashboard
- **View & Update Profile**
- **Publish Crops**
- **View Published Crops**
- **Track Transactions**

### 🛒 Dealer Dashboard
- **View & Update Profile**
- **Browse All Crops**
- **Buy Crops**
- **View Transactions**
- **Print Receipt via Modal**

---

## 🧰 Project Structure

```
CropDeal-Frontend/
├── src/
│   ├── app/
│   │   ├── auth/
│   │   ├── farmer/
│   │   ├── dealer/
│   │   ├── admin/
│   │   ├── services/
│   │   ├── models/
│   │   ├── shared/
│   │   ├── app.routes.ts
│   │   └── app.config.ts
│   └── assets/
├── angular.json
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### 📝 Prerequisites

- [Node.js (18+)](https://nodejs.org/)
- [Angular CLI](https://angular.io/cli)
- Backend APIs running locally (or hosted)

### ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/cropdeal-frontend.git
   cd cropdeal-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the Angular app**
   ```bash
   ng serve
   ```

4. Visit `http://localhost:4200` in your browser.

---

## 🔐 Authentication Flow

- Signup page collects:
  - Username, Email, Password, Role, Location
  - Bank Details (Account No., IFSC Code)
- On signup:
  - User is created in backend Auth DB
  - Additional details stored in respective Farmer/Dealer DB
- After login:
  - JWT token stored in localStorage
  - Role-based route redirection (e.g., to `/farmer-dashboard` or `/dealer-dashboard`)

---

## 📋 Forms Used

- **Reactive Forms** and **Template-Driven Forms**
- Bootstrap-based styling
- Form validations with user feedback

---

## 🧠 Data Binding & Sharing

- Uses `ngModel` for two-way binding
- Services used to:
  - Share data between components
  - Maintain user session
  - Handle API calls with authorization headers

---

## 🧪 Testing & Debugging

- Unit tests can be added using:
  - Jasmine
  - Karma
- You can run tests with:
  ```bash
  ng test
  ```

---

## 📬 API Integration

- API base URLs configured in environment files
- Services handle:
  - Token injection
  - HTTP request headers
  - Error handling

---

## 📃 License

This project is licensed under the MIT License.

---

## 🤝 Contributing

Pull requests are welcome. Please open issues to suggest features or report bugs.

---

## 📬 Contact

- Created by [Pranav Varshney](https://github.com/claudikt)
- For questions, email: prnvvarshney@gmail.com
