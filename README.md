# Event Logs with TypeScript

This project demonstrates core **event log** principles using TypeScript, including:

- Log-based event publishing and consumption  
- Multiple independent consumers reading from the same log  
- Replayable message streams  
- Manual offset and partition-based control  
- Decoupled consumer behaviour with tracked offsets

Kafka is used as the underlying event log system to support durable, ordered, and replayable message flows.

## Features

- `producer.ts`: Sends structured order events into the Kafka topic.  
- `consumer-analytics.ts`: Simulates a late-joining analytics consumer that can replay historical events.  
- `consumer-processor.ts`: Stateful processor representing a real-time order-processing system.  
- `replay-consumer.ts`: Demonstrates manual offset control and replaying from any point in the event log.

## Getting Started

**1. Run Kafka using Docker Compose:**

```bash
docker-compose up -d
# Event Logs with TypeScript

This project demonstrates core **event log** principles using TypeScript, including:

- Log-based event publishing and consumption  
- Multiple independent consumers reading from the same log  
- Replayable message streams  
- Manual offset and partition-based control  
- Decoupled consumer behaviour with tracked offsets

Kafka is used as the underlying event log system to support durable, ordered, and replayable message flows.

## Features

- `producer.ts`: Sends structured order events into the Kafka topic.  
- `consumer-analytics.ts`: Simulates a late-joining analytics consumer that can replay historical events.  
- `consumer-processor.ts`: Stateful processor representing a real-time order-processing system.  
- `replay-consumer.ts`: Demonstrates manual offset control and replaying from any point in the event log.

## Getting Started

**1. Run Kafka using Docker Compose:**

```bash
docker-compose up -d
```

**2. Install dependencies:**

```bash
npm install
```

**3. Start producing and consuming events:**

```bash
npm run start:producer
npm run start:consumer:processor
npm run start:consumer:analytics
npm run start:consumer:replay:demo
```

Each consumer uses its own `groupId`, which enables independent offset tracking and consumption.

## Project Structure

```
src/
├── producer.ts
├── consumer-processor.ts
├── consumer-analytics.ts
├── replay-consumer.ts
├── types.ts
```

## Key Concepts

- Events are durable and not removed after consumption.
- Consumers can join at any time and replay the full log, from the beginning or a specific offset.
- Replay control supports partial backfills, historical audits, or offset-based recovery.

## License

MIT