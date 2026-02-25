-- Supabase SQL Schema for BuyItems.lk

-- 1. PRODUCTS TABLE
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category TEXT,
    image_url TEXT,
    stock_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. LICENSES/KEYS TABLE
CREATE TABLE license_keys (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES products(id),
    license_key TEXT NOT NULL,
    is_sold BOOLEAN DEFAULT FALSE,
    sold_to_user_id UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. ORDERS TABLE
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id),
    product_id UUID REFERENCES products(id),
    price_paid DECIMAL(10, 2),
    payment_status TEXT DEFAULT 'pending', -- 'pending', 'completed', 'failed'
    assigned_key_id UUID REFERENCES license_keys(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE license_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- 5. Public Policies (Everyone can see products)
CREATE POLICY "Public Products Access" ON products FOR SELECT USING (true);

-- 6. User Policies (Users can see their own orders/keys)
CREATE POLICY "User Own Orders" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "User Own Keys" ON license_keys FOR SELECT USING (auth.uid() = sold_to_user_id);
