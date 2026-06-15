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
const CHART_COLORS = ['#10b981', '#38bdf8', '#6366f1', '#f59e0b', '#f43f5e']
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
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#0f766e" />
        </linearGradient>
        <linearGradient id="panelGradient" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#ecfdf5" />
        </linearGradient>
      </defs>
      <rect x="82" y="74" width="356" height="212" rx="28" fill="#dbeafe" />
      <rect
        x="108"
        y="48"
        width="304"
        height="238"
        rx="30"
        fill="url(#panelGradient)"
        stroke="#bae6fd"
        strokeWidth="2"
      />
      <path
        d="M155 217c38-63 78-84 121-62 27 14 48 8 64-18"
        fill="none"
        stroke="#0f766e"
        strokeLinecap="round"
        strokeWidth="14"
      />
      <path
        d="M330 122l22 13-13 22"
        fill="none"
        stroke="#0f766e"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="12"
      />
      <circle cx="164" cy="120" r="38" fill="url(#coinGradient)" />
      <path
        d="M164 98v44M148 109h24a12 12 0 0 1 0 24h-16"
        fill="none"
        stroke="#ecfdf5"
        strokeLinecap="round"
        strokeWidth="8"
      />
      <rect x="146" y="246" width="228" height="18" rx="9" fill="#cbd5e1" />
      <rect x="146" y="246" width="142" height="18" rx="9" fill="#34d399" />
      <circle cx="404" cy="92" r="22" fill="#fbbf24" />
      <circle cx="108" cy="268" r="18" fill="#38bdf8" />
      <path
        d="M72 316h376"
        stroke="#cbd5e1"
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
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#e0f2fe" />
        </linearGradient>
      </defs>
      <rect x="76" y="54" width="368" height="252" rx="30" fill="#c7d2fe" />
      <rect
        x="100"
        y="34"
        width="320"
        height="260"
        rx="28"
        fill="url(#dashboardGradient)"
        stroke="#bae6fd"
        strokeWidth="2"
      />
      <rect x="126" y="68" width="104" height="22" rx="11" fill="#0f172a" />
      <rect x="126" y="112" width="108" height="72" rx="18" fill="#ecfdf5" />
      <rect x="250" y="112" width="144" height="72" rx="18" fill="#eff6ff" />
      <path
        d="M142 164h20v-18h18v18h20"
        fill="none"
        stroke="#10b981"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="8"
      />
      <rect x="270" y="134" width="80" height="10" rx="5" fill="#38bdf8" />
      <rect x="270" y="154" width="56" height="10" rx="5" fill="#93c5fd" />
      <rect x="126" y="206" width="268" height="22" rx="11" fill="#ffffff" />
      <rect x="142" y="213" width="94" height="8" rx="4" fill="#94a3b8" />
      <circle cx="368" cy="217" r="8" fill="#10b981" />
      <rect x="126" y="242" width="268" height="22" rx="11" fill="#ffffff" />
      <rect x="142" y="249" width="122" height="8" rx="4" fill="#94a3b8" />
      <circle cx="368" cy="253" r="8" fill="#f59e0b" />
      <path
        d="M420 106c28 16 42 40 40 72"
        fill="none"
        stroke="#0ea5e9"
        strokeLinecap="round"
        strokeWidth="10"
      />
      <path
        d="M426 102h36v36"
        fill="none"
        stroke="#0ea5e9"
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
        borderColor: '#ffffff',
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
        backgroundColor: '#0f172a',
        borderRadius: 8,
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
          color: '#475569',
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
          color: '#64748b',
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: '#e2e8f0',
        },
        ticks: {
          color: '#64748b',
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
    <main className="app-shell min-h-screen px-4 py-10 text-slate-900 sm:px-6 lg:px-8">
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center">
        <div className="premium-panel grid w-full gap-8 rounded-[2rem] border border-white/80 bg-white/90 p-5 ring-1 ring-slate-200/70 backdrop-blur sm:p-8 lg:grid-cols-[1.05fr_440px] lg:p-10">
          <div className="flex flex-col justify-center gap-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
                Personal finance
              </p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                Subscription Tracker
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
                Keep a clear view of recurring payments before they surprise
                your budget.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-[1fr_0.9fr]">
              <div className="premium-card rounded-3xl border border-slate-100 bg-white p-4">
                <SavingsIllustration />
              </div>
              <div className="premium-card rounded-3xl border border-slate-100 bg-slate-950 p-4 text-white">
                <DashboardIllustration />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white bg-white/70 p-4 shadow-sm">
                <p className="text-2xl font-bold text-slate-950">
                  {subscriptions.length}
                </p>
                <p className="mt-1 text-sm text-slate-500">Tracked plans</p>
              </div>
              <div className="rounded-2xl border border-white bg-white/70 p-4 shadow-sm">
                <p className="text-2xl font-bold text-slate-950">
                  ${totalMonthlyCost.toFixed(0)}
                </p>
                <p className="mt-1 text-sm text-slate-500">Monthly spend</p>
              </div>
              <div className="rounded-2xl border border-white bg-white/70 p-4 shadow-sm">
                <p className="text-2xl font-bold text-slate-950">
                  ${(totalMonthlyCost * 12).toFixed(0)}
                </p>
                <p className="mt-1 text-sm text-slate-500">Yearly view</p>
              </div>
            </div>

            <div className="grid gap-4 xl:grid-cols-2">
              <div className="premium-card rounded-3xl border border-slate-100 bg-white p-5">
                <div className="mb-4">
                  <p className="text-sm font-semibold text-slate-950">
                    Spend Breakdown
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {subscriptions.length > 0
                      ? 'Current subscriptions by cost'
                      : 'Sample view until subscriptions are added'}
                  </p>
                </div>
                <div className="h-56">
                  <Pie data={pieChartData} options={chartOptions} />
                </div>
              </div>

              <div className="premium-card rounded-3xl border border-slate-100 bg-white p-5">
                <div className="mb-4">
                  <p className="text-sm font-semibold text-slate-950">
                    Monthly Trend
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
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
            <div className="premium-card rounded-3xl border border-emerald-100 bg-emerald-50 p-5">
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
                Total Monthly Cost
            </p>
              <p className="mt-2 text-4xl font-bold text-emerald-950">
                ${totalMonthlyCost.toFixed(2)}
            </p>
          </div>

            <form
              onSubmit={handleSubmit}
              className="premium-card space-y-5 rounded-3xl border border-slate-200 bg-white p-5 sm:p-6"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-slate-700"
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
                  className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                />
              </div>

              <div>
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium text-slate-700"
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
                  className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                />
              </div>

              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-slate-700"
                >
                  Date
                </label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-950/15 transition hover:-translate-y-0.5 hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-200"
              >
                Add Subscription
              </button>
            </form>

            {subscriptions.length > 0 && (
              <ul className="space-y-3">
                {subscriptions.map((subscription) => (
                  <li
                    key={subscription.id}
                    className="subscription-card rounded-2xl border border-slate-100 bg-white p-4 transition hover:-translate-y-0.5 hover:border-emerald-200"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-slate-950">
                          {subscription.name}
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                          {subscription.date}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <p className="font-semibold text-emerald-700">
                          ${Number(subscription.amount || 0).toFixed(2)}
                        </p>
                        <button
                          type="button"
                          onClick={() => handleDelete(subscription.id)}
                          className="rounded-md border border-red-200 px-2.5 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50 focus:outline-none focus:ring-4 focus:ring-red-100"
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
