import React from "react"
import { Link } from "react-router"
import { agentServices, agentPipeline } from "./agents.data"

const statusStyles = {
  Healthy: "bg-emerald-500/15 text-emerald-300",
  Warning: "bg-amber-500/15 text-amber-300",
  Offline: "bg-rose-500/15 text-rose-300",
}

const AgentPanel = ({ compact = false }) => {
  return (
    <div className="rounded-lg border border-yellow-600/20 bg-slate-950/80 p-3 shadow-lg backdrop-blur-xl">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-yellow-400">
            Agent Network
          </p>
          <h2 className="mt-1 text-lg font-semibold text-white">
            Multi-Agent Control Center
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            Service orchestration overview.
          </p>
        </div>

        <div className="rounded-full border border-yellow-500/30 bg-black/50 px-3 py-1 text-xs text-yellow-200">
          AWS Simulation
        </div>
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {agentServices.slice(0, compact ? 4 : agentServices.length).map((agent) => (
          <div
            key={agent.name}
            className="rounded-lg border border-slate-700/80 bg-slate-900/80 p-2"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-medium text-white">
                  {agent.name}
                </p>
                <p className="text-xs text-slate-400">
                  {agent.role}
                </p>
              </div>

              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                  statusStyles[agent.status] ??
                  "bg-slate-700 text-slate-200"
                }`}
              >
                {agent.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {!compact && (
        <div className="mt-3 rounded-lg border border-yellow-600/20 bg-black/30 p-3">
          <h3 className="text-sm font-semibold text-white">
            Pipeline
          </h3>

          <div className="mt-2 space-y-2">
            {agentPipeline.slice(0, 3).map((step) => (
              <div
                key={step.title}
                className="flex items-center gap-3 rounded-lg border border-slate-700/80 bg-slate-950/60 p-2"
              >
                <div
                  className={`h-2 w-2 rounded-full ${
                    step.status === "Healthy"
                      ? "bg-emerald-400"
                      : step.status === "Warning"
                      ? "bg-amber-400"
                      : "bg-rose-400"
                  }`}
                />

                <div>
                  <p className="text-xs font-medium text-white">
                    {step.title}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Link
            to="/infrastructure"
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-yellow-500/30 bg-yellow-500/10 px-3 py-2 text-xs font-medium text-yellow-300 hover:bg-yellow-500/20"
          >
            View Infrastructure →
          </Link>
        </div>
      )}
    </div>
  )
}

export default AgentPanel