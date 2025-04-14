import { Kafka } from 'kafkajs'
import { OrderEvent, Topics } from './types'

const kafka = new Kafka({ brokers: ['localhost:9092'] })
const consumer = kafka.consumer({ groupId: 'order-processor' })

async function run() {
  await consumer.connect()
  await consumer.subscribe({ topic: Topics.ORDERS, fromBeginning: true })

  await consumer.run({
    eachMessage: async ({ message }) => {
      const event: OrderEvent = JSON.parse(message.value!.toString())
      console.log(`[Consumed]`, event)
    },
  })
}

run()
