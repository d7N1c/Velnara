# VELNARA v1 — Berlin Mobile Detailing

Production-ready front-end foundation for VELNARA. Built with React + Vite.

## Current features
- Responsive black/gold VELNARA design
- German / English / Russian language switch
- 4 vehicle classes
- 4 detailing packages
- Extras and live price calculation
- 4-step booking flow
- Booking ID generation
- Demo admin dashboard and status workflow
- PWA manifest (installable shell when hosted over HTTPS)
- Local browser persistence for prototype orders

## Run locally
1. Install Node.js 20+
2. `npm install`
3. `npm run dev`

## Build
`npm run build`

## Publish
Import this repository into Vercel and deploy. Vite is detected automatically.

## IMPORTANT before accepting real customer bookings
The current booking storage uses browser `localStorage`. That is intentionally safe for a prototype but NOT a shared production database. Before public launch, connect a backend such as Supabase/Postgres and add:
- `bookings` database table
- secure admin authentication
- server-side validation / rate limiting
- booking availability / collision prevention
- email notification / confirmation
- privacy policy + legal business details / Impressum as applicable

Do not collect real customer data with the localStorage prototype as the operational booking system.

## Suggested v1.1 database fields
`id, created_at, status, language, customer_name, phone, email, address, vehicle_class, package, extras, quoted_price, appointment_date, appointment_time, notes`
