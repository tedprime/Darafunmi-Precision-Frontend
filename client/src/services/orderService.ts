import { api } from "@/lib/api";

// ─── Types ────────────────────────────────────────────────────────
export interface OrderItem {
  productId: number;
  quantity: number;
  unitPrice?: string;
  productName?: string;
  productSku?: string;
}

export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode?: string;
}

export interface CreateOrderPayload {
  // User identity — sent under every field name the backend might check
  siteUserId?: number;
  userId?: number;
  user_id?: number;
  site_user_id?: number;

  // Order details
  items: OrderItem[];
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  shippingAddress: ShippingAddress;
  billingAddress?: ShippingAddress;
  paymentMethod?: string;
  notes?: string;
}

export interface Order {
  id: number;
  orderNumber: string;
  siteUserId: number | null;
  status: string;
  subtotal: string;
  tax: string;
  shipping: string;
  total: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: ShippingAddress;
  items?: OrderItem[];
  createdAt: string;
}

// ─── Create Order ─────────────────────────────────────────────────
export async function createOrder(
  payload: CreateOrderPayload
): Promise<Order> {
  const { data } = await api.post<{ success: boolean; data: Order }>(
    "/orders",
    payload
  );
  return data.data ?? (data as any);
}

// ─── Get My Orders ────────────────────────────────────────────────
export async function getMyOrders(): Promise<Order[]> {
  const { data } = await api.get<{
    success: boolean;
    count: number;
    data: Order[];
  }>("/orders/my");
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.data)) return data.data;
  return [];
}

// ─── Get Order by Number ──────────────────────────────────────────
export async function getOrderByNumber(orderNumber: string): Promise<Order> {
  const { data } = await api.get<{ success: boolean; data: Order }>(
    `/orders/${orderNumber}`
  );
  return data.data ?? (data as any);
}