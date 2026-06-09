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
    <div className="rounded-3xl border border-yellow-600/20 bg-slate-950/80 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-yellow-400">Agent Network</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Multi-Agent Cloud Control Center</h2>
          <p className="mt-2 text-sm text-slate-400 max-w-2xl">
            Visualize the multi-service orchestration layer and AWS-style deployment topology behind SyncSpace.
          </p>
        </div>
        <div className="rounded-full border border-yellow-500/30 bg-black/50 px-4 py-2 text-sm text-yellow-200">
          AWS Deployment Simulation
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {agentServices.map((agent) => (
          <div key={agent.name} className="rounded-3xl border border-slate-700/80 bg-slate-900/80 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-white">{agent.name}</p>
                <p className="text-sm text-slate-400">{agent.role}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[agent.status] ?? "bg-slate-700 text-slate-200"}`}>
                {agent.status}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-300">{agent.description}</p>
            {agent.uptime && <p className="mt-3 text-xs uppercase tracking-[0.18em] text-slate-500">Uptime {agent.uptime}</p>}
          </div>
        ))}
      </div>

      {!compact && (
        <div className="mt-6 rounded-3xl border border-yellow-600/20 bg-black/30 p-5">
          <h3 className="text-lg font-semibold text-white">Agent Pipeline</h3>
          <div className="mt-4 space-y-3">
            {agentPipeline.map((step) => (
              <div key={step.title} className="flex items-start gap-4 rounded-3xl border border-slate-700/80 bg-slate-950/60 p-4">
                <div className={`mt-1 h-3 w-3 rounded-full ${statusStyles[step.status] ?? "bg-slate-500"}`} />
                <div className="min-w-0">
                  <p className="font-medium text-white">{step.title}</p>
                  <p className="text-sm text-slate-400">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
          <Link
            to="/infrastructure"
            className="mt-4 inline-flex items-center justify-center w-full gap-2 rounded-lg bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 px-4 py-3 text-sm font-semibold text-yellow-300 transition-all hover:border-yellow-500/50 hover:bg-gradient-to-r hover:from-yellow-500/30 hover:to-yellow-600/30"
          >
            <span>🚀</span>
            <span>View Full Infrastructure</span>
            <span>→</span>
          </Link>
        </div>
      )}
    </div>
  )
}

export default AgentPanel
