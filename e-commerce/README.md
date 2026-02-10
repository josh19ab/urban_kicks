# THEFT Frontend

This is the frontend application for **THEFT**, a premium thrift store e-commerce platform built with Next.js.

## About THEFT

THEFT is a curated thrift store that offers sustainable fashion choices for conscious consumers. Our platform connects fashion enthusiasts with unique, pre-loved pieces that tell stories and reduce environmental impact.

## Features

- **Modern UI/UX**: Built with Next.js 15 and Tailwind CSS
- **Responsive Design**: Optimized for all devices
- **Authentication**: Secure user management with Clerk
- **Shopping Cart**: Seamless cart management
- **Payment Processing**: Stripe integration for secure payments
- **Email Notifications**: Order confirmations via Resend
- **Dark Mode**: Toggle between light and dark themes

## Tech Stack

- **Framework**: Next.js 15
- **Styling**: Tailwind CSS
- **Authentication**: Clerk
- **Payment**: Stripe
- **Email**: Resend + React Email
- **State Management**: React Context
- **Icons**: Lucide React

## Getting Started

1. Install dependencies: `npm install`
2. Set up environment variables (see `.env.local` example)
3. Run development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

Create a `.env.local` file with:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
NEXT_PUBLIC_REST_API_KEY=your_strapi_token
NEXT_PUBLIC_STRIPE_PUBLISHER_KEY=your_stripe_key
STRIPE_SECRET_KEY=your_stripe_secret
RESEND_API_KEY=your_resend_key
```

## Contributing

We welcome contributions! Please read our contributing guidelines before submitting pull requests.

---

**THEFT** - Sustainable fashion for the conscious consumer.
