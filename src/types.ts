export type OrderEventType = 'OrderCreated' | 'OrderFilled' | 'OrderCancelled'

export interface OrderEvent {
  type: OrderEventType
  id: string
  status: string
  timestamp: string
}

export enum Topics {
  ORDERS = 'orders',
}

export enum GroupId {
  ORDER_PROCESSOR = 'order-processor',
  ORDER_ANALYTICS = 'order-analytics',
}
