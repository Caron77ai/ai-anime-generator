-- 用户表
CREATE TABLE IF NOT EXISTS public.users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  firstName TEXT,
  lastName TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 用户图片计数表
CREATE TABLE IF NOT EXISTS public.user_image_counts (
  user_id TEXT PRIMARY KEY,
  free_images_used INTEGER DEFAULT 0,
  paid_images_used INTEGER DEFAULT 0,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES public.users(id)
);

-- 用户订阅表
CREATE TABLE IF NOT EXISTS public.user_subscriptions (
  user_id TEXT PRIMARY KEY,
  plan_id TEXT NOT NULL,
  images_limit INTEGER NOT NULL,
  start_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (user_id) REFERENCES public.users(id)
);

-- 订阅计划表
CREATE TABLE IF NOT EXISTS public.subscription_plans (
  plan_id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  duration_days INTEGER NOT NULL,
  images_limit INTEGER NOT NULL
);

INSERT INTO subscription_plans (plan_id, name, images_limit, duration_days, price)
VALUES 
('price_1Q7UA1P1MdvuF76FEZgqSllT', 'Basic Plan', 1000, 30, 9.9),
('price_1QD3r1P1MdvuF76FKlshOgeO', 'Pro Plan', 12000, 365, 99);



CREATE TABLE IF NOT EXISTS public.generations (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  prompt TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES public.users(id)
);
