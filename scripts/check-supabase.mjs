import fs from "node:fs";
import { createClient } from "@supabase/supabase-js";

const env = Object.fromEntries(
  fs
    .readFileSync(".env.local", "utf8")
    .split(/\r?\n/)
    .filter((line) => line.trim() && !line.trim().startsWith("#") && line.includes("="))
    .map((line) => {
      const index = line.indexOf("=");
      return [line.slice(0, index), line.slice(index + 1).replace(/^['"]|['"]$/g, "")];
    }),
);

const url = env.NEXT_PUBLIC_SUPABASE_URL;
const key =
  env.SUPABASE_SERVICE_ROLE_KEY ||
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!url || !key) {
  console.log(JSON.stringify({ ok: false, hasUrl: Boolean(url), hasKey: Boolean(key) }, null, 2));
  process.exit(0);
}

const supabase = createClient(url, key, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

const tables = {};
const projectRef = url.match(/^https:\/\/([^.]+)\.supabase\.co/)?.[1] || null;

for (const table of ["users", "categories", "services", "bookings", "reviews"]) {
  const { count, error } = await supabase.from(table).select("id", { count: "exact", head: true });
  tables[table] = error ? { ok: false, message: error.message } : { ok: true, count };
}

const { data, error } = await supabase
  .from("services")
  .select("id, category:categories(name), provider:users!services_provider_id_fkey(full_name)")
  .limit(1);

console.log(
  JSON.stringify(
    {
      ok: true,
      projectRef,
      hasServiceRoleKey: Boolean(env.SUPABASE_SERVICE_ROLE_KEY),
      tables,
      relation: error ? { ok: false, message: error.message } : { ok: true, rows: data?.length || 0 },
      hint:
        !env.SUPABASE_SERVICE_ROLE_KEY &&
        Object.values(tables).every((table) => table.ok && table.count === 0)
          ? "Semua tabel terbaca 0 memakai publishable/anon key. Kalau data ada di Supabase dashboard, kemungkinan RLS aktif. Tambahkan SUPABASE_SERVICE_ROLE_KEY ke .env.local lalu restart Next.js."
          : null,
    },
    null,
    2,
  ),
);
