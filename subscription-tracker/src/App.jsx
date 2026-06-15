import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from 'chart.js'
import { useEffect, useRef, useState } from 'react'
import { Bar, Pie } from 'react-chartjs-2'

const STORAGE_KEY = 'subscription-tracker-subscriptions'
const CHART_COLORS = ['#ef4444', '#fb7185', '#f97316', '#22d3ee', '#a78bfa']
const SAMPLE_CHART_SUBSCRIPTIONS = [
  { id: 'sample-streaming', name: 'Streaming', amount: '18', date: '2026-01-01' },
  { id: 'sample-cloud', name: 'Cloud', amount: '12', date: '2026-02-01' },
  { id: 'sample-tools', name: 'Tools', amount: '24', date: '2026-03-01' },
]

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
)

function SavingsIllustration() {
  return (
    <svg
      className="h-auto w-full"
      viewBox="0 0 520 360"
      role="img"
      aria-labelledby="savings-title"
    >
      <title id="savings-title">Finance and savings illustration</title>
      <defs>
        <linearGradient id="coinGradient" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#fb7185" />
          <stop offset="100%" stopColor="#7f1d1d" />
        </linearGradient>
        <linearGradient id="panelGradient" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#18080b" />
          <stop offset="100%" stopColor="#050203" />
        </linearGradient>
      </defs>
      <rect x="82" y="74" width="356" height="212" rx="28" fill="#3f0c16" />
      <rect
        x="108"
        y="48"
        width="304"
        height="238"
        rx="30"
        fill="url(#panelGradient)"
        stroke="#7f1d1d"
        strokeWidth="2"
      />
      <path
        d="M155 217c38-63 78-84 121-62 27 14 48 8 64-18"
        fill="none"
        stroke="#fb7185"
        strokeLinecap="round"
        strokeWidth="14"
      />
      <path
        d="M330 122l22 13-13 22"
        fill="none"
        stroke="#fb7185"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="12"
      />
      <circle cx="164" cy="120" r="38" fill="url(#coinGradient)" />
      <path
        d="M164 98v44M148 109h24a12 12 0 0 1 0 24h-16"
        fill="none"
        stroke="#fff1f2"
        strokeLinecap="round"
        strokeWidth="8"
      />
      <rect x="146" y="246" width="228" height="18" rx="9" fill="#27272a" />
      <rect x="146" y="246" width="142" height="18" rx="9" fill="#ef4444" />
      <circle cx="404" cy="92" r="22" fill="#22d3ee" />
      <circle cx="108" cy="268" r="18" fill="#f97316" />
      <path
        d="M72 316h376"
        stroke="#7f1d1d"
        strokeLinecap="round"
        strokeWidth="10"
      />
    </svg>
  )
}

function DashboardIllustration() {
  return (
    <svg
      className="h-auto w-full"
      viewBox="0 0 520 360"
      role="img"
      aria-labelledby="dashboard-title"
    >
      <title id="dashboard-title">Subscription dashboard illustration</title>
      <defs>
        <linearGradient id="dashboardGradient" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#100507" />
          <stop offset="100%" stopColor="#050203" />
        </linearGradient>
      </defs>
      <rect x="76" y="54" width="368" height="252" rx="30" fill="#3f0c16" />
      <rect
        x="100"
        y="34"
        width="320"
        height="260"
        rx="28"
        fill="url(#dashboardGradient)"
        stroke="#7f1d1d"
        strokeWidth="2"
      />
      <rect x="126" y="68" width="104" height="22" rx="11" fill="#ef4444" />
      <rect x="126" y="112" width="108" height="72" rx="18" fill="#1f0b10" />
      <rect x="250" y="112" width="144" height="72" rx="18" fill="#111827" />
      <path
        d="M142 164h20v-18h18v18h20"
        fill="none"
        stroke="#fb7185"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="8"
      />
      <rect x="270" y="134" width="80" height="10" rx="5" fill="#22d3ee" />
      <rect x="270" y="154" width="56" height="10" rx="5" fill="#fda4af" />
      <rect x="126" y="206" width="268" height="22" rx="11" fill="#18181b" />
      <rect x="142" y="213" width="94" height="8" rx="4" fill="#71717a" />
      <circle cx="368" cy="217" r="8" fill="#ef4444" />
      <rect x="126" y="242" width="268" height="22" rx="11" fill="#18181b" />
      <rect x="142" y="249" width="122" height="8" rx="4" fill="#71717a" />
      <circle cx="368" cy="253" r="8" fill="#f97316" />
      <path
        d="M420 106c28 16 42 40 40 72"
        fill="none"
        stroke="#22d3ee"
        strokeLinecap="round"
        strokeWidth="10"
      />
      <path
        d="M426 102h36v36"
        fill="none"
        stroke="#22d3ee"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="10"
      />
    </svg>
  )
}

function App() {
  const [subscriptions, setSubscriptions] = useState([])
  const hasLoadedSubscriptions = useRef(false)
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    date: '',
  })
  const totalMonthlyCost = subscriptions.reduce(
    (total, subscription) => total + Number(subscription.amount || 0),
    0,
  )
  const chartSubscriptions =
    subscriptions.length > 0 ? subscriptions : SAMPLE_CHART_SUBSCRIPTIONS
  const pieChartData = {
    labels: chartSubscriptions.map((subscription) => subscription.name),
    datasets: [
      {
        data: chartSubscriptions.map((subscription) =>
          Number(subscription.amount || 0),
        ),
        backgroundColor: chartSubscriptions.map(
          (_, index) => CHART_COLORS[index % CHART_COLORS.length],
        ),
        borderColor: '#100507',
        borderWidth: 4,
      },
    ],
  }
  const monthlySpend = chartSubscriptions.reduce((months, subscription) => {
    const date = subscription.date ? new Date(subscription.date) : new Date()
    const month = date.toLocaleDateString('en-US', {
      month: 'short',
      year: '2-digit',
    })

    return {
      ...months,
      [month]: (months[month] || 0) + Number(subscription.amount || 0),
    }
  }, {})
  const barChartData = {
    labels: Object.keys(monthlySpend),
    datasets: [
      {
        label: 'Monthly spend',
        data: Object.values(monthlySpend),
        backgroundColor: '#ef4444',
        borderRadius: 4,
        maxBarThickness: 36,
      },
    ],
  }
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 10,
          color: '#cbd5e1',
          font: {
            size: 11,
          },
          usePointStyle: true,
        },
      },
    },
  }
  const barChartOptions = {
    ...chartOptions,
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#cbd5e1',
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(248, 113, 113, 0.16)',
        },
        ticks: {
          color: '#cbd5e1',
        },
      },
    },
  }

  useEffect(() => {
    const savedSubscriptions = localStorage.getItem(STORAGE_KEY)

    queueMicrotask(() => {
      if (savedSubscriptions) {
        setSubscriptions(JSON.parse(savedSubscriptions))
      }

      hasLoadedSubscriptions.current = true
    })
  }, [])

  useEffect(() => {
    if (hasLoadedSubscriptions.current) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(subscriptions))
    }
  }, [subscriptions])

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    setSubscriptions((currentSubscriptions) => [
      ...currentSubscriptions,
      {
        id: crypto.randomUUID(),
        name: formData.name,
        amount: formData.amount,
        date: formData.date,
      },
    ])

    setFormData({
      name: '',
      amount: '',
      date: '',
    })
  }

  function handleDelete(subscriptionId) {
    setSubscriptions((currentSubscriptions) =>
      currentSubscriptions.filter(
        (subscription) => subscription.id !== subscriptionId,
      ),
    )
  }

  return (
    <main className="app-shell min-h-screen px-4 py-10 text-slate-100 sm:px-6 lg:px-8">
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center">
        <div className="premium-panel grid w-full gap-8 rounded-lg border border-red-400/20 bg-zinc-950/88 p-5 ring-1 ring-white/5 backdrop-blur sm:p-8 lg:grid-cols-[1.05fr_440px] lg:p-10">
          <div className="flex flex-col justify-center gap-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-red-300">
                Personal finance command center
              </p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Subscription Tracker
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-zinc-300">
                Keep a clear view of recurring payments before they surprise
                your budget.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-[1fr_0.9fr]">
              <div className="premium-card rounded-lg border border-red-400/15 bg-black/50 p-4">
                <SavingsIllustration />
              </div>
              <div className="premium-card rounded-lg border border-cyan-300/15 bg-black p-4 text-white">
                <DashboardIllustration />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-red-400/15 bg-white/[0.04] p-4 shadow-sm">
                <p className="text-2xl font-bold text-white">
                  {subscriptions.length}
                </p>
                <p className="mt-1 text-sm text-zinc-400">Tracked plans</p>
              </div>
              <div className="rounded-lg border border-red-400/15 bg-white/[0.04] p-4 shadow-sm">
                <p className="text-2xl font-bold text-white">
                  ${totalMonthlyCost.toFixed(0)}
                </p>
                <p className="mt-1 text-sm text-zinc-400">Monthly spend</p>
              </div>
              <div className="rounded-lg border border-red-400/15 bg-white/[0.04] p-4 shadow-sm">
                <p className="text-2xl font-bold text-white">
                  ${(totalMonthlyCost * 12).toFixed(0)}
                </p>
                <p className="mt-1 text-sm text-zinc-400">Yearly view</p>
              </div>
            </div>

            <div className="grid gap-4 xl:grid-cols-2">
              <div className="premium-card rounded-lg border border-red-400/15 bg-zinc-950/90 p-5">
                <div className="mb-4">
                  <p className="text-sm font-semibold text-white">
                    Spend Breakdown
                  </p>
                  <p className="mt-1 text-xs text-zinc-400">
                    {subscriptions.length > 0
                      ? 'Current subscriptions by cost'
                      : 'Sample view until subscriptions are added'}
                  </p>
                </div>
                <div className="h-56">
                  <Pie data={pieChartData} options={chartOptions} />
                </div>
              </div>

              <div className="premium-card rounded-lg border border-red-400/15 bg-zinc-950/90 p-5">
                <div className="mb-4">
                  <p className="text-sm font-semibold text-white">
                    Monthly Trend
                  </p>
                  <p className="mt-1 text-xs text-zinc-400">
                    Spend grouped by subscription date
                  </p>
                </div>
                <div className="h-56">
                  <Bar data={barChartData} options={barChartOptions} />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="premium-card rounded-lg border border-red-400/25 bg-red-950/35 p-5">
            <p className="text-sm font-semibold uppercase tracking-wide text-red-300">
                Total Monthly Cost
            </p>
              <p className="mt-2 text-4xl font-bold text-white">
                ${totalMonthlyCost.toFixed(2)}
            </p>
          </div>

            <form
              onSubmit={handleSubmit}
              className="premium-card space-y-5 rounded-lg border border-red-400/15 bg-zinc-950/90 p-5 sm:p-6"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-zinc-300"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Netflix"
                  className="mt-2 w-full rounded-md border border-red-400/15 bg-black/50 px-3 py-2.5 text-white outline-none transition placeholder:text-zinc-600 focus:border-red-400 focus:ring-4 focus:ring-red-500/15"
                />
              </div>

              <div>
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium text-zinc-300"
                >
                  Amount
                </label>
                <input
                  id="amount"
                  name="amount"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="15.99"
                  className="mt-2 w-full rounded-md border border-red-400/15 bg-black/50 px-3 py-2.5 text-white outline-none transition placeholder:text-zinc-600 focus:border-red-400 focus:ring-4 focus:ring-red-500/15"
                />
              </div>

              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-zinc-300"
                >
                  Date
                </label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-md border border-red-400/15 bg-black/50 px-3 py-2.5 text-white outline-none transition focus:border-red-400 focus:ring-4 focus:ring-red-500/15"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-md border border-red-300/30 bg-red-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-red-950/40 transition hover:-translate-y-0.5 hover:bg-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/25"
              >
                Add Subscription
              </button>
            </form>

            {subscriptions.length > 0 && (
              <ul className="space-y-3">
                {subscriptions.map((subscription) => (
                  <li
                    key={subscription.id}
                    className="subscription-card rounded-lg border border-red-400/15 bg-zinc-950/90 p-4 transition hover:-translate-y-0.5 hover:border-red-300/35"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-white">
                          {subscription.name}
                        </p>
                        <p className="mt-1 text-sm text-zinc-400">
                          {subscription.date}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <p className="font-semibold text-red-300">
                          ${Number(subscription.amount || 0).toFixed(2)}
                        </p>
                        <button
                          type="button"
                          onClick={() => handleDelete(subscription.id)}
                          className="rounded-md border border-red-400/25 px-2.5 py-1.5 text-xs font-semibold text-red-200 transition hover:bg-red-500/15 focus:outline-none focus:ring-4 focus:ring-red-500/20"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
