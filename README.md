# THEFT

**THEFT** is a premium thrift store e-commerce platform designed for fashion enthusiasts who appreciate sustainable and unique fashion finds. With a focus on curated second-hand clothing and accessories, THEFT provides a seamless shopping experience with various features to enhance user engagement and satisfaction.

## Features:

- **Curated Product Listings**: Browse through a carefully selected range of thrifted products with detailed listings that include images, descriptions, and prices
- **Shopping Cart Functionality**: Add items to your cart and manage your selections before checkout
- **Order Tracking**: Stay updated on your order status with real-time tracking
- **User Reviews**: Read and leave reviews on products to help others make informed decisions
- **Sort & Filter Options**: Easily find products by sorting and filtering based on various criteria
- **Sustainable Fashion**: Promoting eco-friendly shopping through second-hand fashion

## Technology Stack:

- **Frontend**: Built with Next.js and styled using Tailwind CSS for a responsive and modern user interface
- **Backend**: Utilizes Strapi CMS for managing product data and content
- **Components**: Integrated HyperUI components for a polished look and feel
- **Authentication**: Implemented Clerk for secure user authentication
- **Payment Processing**: Integrated Stripe as the payment gateway for a smooth checkout experience
- **Email Notifications**: Used Resend for sending emails and React Email with custom templates for order confirmations and updates

## Getting Started

To get a local development environment up and running, follow these steps:

### Clone the Repository:

```bash
git clone https://github.com/yourusername/theft.git
cd theft
```

### Install Dependencies:

```bash
# Frontend
cd e-commerce
npm install

# Backend
cd ../backend
npm install
```

### Set Up Environment Variables:

Create a `.env.local` file in the `e-commerce` directory and add your environment variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Strapi API
NEXT_PUBLIC_REST_API_KEY=your_strapi_api_token

# Stripe Payment
NEXT_PUBLIC_STRIPE_PUBLISHER_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key

# Resend Email
RESEND_API_KEY=your_resend_api_key
```

Create a `.env` file in the `backend` directory:

```env
# Database Configuration
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

# Host & Port
HOST=0.0.0.0
PORT=1337
```

### Run the Development Servers:

```bash
# Backend (Strapi)
cd backend
npm run develop

# Frontend (Next.js)
cd ../e-commerce
npm run dev
```

### Access the Application:

- **Frontend**: Open your browser and navigate to http://localhost:3000
- **Backend Admin**: Access the Strapi admin panel at http://localhost:1337/admin

## Deploy on Vercel

The **Next.js frontend** (e-commerce) is ready to deploy on Vercel. The **Strapi backend** must be deployed on a separate host (e.g. Railway, Render, or a VPS) because it runs as a long-lived Node server.

### 1. Deploy Strapi (backend) first

Deploy the `backend` folder to a platform that supports Node.js and PostgreSQL:

- **Railway**: Connect your repo, set **Root Directory** to `backend`, add a PostgreSQL database, and set all `DATABASE_*` and Strapi env vars from `backend/.env`. Use `npm run build` then `npm run start` (or the platform’s default).
- **Render**: New → Web Service, connect repo, set root to `backend`, add PostgreSQL and env vars, build command `npm install --legacy-peer-deps && npm run build`, start command `npm run start`.

After deploy, note your Strapi URL (e.g. `https://your-strapi.up.railway.app`). Set **CORS_ORIGIN** in the backend env to your Vercel URL (e.g. `https://your-app.vercel.app`) so the frontend can call the API. In Strapi Admin → **Settings → API Tokens**, ensure the token used by the frontend has access to the content types you need.

### 2. Deploy Next.js (frontend) on Vercel

1. Push your code to GitHub (or connect another Git provider to Vercel).
2. In [Vercel](https://vercel.com), click **Add New → Project** and import this repository.
3. Set **Root Directory** to **`e-commerce`** (the Next.js app lives there).
4. **Framework Preset**: Vercel should detect Next.js automatically.
5. **Environment variables**: Add the same variables you use locally. Required for production:
   - `NEXT_PUBLIC_APP_URL` = your Vercel app URL (e.g. `https://your-app.vercel.app`)
   - `NEXT_PUBLIC_STRAPI_URL` = your deployed Strapi URL (e.g. `https://your-strapi.up.railway.app`) — no trailing slash
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`
   - `NEXT_PUBLIC_REST_API_KEY` = Strapi API token
   - `NEXT_PUBLIC_STRIPE_PUBLISHER_KEY`, `STRIPE_SECRET_KEY`
   - `RESEND_API_KEY`
6. Deploy. After the first deploy, in the **Clerk Dashboard** add your Vercel domain to **Allowed redirect URLs** and **Allowed origins**.

Use `e-commerce/.env.example` as a checklist for required env vars.

## Payment gateway (UPI-friendly)

If you want **UPI-first** payments that are **easy to set up** and **free to start**:

- **Razorpay** (recommended): Supports UPI, cards, wallets, netbanking. No setup fee; you pay only a small percentage per transaction. Works well with Next.js (Razorpay Checkout or custom integration). [Docs](https://razorpay.com/docs/)
- **PhonePe Payment Gateway**: UPI and cards, popular in India.
- **Paytm**: UPI and wallet.

To integrate Razorpay in this project, add a route (e.g. `/api/create-order` or `/api/razorpay`) that uses your `RAZORPAY_KEY_SECRET` to create an order, and on the frontend use the [Razorpay Checkout script](https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/) or the `react-razorpay` package. Replace or complement the existing Stripe flow in `e-commerce/app/checkout` and `e-commerce/app/api/create-intent` with Razorpay order creation and verification.

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**THEFT** - Where sustainable fashion meets style. Find your unique pieces and contribute to a more eco-friendly fashion industry.
