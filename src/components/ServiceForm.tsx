import { saveServiceAction } from "@/lib/actions";
import type { Category, ServiceWithMeta, User } from "@/lib/types";

type ServiceFormProps = {
  categories: Category[];
  service?: ServiceWithMeta | null;
  providerId: number;
  providers?: User[];
  returnTo: string;
  isAdmin?: boolean;
};

export function ServiceForm({ categories, service, providerId, providers = [], returnTo, isAdmin = false }: ServiceFormProps) {
  return (
    <form action={saveServiceAction} className="p-6 space-y-6">
      <input type="hidden" name="id" value={service?.id || ""} />
      <input type="hidden" name="return_to" value={returnTo} />
      {!isAdmin && <input type="hidden" name="provider_id" value={providerId} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {isAdmin && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Provider</label>
            <select name="provider_id" defaultValue={service?.provider_id || providerId} className="w-full px-4 py-3 border border-gray-300 rounded-lg" required>
              {providers.map((provider) => (
                <option key={provider.id} value={provider.id}>{provider.full_name}</option>
              ))}
            </select>
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
          <select name="category_id" defaultValue={service?.category_id || ""} className="w-full px-4 py-3 border border-gray-300 rounded-lg" required>
            <option value="">Pilih kategori</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Judul Layanan</label>
          <input name="title" defaultValue={service?.title || ""} className="w-full px-4 py-3 border border-gray-300 rounded-lg" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Harga</label>
          <input type="number" name="price" defaultValue={service?.price || ""} className="w-full px-4 py-3 border border-gray-300 rounded-lg" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Durasi</label>
          <input name="duration" defaultValue={service?.duration || ""} className="w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="120" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Lokasi</label>
          <input name="location" defaultValue={service?.location || ""} className="w-full px-4 py-3 border border-gray-300 rounded-lg" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select name="status" defaultValue={service?.status || "active"} className="w-full px-4 py-3 border border-gray-300 rounded-lg">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Gambar</label>
          <input type="file" name="image" className="image-upload block w-full text-sm text-gray-600" accept="image/*" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi</label>
          <textarea name="description" defaultValue={service?.description || ""} rows={6} className="w-full px-4 py-3 border border-gray-300 rounded-lg" required />
        </div>
      </div>

      <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
        <i className="fas fa-save mr-2" />Simpan Layanan
      </button>
    </form>
  );
}
