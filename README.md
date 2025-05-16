# Zyplow Assignment

A GitHub user analytics application with leaderboard functionality and Redis caching.

## How to Run the Project

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/)
- Git

### Setup Instructions

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Zyplow-assignment
   ```

2. **Set up environment variables**

   ```bash
   cp .env-example .env
   ```

   Edit the `.env` file to update the GitHub token and other settings as needed.

3. **Build and start the application**

   ```bash
   make build
   make up
   ```

   Or alternatively:

   ```bash
   docker compose -f docker-compose.yml build
   docker compose -f docker-compose.yml up -d
   ```

4. **Access the application**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Redis Insight (Redis management UI): [http://localhost:8001](http://localhost:8001)

### Available Commands

| Command | Description |
|---------|-------------|
| `make build` | Build all Docker containers |
| `make up` | Start all containers in detached mode |
| `make down` | Stop and remove containers |
| `make stop` | Stop all containers without removing them |
| `make restart` | Restart all containers |
| `make clean` | Remove all containers, volumes, and images |
| `make logs` | View logs from all containers |

### Development Mode

The application can run in development mode with hot-reloading enabled. This is configured via the `.env` file:

```env
FRONTEND_ENV=dev
REDIS_ENV=dev
```

### Project Structure

- `frontend/`: Next.js application with React components
- `redis/`: Redis configuration and setup
- `Doc/`: Project documentation

### Troubleshooting

- If you encounter connection issues with Redis, ensure the Redis password in your `.env` file matches the one in the Docker configuration.
- For frontend issues, check the logs using `make logs`.
- To restart the application after configuration changes, use `make restart`.

### Caching System

The application uses Redis for caching GitHub API responses. The caching strategy includes:

- Leaderboard data: 12-hour TTL
- User profiles: 24-hour TTL

You can disable Redis caching by setting `ENABLE_REDIS=false` in the `.env` file.