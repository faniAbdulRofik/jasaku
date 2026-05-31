import { headers } from "next/headers";
import { getSessionUser } from "@/lib/session";
import { profilePath } from "@/lib/format";

export async function SiteHeader() {
  const user = await getSessionUser();
  const headerList = await headers();
  const currentPath = headerList.get("x-current-path") || "/";
  const currentPage = currentPath === "/" ? "index.php" : currentPath.split("/").filter(Boolean).pop() || "index.php";
  const navClass = (page: string) =>
    `${currentPage === page ? "text-blue-600" : "text-gray-700"} px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100`;
  const mobileNavClass = (page: string) =>
    `${currentPage === page ? "bg-blue-50 text-blue-600" : "text-gray-700"} block px-3 py-2 rounded-md text-base font-medium`;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "linear-gradient(90deg, #2563eb 0%, #9333ea 100%)" }}
              >
                <i className="fas fa-search text-white text-sm" />
              </div>
              <span className="font-bold text-xl text-gray-900">JasaKu</span>
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            <a href="/index.php" className={navClass("index.php")}>
              <i className="fas fa-home mr-1" /> Beranda
            </a>
            <a href="/search.php" className={navClass("search.php")}>
              <i className="fas fa-search mr-1" /> Cari Jasa
            </a>

            {user?.role === "provider" && (
              <a href="/provider/dashboard.php" className="text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100">
                <i className="fas fa-tachometer-alt mr-1" /> Dashboard
              </a>
            )}
            {user?.role === "admin" && (
              <a href="/admin/dashboard.php" className="text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100">
                <i className="fas fa-cog mr-1" /> Admin Panel
              </a>
            )}
            {user?.role === "customer" && (
              <a href="/customer/dashboard.php" className="text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100">
                <i className="fas fa-tachometer-alt mr-1" /> Dashboard
              </a>
            )}
          </div>

          <div className="hidden md:flex items-center">
            {user ? (
              <>
                <div className="dropdown relative mr-3">
                  <button className="dropdown-toggle text-gray-600 hover:text-blue-600 focus:outline-none relative" type="button" id="notificationDropdown">
                    <i className="fas fa-bell text-lg" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center" id="notification-count" style={{ display: "none" }}>
                      0
                    </span>
                  </button>
                  <ul className="dropdown-menu absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg py-1 z-50" aria-labelledby="notificationDropdown">
                    <li>
                      <h6 className="dropdown-header px-4 py-2 text-sm text-gray-700">Notifikasi</h6>
                    </li>
                    <div id="notification-list">
                      <li>
                        <span className="dropdown-item-text px-4 py-2 text-sm text-gray-500">Tidak ada notifikasi</span>
                      </li>
                    </div>
                    <li>
                      <hr className="dropdown-divider my-1 border-gray-200" />
                    </li>
                    <li>
                      <a className="dropdown-item px-4 py-2 text-sm text-center text-blue-600 hover:bg-gray-100" href="#" id="mark-all-read">
                        <i className="fas fa-check-circle mr-1" /> Tandai semua sudah dibaca
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="dropdown relative">
                  <button className="dropdown-toggle flex items-center text-gray-700 hover:text-blue-600 focus:outline-none" type="button" id="userDropdown">
                    <img src={profilePath(user.profile_image)} alt="Profile" className="w-8 h-8 rounded-full mr-2 object-cover" />
                    <span>{user.full_name}</span>
                  </button>
                  <ul className="dropdown-menu absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50" aria-labelledby="userDropdown">
                    {user.role === "provider" && (
                      <>
                        <li>
                          <a className="dropdown-item px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" href="/provider/dashboard.php">
                            <i className="fas fa-tachometer-alt mr-2" />Dashboard
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" href="/provider/services.php">
                            <i className="fas fa-concierge-bell mr-2" />Layanan Saya
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" href="/provider/bookings.php">
                            <i className="fas fa-calendar mr-2" />Booking Masuk
                          </a>
                        </li>
                      </>
                    )}
                    {user.role === "customer" && (
                      <>
                        <li>
                          <a className="dropdown-item px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" href="/customer/dashboard.php">
                            <i className="fas fa-tachometer-alt mr-2" />Dashboard
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" href="/customer/bookings.php">
                            <i className="fas fa-calendar mr-2" />Booking Saya
                          </a>
                        </li>
                      </>
                    )}
                    {user.role === "admin" && (
                      <li>
                        <a className="dropdown-item px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" href="/admin/dashboard.php">
                          <i className="fas fa-user-shield mr-2" />Admin Panel
                        </a>
                      </li>
                    )}
                    <li>
                      <hr className="dropdown-divider my-1 border-gray-200" />
                    </li>
                    <li>
                      <a className="dropdown-item px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" href={user.role === "customer" ? "/customer/settings.php" : user.role === "provider" ? "/provider/settings.php" : "/admin/settings.php"}>
                        <i className="fas fa-cog mr-2" />Pengaturan
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item px-4 py-2 text-sm text-red-600 hover:bg-gray-100" href="/logout.php">
                        <i className="fas fa-sign-out-alt mr-2" />Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <a href="/login.php" className="text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100">
                  <i className="fas fa-sign-in-alt mr-1" /> Masuk
                </a>
                <a href="/register.php" className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                  <i className="fas fa-user-plus mr-1" /> Daftar
                </a>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button type="button" id="mobileMenuButton" className="text-gray-600 hover:text-blue-600 focus:outline-none">
              <i className="fas fa-bars text-xl" />
            </button>
          </div>
        </div>
      </div>

      <div id="mobileMenu" className="md:hidden hidden bg-white border-t border-gray-200">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <a href="/index.php" className={mobileNavClass("index.php")}>
            <i className="fas fa-home mr-2" /> Beranda
          </a>
          <a href="/search.php" className={mobileNavClass("search.php")}>
            <i className="fas fa-search mr-2" /> Cari Jasa
          </a>
          {user ? (
            <>
              {user.role === "provider" && (
                <a href="/provider/dashboard.php" className="text-gray-700 block px-3 py-2 rounded-md text-base font-medium">
                  <i className="fas fa-tachometer-alt mr-2" /> Dashboard
                </a>
              )}
              {user.role === "admin" && (
                <a href="/admin/dashboard.php" className="text-gray-700 block px-3 py-2 rounded-md text-base font-medium">
                  <i className="fas fa-cog mr-2" /> Admin Panel
                </a>
              )}
              {user.role === "customer" && (
                <a href="/customer/dashboard.php" className="text-gray-700 block px-3 py-2 rounded-md text-base font-medium">
                  <i className="fas fa-tachometer-alt mr-2" /> Dashboard
                </a>
              )}

              <div className="pt-2 border-t border-gray-200">
                {user.role === "customer" && (
                  <>
                    <a href="/customer/dashboard.php" className="text-gray-700 block px-3 py-2 rounded-md text-base font-medium">
                      <i className="fas fa-tachometer-alt mr-2" /> Dashboard
                    </a>
                    <a href="/customer/bookings.php" className="text-gray-700 block px-3 py-2 rounded-md text-base font-medium">
                      <i className="fas fa-calendar mr-2" /> Booking Saya
                    </a>
                  </>
                )}
                {user.role === "provider" && (
                  <>
                    <a href="/provider/services.php" className="text-gray-700 block px-3 py-2 rounded-md text-base font-medium">
                      <i className="fas fa-concierge-bell mr-2" /> Layanan Saya
                    </a>
                    <a href="/provider/bookings.php" className="text-gray-700 block px-3 py-2 rounded-md text-base font-medium">
                      <i className="fas fa-calendar mr-2" /> Booking Masuk
                    </a>
                  </>
                )}
                <a href={user.role === "customer" ? "/customer/settings.php" : user.role === "provider" ? "/provider/settings.php" : "/admin/settings.php"} className="text-gray-700 block px-3 py-2 rounded-md text-base font-medium">
                  <i className="fas fa-cog mr-2" /> Pengaturan
                </a>
                <a href="/logout.php" className="text-red-600 block px-3 py-2 rounded-md text-base font-medium">
                  <i className="fas fa-sign-out-alt mr-2" /> Logout
                </a>
              </div>
            </>
          ) : (
            <div className="pt-2 border-t border-gray-200">
              <a href="/login.php" className="text-gray-700 block px-3 py-2 rounded-md text-base font-medium">
                <i className="fas fa-sign-in-alt mr-2" /> Masuk
              </a>
              <a href="/register.php" className="mt-2 bg-blue-600 text-white block px-3 py-2 rounded-md text-base font-medium text-center hover:bg-blue-700">
                <i className="fas fa-user-plus mr-2" /> Daftar
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
