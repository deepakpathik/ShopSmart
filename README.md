# ShopSmart 🛒

Welcome to ShopSmart. This is a full-stack, architecturally decoupled e-commerce application serving a beautiful "Electric Fizz" design interface, backed by a robust and entirely isolated backend REST service. 

Below is a quick overview of how we've modeled the system's infrastructure and core components.

## System Overview

ShopSmart uses a classic decoupled stack to ensure maximum scalability and ease of deployment. The frontend is powered by Vite and React for high-performance rendering. The backend is a Node.js and Express monolith utilizing Prisma ORM to communicate cleanly with our PostgreSQL cloud instances. 

We maintain strict versioning and rapid testing feedback via GitHub Actions before letting our code hit any production deployments.

---

## Architecture Diagram

Our physical structure operates on independent clusters. The client loads natively in the browser, issuing HTTP requests seamlessly to the backend API via standard REST architecture.

```mermaid
graph TD
    Client[React + Vite Client]
    DNS[API Gateway / Ingress]
    API[Node.js + Express Server]
    ORM[Prisma Client]
    DB[(PostgreSQL Database)]

    Client -->|HTTP/REST| DNS
    DNS --> API
    API -->|Schema Queries| ORM
    ORM -->|TCP/IP| DB
```

---

## CI/CD Workflow

On every PR or commit to `main`, our GitHub Actions pipeline establishes a containerized runner. It concurrently spins up multiple Node environments, builds the frontend chunk outputs, regenerates the Prisma schemas, and successfully runs the root unit and integration test assertions using Jest.

```mermaid
graph LR
    Push((Developer Push))
    trigger[GitHub Actions Trigger]
    subgraph Env [Ubuntu Latest Runner]
        checkout[Checkout Code]
        node[Setup Node 18.x / 20.x]
        install[Install Dependencies]
        build[Vite Build App]
        test[Jest Integration & Unit Tests]
    end
    
    Push --> trigger
    trigger --> checkout
    checkout --> node
    node --> install
    install --> build
    install --> test
```

---

## Request Flow

When an interaction happens on the browser (e.g., authenticating or retrieving item features), the request trickles through the middleware layers before finally resting in PostgreSQL. Responses reverse the chain carrying JWT tokens or JSON schemas.

```mermaid
sequenceDiagram
    participant User as React Frontend
    participant Route as Express Router
    participant Auth as Auth Controller
    participant DB as Prisma PostgreSQL
    
    User->>Route: POST /api/auth/login
    Route->>Auth: Validate Credentials
    Auth->>DB: findUnique(email)
    DB-->>Auth: return User Hash
    Auth-->>Route: Sign JWT & Gen 200 OK
    Route-->>User: JSON Response payload
```

---

## Deployment Flow

To deploy, code pushes trigger external remote environments (Render or AWS EC2). The server spins up listening on port `5005`, resolving environment variable injectors locally while the static `dist/` directory serves the web artifacts rapidly.

```mermaid
graph TD
    repo[GitHub Repository]
    subgraph Hosting [Render / EC2 Machine]
        pull[Pull Latest Build]
        install[NPM Install & Prisma Gen]
        serve_fe[Serve Static Vite /dist]
        run_be[Node.js Express App Port 5005]
    end
    
    repo -->|Webhook Notify| pull
    pull --> install
    install --> serve_fe
    install --> run_be
```

---

## System Layers

In the backend ecosystem specifically, we embrace a distinct layered approach. This isolates our route configuration (the entry points) from our business logic (the controllers), which stays strictly isolated from the data layer logic (Prisma).

```mermaid
graph TD
    subgraph Client Layer
        UI[React JSX Views]
        State[React State / Hooks]
    end
    
    subgraph API Entry
        Routes[Express Routes: /api/*]
        Middleware[CORS & Error Handlers]
    end
    
    subgraph Business Logic Layer
        Controllers[Auth & User Controllers]
        Validation[Bcrypt & JWT Utilities]
    end
    
    subgraph Data Layer
        Prisma[Prisma Scheme Config]
        Neon[(Neon PostgreSQL)]
    end
    
    UI --> State
    State --> Routes
    Routes --> Middleware
    Middleware --> Controllers
    Controllers --> Validation
    Validation --> Prisma
    Prisma --> Neon
```
