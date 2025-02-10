# 🚀 Aampere Project  

## 🏗 **Project Overview**  
This project consists of:  
- **Frontend:** Built with Next.js (App Router)  
- **Backend:** Built with NestJS  
- **Database:** PostgreSQL (Supports TypeORM & Mongoose)  

### **✨ Features**  

#### 🖥 **Frontend (Next.js)**  
✅ **Next.js with App Router Support**  
✅ **🔥 Type Checking with TypeScript**  
✅ **💎 Tailwind CSS Integration**  
✅ **✅ Strict Mode for TypeScript & React 19**  
✅ **SEO-Friendly & Production-Ready** 🚀  

#### ⚙ **Developer Experience**  
✅ **Husky for Git Hooks**  
✅ **Unit Testing with Vitest & React Testing Library**  
✅ **🧪 Integration & E2E Testing with Playwright**  
✅ **Minimal Code & Unstyled Template for Easy Customization**  
✅ **Nothing is hidden—full flexibility to adjust as needed**  

#### 🛠 **Backend (NestJS)**  
✅ **JWT Authentication** 🔐  
✅ **Pagination & CRUD Functionality for Electric Vehicles**  
✅ **Swagger API Documentation** 📄  
✅ **Dockerized Setup** 🐳  
✅ **Database Seeding with SQL file** 📂  
✅ **E2E & Unit Tests** 🧪  
✅ **ESLint + Prettier for Code Quality** 🛠  

---

## 📦 **Installation & Setup**  

### **1️⃣ Clone the Repository**  
```sh
git clone https://github.com/gautam-paladiya/aampere-project
cd aampere-project
```

### **2️⃣ Run the Project with Docker**  
```sh
docker-compose up --build -d
```

### **3️⃣ Restore the Database**  
```sh
docker exec -i postgres_db psql -U aampere -d aampere < db/db_backup.sql
```

---

## 🌍 **Accessing the Application**  

- **Frontend (Next.js) runs on:** [`http://localhost:3000`](http://localhost:3000)  
- **Backend Swagger API documentation is available at:** [`http://localhost:4000/docs`](http://localhost:4000/docs)  

---

## 🧪 **Testing**  

### **Postman Collection**  
https://documenter.getpostman.com/view/26754986/2sAYX8HLtB

### **Frontend (Next.js) Tests**  
```sh
# Run unit tests
yarn test

# Run integration & E2E tests
yarn test:e2e
```

### **Backend (NestJS) Tests**  
```sh
# Run backend unit tests
yarn test:unit

# Run backend E2E tests
yarn test:e2e
```

---

## 🚀 **Production Deployment**  
1. **Build the frontend**  
   ```sh
   yarn build
   ```
2. **Start the application**  
   ```sh
   yarn start
   ```

---
