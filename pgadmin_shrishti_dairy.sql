-- pgAdmin / PostgreSQL bootstrap for shrishti_dairy
-- Run this in pgAdmin Query Tool (adjust user/password as needed).

-- 1) Create DB (skip if it already exists)
-- CREATE DATABASE shrishti_dairy;

-- 2) Connect to shrishti_dairy, then create table used by the QR page
CREATE TABLE IF NOT EXISTS public.manufacturing_units (
  id BIGSERIAL PRIMARY KEY,
  batch_code VARCHAR(10) UNIQUE NOT NULL,
  company_name VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  fssai_licence_number VARCHAR(255) NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL
);

-- Optional sample rows (edit as needed)
-- INSERT INTO public.manufacturing_units (batch_code, company_name, address, fssai_licence_number, sort_order, created_at, updated_at)
-- VALUES
-- ('RU', 'Rajendra And Ursula Joshi Food Industries Pvt. Ltd.', 'DTA-005-008 & 009, Domestic Tariff Area, Mahindra World City, Jaipur - 302037, Rajasthan, India.', '12216027000292', 1, NOW(), NOW()),
-- ('PI', 'Provilac Dairy & Foods Pvt. Ltd.', 'Plot No. 45, Industrial Estate, Pune - 411001, Maharashtra, India.', '11520024000001', 2, NOW(), NOW()),
-- ('SD', 'Shrishti Dairy Pvt. Ltd.', 'Unit #12, Industrial Area, Sector 5, Gurgaon - 122001, Haryana, India.', '10820025000123', 3, NOW(), NOW());
