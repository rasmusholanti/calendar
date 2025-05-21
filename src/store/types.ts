export interface Order {
  id: string;
  buyerId: string;
  sellerId: string;
  productId: string;
  status: 'pending' | 'confirmed' | 'scheduled' | 'delivered';
  pickupDate?: string;
  deliveryDate?: string;
  address: string;
}

export interface CalendarState {
  orders: Order[];
  selectedDate: string | null;
  viewType: 'all' | 'pickups' | 'deliveries';
  isModalOpen: boolean;
  editingOrder: {
    id?: string;
    buyerId: string;
    sellerId: string;
    productId: string;
    status: Order['status'];
    pickupDate?: string;
    deliveryDate?: string;
    address: string;
  };
} 