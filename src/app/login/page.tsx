import { PageChrome } from "@/components/PageChrome";
import { loginAction } from "@/lib/actions";

export const dynamic = "force-dynamic";

type LoginPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;

  return (
    <PageChrome searchParams={params}>
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 flex items-center justify-center py-12">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <i className="fas fa-search text-white text-sm" />
                </div>
                <span className="font-bold text-2xl text-gray-900">JasaKu</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Selamat Datang Kembali</h2>
              <p className="text-gray-600">Masuk ke akun Anda untuk melanjutkan</p>
            </div>

            <form action={loginAction} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input id="email" type="email" name="email" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" placeholder="Masukkan email Anda" />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input id="password" name="password" type="password" required className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" placeholder="Masukkan password Anda" />
                  <button type="button" id="togglePasswordButton" className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    <i className="fas fa-eye" id="eyeIcon" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" name="remember" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                  <span className="ml-2 text-sm text-gray-600">Ingat saya</span>
                </label>
                <a href="/forgot_password" className="text-sm text-blue-600 hover:text-blue-700">
                  Lupa password?
                </a>
              </div>

              <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 font-semibold">
                <i className="fas fa-sign-in-alt mr-2" />Masuk
              </button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">atau</span>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <button type="button" className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" className="w-5 h-5 mr-3" />
                <span className="text-gray-700 font-medium">Masuk dengan Google</span>
              </button>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Belum punya akun?{" "}
                <a href="/register" className="text-blue-600 hover:text-blue-700 font-semibold">
                  Daftar sekarang
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageChrome>
  );
}
