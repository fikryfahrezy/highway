# Highway Front End

- https://highway.fahrezy.work

### Prerequisites

- Node.js 24 or higher
- npm 11 or higher
- pnpm 10 or higher

### Quick Start

#### Local Development

1. **Clone the repository**:

```bash
git clone <repository-url>
cd <clone directory>
```

2. **Install dependencies**:

```bash
pnpm install
```

3. **Setup environment**:

```bash
cp .env.example .env
# Edit values on the .env with the real value if needed
```

5. **Start the development**:

```bash
pnpm run dev
```

### Build the Application

#### Without Docker

```bash
pnpm build
```

#### With Docker

```bash
docker -t <container name:tag> build .
```

#### Run with Docker Compose

```bash
docker compose up --build
```
