export const agentServices = [
  {
    name: "Gateway Service",
    role: "API Router",
    status: "Healthy",
    description: "Routes user requests to the right microservice and protects the backend edge.",
    uptime: "99.99%"
  },
  {
    name: "Auth Engine",
    role: "Authentication Service",
    status: "Healthy",
    description: "Validates sessions, JWT cookies, and secure user login flows.",
    uptime: "99.98%"
  },
  {
    name: "AI Orchestrator",
    role: "Agent Coordinator",
    status: "Healthy",
    description: "Dispatches user queries to the AI model, memory layer, and internet fetch agents.",
    uptime: "99.92%"
  },
  {
    name: "Data Storage Agent",
    role: "Persistence Service",
    status: "Healthy",
    description: "Stores message history, chat sessions, and user metadata safely.",
    uptime: "99.97%"
  }
]

export const agentPipeline = [
  {
    title: "User request intake",
    detail: "Receives and validates user inputs from the client dashboard.",
    status: "Healthy"
  },
  {
    title: "Authentication check",
    detail: "Ensures the current session is valid before message processing.",
    status: "Healthy"
  },
  {
    title: "AI orchestration",
    detail: "Routes flagged requests to the language model and retrieval agents.",
    status: "Healthy"
  },
  {
    title: "Chat history storage",
    detail: "Persists chat history to the database after each conversation.",
    status: "Healthy"
  }
]
