import { Kafka } from 'kafkajs'
import { OrderEvent, Topics } from './types'

const kafka = new Kafka({ brokers: ['localhost:9092'] })
const producer = kafka.producer()

async function run() {
  await producer.connect()

  const events: OrderEvent[] = [
    { type: 'OrderCreated', id: 'A1', status: 'open', timestamp: new Date().toISOString() },
    { type: 'OrderFilled', id: 'A1', status: 'filled', timestamp: new Date().toISOString() },
    { type: 'OrderCreated', id: 'A2', status: 'open', timestamp: new Date().toISOString() },
    { type: 'OrderCancelled', id: 'A2', status: 'cancelled', timestamp: new Date().toISOString() },
  ]

  for (const event of events) {
    await producer.send({
      topic: Topics.ORDERS,
      messages: [{ value: JSON.stringify(event) }],
    })
    console.log(`[Sent]`, event)
  }

  await producer.disconnect()
}

run()
