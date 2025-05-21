export interface Order {
  id: string;
  buyerId: string;
  sellerId: string;
  productId: string;
  status: "pending" | "confirmed" | "scheduled" | "delivered";
  pickupDate?: string;
  deliveryDate?: string;
  address: string;
}

const currentYear = new Date().getFullYear();

export const mockOrders: Order[] = [
  {
    id: "1",
    buyerId: "buyer1",
    sellerId: "seller1",
    productId: "product1",
    status: "scheduled",
    pickupDate: `${currentYear}-05-15`,
    deliveryDate: `${currentYear}-05-20`,
    address: "123 Main St"
  },
  {
    id: "2",
    buyerId: "buyer2",
    sellerId: "seller2",
    productId: "product2",
    status: "confirmed",
    pickupDate: `${currentYear}-05-20`,
    deliveryDate: `${currentYear}-05-25`,
    address: "456 Oak Ave"
  },
  {
    id: "3",
    buyerId: "buyer3",
    sellerId: "seller3",
    productId: "product3",
    status: "scheduled",
    pickupDate: `${currentYear}-05-20`,
    address: "789 Pine Rd"
  },
  {
    id: "4",
    buyerId: "buyer4",
    sellerId: "seller4",
    productId: "product4",
    status: "pending",
    pickupDate: `${currentYear}-05-25`,
    deliveryDate: `${currentYear}-05-30`,
    address: "321 Elm St"
  },
  {
    id: "5",
    buyerId: "buyer5",
    sellerId: "seller5",
    productId: "product5",
    status: "delivered",
    pickupDate: `${currentYear}-05-10`,
    deliveryDate: `${currentYear}-05-15`,
    address: "654 Maple Dr"
  },
  {
    id: "6",
    buyerId: "buyer6",
    sellerId: "seller6",
    productId: "product6",
    status: "scheduled",
    pickupDate: `${currentYear}-05-05`,
    deliveryDate: `${currentYear}-05-12`,
    address: "987 Cedar Ln"
  },
  {
    id: "7",
    buyerId: "buyer7",
    sellerId: "seller7",
    productId: "product7",
    status: "confirmed",
    pickupDate: `${currentYear}-05-08`,
    deliveryDate: `${currentYear}-05-15`,
    address: "741 Birch St"
  },
  {
    id: "8",
    buyerId: "buyer8",
    sellerId: "seller8",
    productId: "product8",
    status: "pending",
    pickupDate: `${currentYear}-05-12`,
    deliveryDate: `${currentYear}-05-18`,
    address: "852 Spruce Ave"
  },
  {
    id: "9",
    buyerId: "buyer9",
    sellerId: "seller9",
    productId: "product9",
    status: "scheduled",
    pickupDate: `${currentYear}-05-18`,
    deliveryDate: `${currentYear}-05-25`,
    address: "963 Willow Rd"
  },
  {
    id: "10",
    buyerId: "buyer10",
    sellerId: "seller10",
    productId: "product10",
    status: "delivered",
    pickupDate: `${currentYear}-05-03`,
    deliveryDate: `${currentYear}-05-10`,
    address: "159 Aspen Ct"
  },
  {
    id: "11",
    buyerId: "buyer11",
    sellerId: "seller11",
    productId: "product11",
    status: "confirmed",
    pickupDate: `${currentYear}-05-22`,
    deliveryDate: `${currentYear}-05-28`,
    address: "357 Oakwood Dr"
  },
  {
    id: "12",
    buyerId: "buyer12",
    sellerId: "seller12",
    productId: "product12",
    status: "scheduled",
    pickupDate: `${currentYear}-05-28`,
    address: "486 Pinecrest Ln"
  },
  {
    id: "13",
    buyerId: "buyer13",
    sellerId: "seller13",
    productId: "product13",
    status: "pending",
    pickupDate: `${currentYear}-05-07`,
    deliveryDate: `${currentYear}-05-14`,
    address: "753 Maplewood Ave"
  },
  {
    id: "14",
    buyerId: "buyer14",
    sellerId: "seller14",
    productId: "product14",
    status: "scheduled",
    pickupDate: `${currentYear}-05-14`,
    deliveryDate: `${currentYear}-05-21`,
    address: "951 Cedarwood Rd"
  },
  {
    id: "15",
    buyerId: "buyer15",
    sellerId: "seller15",
    productId: "product15",
    status: "confirmed",
    pickupDate: `${currentYear}-05-21`,
    deliveryDate: `${currentYear}-05-27`,
    address: "264 Birchwood Ct"
  }
]; 