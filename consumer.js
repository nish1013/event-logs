const { Kafka } = require('kafkajs')

const kafka = new Kafka({ brokers: ['localhost:9092'] })
const consumer = kafka.consumer({ groupId: 'order-processor' })

async function run() {
  await consumer.connect()
  await consumer.subscribe({ topic: 'orders', fromBeginning: true })

  await consumer.run({
    eachMessage: async ({ message }) => {
      const event = JSON.parse(message.value.toString())
      console.log(`[Consumed]`, event)
    }
  })
}

run()
