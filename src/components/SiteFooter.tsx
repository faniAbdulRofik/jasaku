export function SiteFooter() {
  return (
    <>
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-4">
              <a href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <i className="fas fa-search text-white text-sm" />
                </div>
                <span className="font-bold text-xl text-white">JasaKu</span>
              </a>
              <p className="text-gray-400 max-w-sm">
                Platform terpercaya untuk menemukan dan memesan berbagai jasa profesional di Indonesia.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <i className="fab fa-facebook-f" />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <i className="fab fa-twitter" />
                </a>
                <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                  <i className="fab fa-instagram" />
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-white font-semibold text-lg">Tautan Cepat</h3>
              <ul className="space-y-2">
                <li><a href="/" className="text-gray-400 hover:text-white transition-colors">Beranda</a></li>
                <li><a href="/search.php" className="text-gray-400 hover:text-white transition-colors">Cari Jasa</a></li>
                <li><a href="/register.php?role=provider" className="text-gray-400 hover:text-white transition-colors">Jadi Provider</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Tentang Kami</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-white font-semibold text-lg">Kategori</h3>
              <ul className="space-y-2">
                <li><a href="/search.php?category=1" className="text-gray-400 hover:text-white transition-colors">Cleaning</a></li>
                <li><a href="/search.php?category=2" className="text-gray-400 hover:text-white transition-colors">Repair</a></li>
                <li><a href="/search.php?category=3" className="text-gray-400 hover:text-white transition-colors">Beauty</a></li>
                <li><a href="/search.php?category=4" className="text-gray-400 hover:text-white transition-colors">Tutoring</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-white font-semibold text-lg">Kontak</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <i className="fas fa-envelope text-blue-400" />
                  <span>info@jasaku.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <i className="fas fa-phone text-blue-400" />
                  <span>+62 812-3456-7890</span>
                </div>
                <div className="flex items-center space-x-3">
                  <i className="fas fa-map-marker-alt text-blue-400" />
                  <span>Jakarta, Indonesia</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">&copy; {new Date().getFullYear()} JasaKu. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Kebijakan Privasi</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Syarat & Ketentuan</a>
            </div>
          </div>
        </div>
      </footer>

      <button className="btn btn-primary btn-floating" id="backToTop" style={{ display: "none" }}>
        <i className="fas fa-arrow-up" />
      </button>
    </>
  );
}
