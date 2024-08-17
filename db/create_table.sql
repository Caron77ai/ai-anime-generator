-- 创建 User 表
CREATE TABLE IF NOT EXISTS "User" (
  id SERIAL PRIMARY KEY,                          -- 自增的主键
  userId VARCHAR(255) UNIQUE,                     -- 唯一的用户 ID (sub)
  username VARCHAR(255),                          -- 用户名
  avatar TEXT,                                    -- 用户头像
  role INTEGER,                                   -- 角色
  platform VARCHAR(255),                          -- 平台 (例如 GitHub, Google)
  email VARCHAR(255),                             -- 电子邮件
  subscriptionId VARCHAR(255),                    -- LemonSqueezy 订阅 ID
  customerId VARCHAR(255),                        -- LemonSqueezy 客户 ID
  variantId INTEGER,                              -- LemonSqueezy 变体 ID
  currentPeriodEnd INTEGER,                       -- 订阅周期结束时间

  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- 创建时间
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- 更新时间
);

-- 创建 Dialog 表
CREATE TABLE IF NOT EXISTS "Dialog" (
  id SERIAL PRIMARY KEY,                          -- 自增的主键
  dialogId VARCHAR(255) UNIQUE,                   -- 唯一的对话 ID
  prompt TEXT,                                    -- 提示文本
  reply TEXT,                                     -- 回复文本
  userId VARCHAR(255),                            -- 关联的用户 ID
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- 创建时间
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- 更新时间

  -- 建立外键关联到 User 表
  CONSTRAINT fk_user
    FOREIGN KEY (userId) 
    REFERENCES "User"(userId)
    ON DELETE CASCADE
);
