// src/db.ts
import Dexie, { Table } from "dexie";

interface User {
  user_id: number;
  store_id?: number;
  username: string;
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  roles?: string[];
  created_at: string;
  updated_at: string;
  last_sync_timestamp?: string;
  sync_status: "pending" | "success" | "failed";
}

interface Role {
  role_id: number;
  store_id?: number;
  role_name: string;
  description?: string;
  created_at: string;
  updated_at: string;
  last_sync_timestamp?: string;
  sync_status: "pending" | "success" | "failed";
}

interface Permission {
  permission_id: number;
  permission_name: string;
  description?: string;
  created_at: string;
  updated_at: string;
  last_sync_timestamp?: string;
  sync_status: "pending" | "success" | "failed";
}

interface Order {
  user_id?: number;
  store_id?: number;
  customer_id?: number;
  order_id: number;
  order_date: string;
  total_amount: number;
  status: "pending" | "completed" | "cancelled";
  payment_date?: string;
  created_at: string;
  updated_at: string;
  last_sync_timestamp?: string;
  sync_status: "pending" | "success" | "failed";
}

interface Product {
  product_id: number;
  store_id?: number;
  sku?: string;
  barcode?: string;
  name: string;
  description?: string;
  selling_price: number;
  purchase_price: number;
  promotional_price?: number;
  wholesale_price?: number;
  expiration_date?: string;
  stock_quantity: number;
  reorder_level: number;
  unit?: string;
  colour?: string;
  size?: string;
  note?: string;
  category_id?: number;
  created_at: string;
  updated_at: string;
  last_sync_timestamp?: string;
  sync_status: "pending" | "success" | "failed";
}

interface Service {
  service_id: number;
  store_id?: number;
  name: string;
  description?: string;
  selling_price: number;
  expenses?: number;
  promotional_price?: number;
  expiration_date?: string;
  note?: string;
  category_id?: number;
  created_at: string;
  updated_at: string;
  last_sync_timestamp?: string;
  sync_status: "pending" | "success" | "failed";
}

interface Category {
  category_id: number;
  store_id?: number;
  name: string;
  parent_category_id?: number;
  created_at: string;
  updated_at: string;
  last_sync_timestamp?: string;
  sync_status: "pending" | "success" | "failed";
}

interface Customer {
  customer_id: number;
  store_id?: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_number?: string;
  loyalty_points: number;
  created_at: string;
  updated_at: string;
  last_sync_timestamp?: string;
  sync_status: "pending" | "success" | "failed";
}

interface Supplier {
  supplier_id: number;
  store_id?: number;
  business_name: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_number?: string;
  address?: string;
  account_number?: string;
  bank?: string;
  bank_address?: string;
  swift_code?: string;
  created_at: string;
  updated_at: string;
  last_sync_timestamp?: string;
  sync_status: "pending" | "success" | "failed";
}

interface ReceiptSetting {
  setting_id: number;
  store_id?: number;
  paper_width: number;
  font_size: number;
  header_text?: string;
  footer_text?: string;
  logo_url?: string;
  created_at: string;
  updated_at: string;
  last_sync_timestamp?: string;
  sync_status: "pending" | "success" | "failed";
}

class PosDatabase extends Dexie {
  users!: Table<User>;
  roles!: Table<Role>;
  permissions!: Table<Permission>;
  orders!: Table<Order>;
  products!: Table<Product>;
  services!: Table<Service>;
  categories!: Table<Category>;
  customers!: Table<Customer>;
  suppliers!: Table<Supplier>;
  receipt_settings!: Table<ReceiptSetting>;

  constructor() {
    super("pos_db");
    this.version(1).stores({
      users: "++user_id, username, email, store_id, sync_status",
      roles: "++role_id, role_name, store_id, sync_status",
      permissions: "++permission_id, permission_name, sync_status",
      orders: "++order_id, store_id, customer_id, user_id, order_date, sync_status",
      products: "++product_id, sku, barcode, store_id, sync_status",
      services: "++service_id, store_id, category_id, sync_status",
      categories: "++category_id, store_id, parent_category_id, sync_status",
      customers: "++customer_id, store_id, email, sync_status",
      suppliers: "++supplier_id, store_id, email, sync_status",
      receipt_settings: "++setting_id, store_id, sync_status"
    });
  }
}

export const db = new PosDatabase();