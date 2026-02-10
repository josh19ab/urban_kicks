# THEFT Backend

This is the backend CMS for **THEFT**, a premium thrift store e-commerce platform built with Strapi.

## About THEFT

THEFT is a curated thrift store that offers sustainable fashion choices for conscious consumers. Our platform connects fashion enthusiasts with unique, pre-loved pieces that tell stories and reduce environmental impact.

## Features

- **Content Management**: Full-featured CMS for managing products, categories, and content
- **API Management**: RESTful API for frontend integration
- **Media Management**: Upload and manage product images
- **User Management**: Admin user management
- **Database**: PostgreSQL integration
- **File Upload**: Cloudinary integration for media storage

## Tech Stack

- **CMS**: Strapi 5.x
- **Database**: PostgreSQL (or SQLite for local dev)
- **File Storage**: Cloudinary
- **Node.js**: v18+ (v18–20 recommended)
- **Package Manager**: npm/yarn

## Getting Started

1. Install dependencies: `npm install --legacy-peer-deps` (use `--legacy-peer-deps` if you hit peer dependency conflicts)
2. Set up environment variables (see `.env` example)
3. Run development server: `npm run develop`
4. Access admin panel at [http://localhost:1337/admin](http://localhost:1337/admin)

## Reset admin password (forgotten credentials)

If you forgot your Strapi admin login:

1. **If you remember the admin email** – from the project root run:
   ```bash
   npx strapi admin:reset-user-password --email=your@email.com --password=YourNewPassword
   ```
   Or with yarn (recommended for interactive prompts):
   ```bash
   yarn strapi admin:reset-user-password --email=your@email.com --password=YourNewPassword
   ```

2. **If you don’t remember the email** – open Strapi’s console and list admin emails:
   ```bash
   npx strapi console
   ```
   In the REPL, run:
   ```js
   const users = await strapi.db.query('admin::user').findMany({ fields: ['email', 'firstname', 'lastname'] });
   console.log(users);
   ```
   Then exit with `Ctrl+C` twice and use one of the emails in the reset command above.

## Environment Variables

Create a `.env` file with:

```env
# Database
DATABASE_CLIENT=postgres
DATABASE_URL=your_database_url
DATABASE_HOST=your_database_host
DATABASE_PORT=5432
DATABASE_NAME=your_database_name
DATABASE_USERNAME=your_database_username
DATABASE_PASSWORD=your_database_password

# Strapi Admin
ADMIN_JWT_SECRET=your_admin_jwt_secret
API_TOKEN_SALT=your_api_token_salt
TRANSFER_TOKEN_SALT=your_transfer_token_salt
APP_KEYS=key1,key2

# Server
HOST=0.0.0.0
PORT=1337

# Production: comma-separated frontend URLs allowed for CORS (e.g. https://your-app.vercel.app)
# CORS_ORIGIN=https://your-app.vercel.app
```

## Content Types

The CMS includes the following content types:

- **Products**: Thrift store items with images, descriptions, and pricing
- **Categories**: Product categorization
- **Orders**: Customer order management
- **Comments**: Product reviews and feedback
- **Carts**: Shopping cart management

## API Endpoints

- `/api/products` - Product management
- `/api/categories` - Category management
- `/api/orders` - Order management
- `/api/comments` - Comment management
- `/api/carts` - Cart management

## Strapi 5 upgrade notes

- **i18n**: The `@strapi/plugin-i18n` package was removed; i18n is now built into Strapi 5.
- **REST response format**: Strapi 5 uses a new flattened response format. The Next.js frontend sends the `Strapi-Response-Format: v4` header so the API still returns the v4 shape (`data.attributes`). You can remove this header once the frontend is updated to the new format.
- **Install**: If `npm install` fails with peer dependency errors, run `npm install --legacy-peer-deps`.
- **Node**: Strapi 5 supports Node 18+. If you use Node 22, you may see engine warnings; the app should still run.
- **Build**: If `npm run build` fails with "JavaScript heap out of memory", the build script increases Node's memory limit. You can also run `set NODE_OPTIONS=--max-old-space-size=4096` (Windows) or `export NODE_OPTIONS=--max-old-space-size=4096` (Mac/Linux) before building.

## Contributing

We welcome contributions! Please read our contributing guidelines before submitting pull requests.

---

**THEFT** - Sustainable fashion for the conscious consumer.
