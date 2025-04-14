import { Kafka } from 'kafkajs'
import { GroupId, OrderEvent, Topics } from './types'

const kafka = new Kafka({ brokers: ['localhost:9092'] })
const topic = Topics.ORDERS;
const partition = 0
const startOffset = '1' // manually pick the offset to start from

async function run() {
  const consumer = kafka.consumer({ groupId: GroupId.ORDER_REPLAY_DEMO })
  await consumer.connect()
  await consumer.subscribe({ topic, fromBeginning: false })

  // Wait until the subscription is ready
  await consumer.run({
    eachBatchAutoResolve: false,
    eachBatch: async ({ batch, resolveOffset, heartbeat }) => {
      console.log(`→ Partition: ${batch.partition}, starting at offset: ${startOffset}`)

      for (const message of batch.messages) {
        // Skip messages below our desired offset
        if (message.offset < startOffset) {
          continue
        }

        const event: OrderEvent = JSON.parse(message.value!.toString())
        console.log(`[Offset ${message.offset}]`, event)

        resolveOffset(message.offset)
        await heartbeat()
      }
    }
  })

  // Manually seek to offset after subscribing
  consumer.seek({ topic, partition, offset: startOffset })
}

run()
