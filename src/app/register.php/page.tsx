import { PageChrome } from "@/components/PageChrome";
import { registerAction } from "@/lib/actions";

export const dynamic = "force-dynamic";

type RegisterPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function single(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const params = await searchParams;
  const role = single(params.role) === "provider" ? "provider" : "customer";

  return (
    <PageChrome searchParams={params}>
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-3xl">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-2/3 p-8">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center space-x-2 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                      <i className="fas fa-calendar-check text-white" />
                    </div>
                    <span className="font-bold text-2xl text-gray-900">BookingJasa</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Daftar Akun Baru</h2>
                  <p className="text-gray-600 mt-1">
                    Bergabung sebagai <span className="font-semibold text-blue-600">{role === "provider" ? "Provider" : "Customer"}</span>
                  </p>
                </div>

                <div className="flex mb-6 rounded-lg bg-gray-100 p-1">
                  <a href="/register.php?role=customer" className={`flex-1 py-2 px-4 text-center rounded-md ${role === "customer" ? "bg-white shadow-sm text-blue-600 font-medium" : "text-gray-600 hover:text-gray-800"}`}>
                    <i className="fas fa-user mr-2" />Customer
                  </a>
                  <a href="/register.php?role=provider" className={`flex-1 py-2 px-4 text-center rounded-md ${role === "provider" ? "bg-white shadow-sm text-blue-600 font-medium" : "text-gray-600 hover:text-gray-800"}`}>
                    <i className="fas fa-briefcase mr-2" />Provider
                  </a>
                </div>

                {params.success ? (
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <i className="fas fa-check-circle text-green-500" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-green-700">{single(params.success)}</p>
                        <div className="mt-2">
                          <a href="/login.php" className="inline-flex items-center px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700">
                            <i className="fas fa-sign-in-alt mr-2" />Login Sekarang
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form action={registerAction}>
                    <input type="hidden" name="role" value={role} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <input type="text" className="form-input w-full px-4 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500" id="username" name="username" placeholder="Username unik" required />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input type="email" className="form-input w-full px-4 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500" id="email" name="email" placeholder="email@example.com" required />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                      <input type="text" className="form-input w-full px-4 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500" id="full_name" name="full_name" placeholder="Nama lengkap Anda" required />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input type="password" className="form-input w-full px-4 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500" id="password" name="password" placeholder="Minimal 6 karakter" required />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Password</label>
                        <input type="password" className="form-input w-full px-4 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500" id="confirm_password" name="confirm_password" placeholder="Ulangi password" required />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Nomor Telepon</label>
                      <input type="tel" className="form-input w-full px-4 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500" id="phone" name="phone" placeholder="08xxxxxxxxxx" />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
                      <textarea className="form-textarea w-full px-4 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500" id="address" name="address" rows={3} placeholder="Alamat lengkap Anda" />
                    </div>

                    <div className="mb-6">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out" id="terms" required />
                        </div>
                        <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                          Saya setuju dengan <a href="#" className="text-blue-600 hover:text-blue-800">Syarat & Ketentuan</a> dan <a href="#" className="text-blue-600 hover:text-blue-800">Kebijakan Privasi</a>
                        </label>
                      </div>
                    </div>

                    <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-md hover:from-blue-700 hover:to-purple-700 transition duration-300 font-semibold shadow-md">
                      <i className="fas fa-user-plus mr-2" />Daftar Sekarang
                    </button>
                  </form>
                )}

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Sudah punya akun? <a href="/login.php" className="font-medium text-blue-600 hover:text-blue-500">Login di sini</a>
                  </p>
                </div>
              </div>

              <div className="md:w-1/3 bg-gray-50 p-8 hidden md:block">
                <div className="h-full flex flex-col justify-center">
                  <div className="text-center mb-6">
                    <i className="fas fa-star text-yellow-500 text-4xl mb-3" />
                    <h3 className="text-lg font-bold text-gray-900">Keuntungan sebagai {role === "provider" ? "Provider" : "Customer"}</h3>
                  </div>
                  <ul className="space-y-4">
                    {(role === "provider"
                      ? ["Dapatkan penghasilan tambahan", "Kelola jadwal secara fleksibel", "Jangkauan customer yang luas", "Sistem pembayaran yang aman"]
                      : ["Akses ke berbagai layanan berkualitas", "Booking online yang mudah", "Provider terverifikasi dan terpercaya", "Sistem rating dan review"]
                    ).map((item) => (
                      <li key={item} className="flex items-start">
                        <i className="fas fa-check-circle text-green-500 mt-1 mr-3" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-center">
                      <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full">
                        <i className="fas fa-headset text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-gray-900">Butuh Bantuan?</h4>
                        <p className="text-xs text-gray-500">Hubungi kami di support@bookingjasa.com</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageChrome>
  );
}
