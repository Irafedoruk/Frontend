export interface IOrderItem {
    productId: string;
    productName: string;
    price: number;
    quantity: number;
  }
  
  export interface ICreateOrder {
    userId: string;
    items: IOrderItem[];
    totalAmount: number;
    address: string;
    discountId?: number | null;
  }