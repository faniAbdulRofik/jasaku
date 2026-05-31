import { redirect } from "next/navigation";
import Script from "next/script";
import { AlertMessages } from "@/components/AlertMessages";
import { DashboardShell } from "@/components/DashboardShell";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getAdminStats } from "@/lib/data";
import { formatCurrency, formatDate, formatNumber } from "@/lib/format";
import { getSessionUser } from "@/lib/session";

export const dynamic = "force-dynamic";
type PageProps = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function AdminDashboard({ searchParams }: PageProps) {
  const params = await searchParams;
  const user = await getSessionUser();
  if (!user || user.role !== "admin") redirect("/login?error=Anda tidak memiliki akses admin");
  const stats = await getAdminStats();
  const userRoleEntries = Object.entries(stats.user_roles || {});
  const chartData = {
    daily: stats.daily_bookings,
    monthly: stats.monthly_bookings,
    userRoles: userRoleEntries.map(([role, count]) => ({ role, count })),
  };

  return (
    <>
      <SiteHeader />
      <AlertMessages success={params.success} error={params.error} warning={params.warning} />
      <DashboardShell role="admin" active="/admin/dashboard" title="Admin Dashboard">
        <div className="mb-6" data-aos="fade-up">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 md:p-5">
              <div className="flex flex-col space-y-3 md:flex-row md:items-center md:justify-between md:space-y-0">
                <div className="flex-1 min-w-0">
                  <h1 className="text-xl md:text-2xl font-bold text-gray-800 truncate">Welcome back, {user.full_name}! <span className="text-blue-500">👋</span></h1>
                  <p className="text-sm text-gray-500 mt-1">Admin dashboard overview</p>
                </div>
                <span className="inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-semibold rounded-lg shadow">
                  <i className="fas fa-user-shield text-xs w-4 text-center mr-2" />Admin Panel
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8" data-aos="fade-up" data-aos-delay="100">
          {[
            ["Total Users", formatNumber(stats.total_users), "from-blue-500 to-blue-600", "fa-users", "hover:border-blue-200"],
            ["Total Services", formatNumber(stats.total_services), "from-green-500 to-green-600", "fa-concierge-bell", "hover:border-green-200"],
            ["Total Bookings", formatNumber(stats.total_bookings), "from-purple-500 to-purple-600", "fa-calendar-check", "hover:border-purple-200"],
            ["Total Revenue", formatCurrency(stats.total_revenue), "from-yellow-500 to-yellow-600", "fa-money-bill-wave", "hover:border-yellow-200"],
          ].map(([label, value, gradient, icon, hoverBorder]) => (
            <div key={String(label)} className={`bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-md ${hoverBorder}`}>
              <div className="p-5">
                <div className="flex items-center">
                  <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-lg flex items-center justify-center mr-4 text-white shadow-md`}>
                    <i className={`fas ${icon} text-lg`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">{label}</p>
                    <h3 className="text-xl font-bold text-gray-800">{value}</h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100" data-aos="fade-up" data-aos-delay="150">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">Booking Trends</h2>
              <div className="flex space-x-2">
                <button id="dailyBtn" className="px-3 py-1 text-xs font-medium rounded-md bg-blue-100 text-blue-700">Daily</button>
                <button id="monthlyBtn" className="px-3 py-1 text-xs font-medium rounded-md bg-gray-100 text-gray-700">Monthly</button>
              </div>
            </div>
            <div className="p-5">
              <div id="dailyChartContainer" className="h-64">
                <canvas id="dailyBookingChart" />
              </div>
              <div id="monthlyChartContainer" className="h-64" style={{ display: "none" }}>
                <canvas id="monthlyBookingChart" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100" data-aos="fade-up" data-aos-delay="200">
            <div className="p-5 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">User Distribution</h2>
            </div>
            <div className="p-5">
              <div className="flex">
                <div className="w-1/2 h-64">
                  <canvas id="userChart" />
                </div>
                <div className="w-1/2 pl-4">
                  <div className="space-y-3 mt-4">
                    {userRoleEntries.map(([role, count]) => (
                      <div key={role} className="flex items-center">
                        <span className={`w-3 h-3 rounded-full mr-2 ${role === "admin" ? "bg-blue-500" : role === "provider" ? "bg-green-500" : "bg-purple-500"}`} />
                        <span className="text-sm font-medium text-gray-700 capitalize">{role}</span>
                        <span className="ml-auto text-sm font-semibold text-gray-700">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2" data-aos="fade-up" data-aos-delay="250">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="p-5 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800">Recent Activities</h2>
              </div>
              <div className="p-5">
                {stats.recent_activities.length ? (
                  <div className="space-y-4">
                    {stats.recent_activities.map((activity, index) => (
                      <div key={`${activity.type}-${index}`} className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.type === "user" ? "bg-blue-100 text-blue-600" : activity.type === "service" ? "bg-green-100 text-green-600" : "bg-purple-100 text-purple-600"}`}>
                            <i className={`fas ${activity.type === "user" ? "fa-user" : activity.type === "service" ? "fa-concierge-bell" : "fa-calendar"}`} />
                          </div>
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-gray-900">{activity.title}</h4>
                            <span className="text-xs text-gray-500">{formatDate(activity.created_at)}</span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{activity.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="mx-auto w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-200">
                      <i className="fas fa-clock text-gray-400 text-xl" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-700 mb-2">No recent activities</h3>
                    <p className="text-gray-500">Activities will appear here</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div data-aos="fade-up" data-aos-delay="300">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="p-5 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800">Quick Actions</h2>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    ["/admin/users", "Add User", "fa-user-plus", "from-blue-500 to-blue-600", "hover:border-blue-500 hover:bg-blue-50", "group-hover:text-blue-600"],
                    ["/admin/services", "Add Service", "fa-plus-circle", "from-green-500 to-green-600", "hover:border-green-500 hover:bg-green-50", "group-hover:text-green-600"],
                    ["/admin/bookings", "Manage Bookings", "fa-calendar-plus", "from-purple-500 to-purple-600", "hover:border-purple-500 hover:bg-purple-50", "group-hover:text-purple-600"],
                    ["/admin/settings", "Settings", "fa-cog", "from-yellow-500 to-yellow-600", "hover:border-yellow-500 hover:bg-yellow-50", "group-hover:text-yellow-600"],
                  ].map(([href, label, icon, gradient, hoverClass, textClass]) => (
                    <a key={href} href={href} className={`flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg ${hoverClass} transition-all duration-200 group`}>
                      <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-full flex items-center justify-center mb-2 text-white shadow-md group-hover:scale-110 transition-transform`}>
                        <i className={`fas ${icon} text-sm`} />
                      </div>
                      <span className={`text-sm font-medium text-gray-700 ${textClass} text-center`}>{label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardShell>
      <Script id="admin-dashboard-charts" strategy="afterInteractive">
        {`
          (function() {
            const data = ${JSON.stringify(chartData)};
            if (!window.Chart) return;

            const dailyCanvas = document.getElementById('dailyBookingChart');
            if (dailyCanvas && !dailyCanvas.dataset.ready) {
              dailyCanvas.dataset.ready = 'true';
              new Chart(dailyCanvas.getContext('2d'), {
                type: 'line',
                data: {
                  labels: data.daily.map((item) => item.label),
                  datasets: [{
                    label: 'Daily Bookings',
                    data: data.daily.map((item) => item.bookings),
                    borderColor: 'rgb(59, 130, 246)',
                    backgroundColor: 'rgba(59, 130, 246, 0.05)',
                    borderWidth: 2,
                    tension: 0.1,
                    fill: true
                  }]
                },
                options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, grid: { drawBorder: false } }, x: { grid: { display: false } } } }
              });
            }

            const monthlyCanvas = document.getElementById('monthlyBookingChart');
            if (monthlyCanvas && !monthlyCanvas.dataset.ready) {
              monthlyCanvas.dataset.ready = 'true';
              new Chart(monthlyCanvas.getContext('2d'), {
                type: 'bar',
                data: {
                  labels: data.monthly.map((item) => item.label),
                  datasets: [{
                    label: 'Monthly Bookings',
                    data: data.monthly.map((item) => item.bookings),
                    backgroundColor: 'rgba(79, 70, 229, 0.7)',
                    borderColor: 'rgba(79, 70, 229, 1)',
                    borderWidth: 1
                  }]
                },
                options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, grid: { drawBorder: false } }, x: { grid: { display: false } } } }
              });
            }

            const userCanvas = document.getElementById('userChart');
            if (userCanvas && !userCanvas.dataset.ready) {
              userCanvas.dataset.ready = 'true';
              new Chart(userCanvas.getContext('2d'), {
                type: 'doughnut',
                data: {
                  labels: data.userRoles.map((item) => item.role.charAt(0).toUpperCase() + item.role.slice(1)),
                  datasets: [{ data: data.userRoles.map((item) => item.count), backgroundColor: ['rgb(59, 130, 246)', 'rgb(16, 185, 129)', 'rgb(139, 92, 246)'], borderWidth: 0 }]
                },
                options: { responsive: true, maintainAspectRatio: false, cutout: '70%', plugins: { legend: { display: false } } }
              });
            }

            const dailyBtn = document.getElementById('dailyBtn');
            const monthlyBtn = document.getElementById('monthlyBtn');
            const dailyContainer = document.getElementById('dailyChartContainer');
            const monthlyContainer = document.getElementById('monthlyChartContainer');
            if (dailyBtn && monthlyBtn && dailyContainer && monthlyContainer && !dailyBtn.dataset.ready) {
              dailyBtn.dataset.ready = 'true';
              dailyBtn.addEventListener('click', function() {
                dailyContainer.style.display = 'block';
                monthlyContainer.style.display = 'none';
                dailyBtn.classList.add('bg-blue-100', 'text-blue-700');
                dailyBtn.classList.remove('bg-gray-100', 'text-gray-700');
                monthlyBtn.classList.add('bg-gray-100', 'text-gray-700');
                monthlyBtn.classList.remove('bg-blue-100', 'text-blue-700');
              });
              monthlyBtn.addEventListener('click', function() {
                dailyContainer.style.display = 'none';
                monthlyContainer.style.display = 'block';
                monthlyBtn.classList.add('bg-blue-100', 'text-blue-700');
                monthlyBtn.classList.remove('bg-gray-100', 'text-gray-700');
                dailyBtn.classList.add('bg-gray-100', 'text-gray-700');
                dailyBtn.classList.remove('bg-blue-100', 'text-blue-700');
              });
            }
          })();
        `}
      </Script>
      <SiteFooter />
    </>
  );
}
