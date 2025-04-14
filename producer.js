const { Kafka } = require('kafkajs')

const kafka = new Kafka({ brokers: ['localhost:9092'] })
const producer = kafka.producer()

async function run() {
  await producer.connect()

  const events = [
    { type: 'OrderCreated', id: 'A1', status: 'open' },
    { type: 'OrderFilled', id: 'A1', status: 'filled' },
    { type: 'OrderCreated', id: 'A2', status: 'open' },
    { type: 'OrderCancelled', id: 'A2', status: 'cancelled' },
    { type: 'OrderCreated', id: 'A3', status: 'open' },

  ]

  for (const event of events) {
    await producer.send({
      topic: 'orders',
      messages: [{ value: JSON.stringify(event) }]
    })
    console.log(`[Sent]`, event)
  }

  await producer.disconnect()
}

run()
