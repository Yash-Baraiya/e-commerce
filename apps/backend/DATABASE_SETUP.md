# PostgreSQL Database Setup Guide

## Prerequisites

You need PostgreSQL installed on your system. If not installed:

### Windows

1. Download from: https://www.postgresql.org/download/windows/
2. Run installer and follow the wizard
3. Remember the password you set for the `postgres` user
4. Default port is `5432`

---

## Database Setup

### Step 1: Create Database

Open **pgAdmin** or use **psql** command line:

```sql
CREATE DATABASE ecommerce_db;
```

Or using psql:

```bash
psql -U postgres
CREATE DATABASE ecommerce_db;
\q
```

### Step 2: Configure Environment Variables

Create a `.env` file in `apps/backend/` directory:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=YOUR_PASSWORD_HERE
DB_DATABASE=ecommerce_db
```

**Replace `YOUR_PASSWORD_HERE` with your actual PostgreSQL password.**

---

## Running the Application

### Step 1: Restart Backend Server

The backend server needs to be restarted to pick up the new database configuration:

```bash
# Stop the current backend (Ctrl+C in the terminal)
# Then restart:
npm run dev:backend
```

### Step 2: Verify Database Connection

Check the terminal output. You should see:

- No database connection errors
- TypeORM will automatically create the `products` table

### Step 3: Seed Sample Data

Make a POST request to seed the database with sample products:

```bash
# Using PowerShell
Invoke-WebRequest -Uri http://localhost:3000/api/products/seed -Method POST

# Or using curl
curl -X POST http://localhost:3000/api/products/seed
```

### Step 4: Test the APIs

```bash
# Get all products
Invoke-WebRequest http://localhost:3000/api/products

# Get statistics
Invoke-WebRequest http://localhost:3000/api/products/stats
```

### Step 5: View in Frontend

Open http://localhost:4200 in your browser to see the dashboard with data from the database!

---

## Verify in pgAdmin

1. Open pgAdmin
2. Connect to your PostgreSQL server
3. Navigate to: Databases → ecommerce_db → Schemas → public → Tables
4. Right-click on `products` table → View/Edit Data → All Rows
5. You should see 8 sample products

---

## Troubleshooting

### Error: "password authentication failed"

- Check your password in the `.env` file
- Make sure it matches your PostgreSQL password

### Error: "database does not exist"

- Create the database using pgAdmin or psql
- Run: `CREATE DATABASE ecommerce_db;`

### Error: "connect ECONNREFUSED"

- Make sure PostgreSQL service is running
- Check if it's running on port 5432
- Verify host is `localhost`

### No data showing

- Run the seed endpoint: `POST /api/products/seed`
- Check backend logs for errors

---

## What Changed

✅ **Installed Packages:**

- `@nestjs/typeorm` - NestJS TypeORM integration
- `typeorm` - ORM library
- `pg` - PostgreSQL driver
- `@nestjs/config` - Environment configuration

✅ **New Files:**

- `apps/backend/.env.example` - Environment template
- `apps/backend/src/loans/entities/product.entity.ts` - Database entity

✅ **Updated Files:**

- `apps/backend/src/app.module.ts` - Added TypeORM configuration
- `apps/backend/src/loans/loans.module.ts` - Registered Product repository
- `apps/backend/src/loans/loans.service.ts` - Using database instead of in-memory array
- `apps/backend/src/loans/loans.controller.ts` - Added async/await and seed endpoint

---

## Next Steps

1. **Create `.env` file** with your database credentials
2. **Create database** in PostgreSQL
3. **Restart backend** server
4. **Seed data** using the POST endpoint
5. **Test** the application!

Your e-commerce dashboard is now connected to a real PostgreSQL database! 🎉
