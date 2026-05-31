"use server";

import bcrypt from "bcryptjs";
import crypto from "crypto";
import fs from "fs/promises";
import path from "path";
import { redirect } from "next/navigation";
import { getBookingById } from "./data";
import { clearSessionUser, getSessionUser, setSessionUser } from "./session";
import { supabaseAdmin } from "./supabase";
import type { UserRole } from "./types";

function encodeMessage(message: string) {
  return encodeURIComponent(message);
}

function normalizeBcryptHash(hash: string) {
  return hash.replace(/^\$2y\$/, "$2a$");
}

function roleRedirect(role: UserRole) {
  if (role === "admin") return "/admin/dashboard.php";
  if (role === "provider") return "/provider/dashboard.php";
  return "/customer/dashboard.php";
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function uploadImage(file: File | null, prefix: string) {
  if (!file || file.size === 0) return null;

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const filename = `${prefix}_${Date.now()}_${safeName}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  const supabase = supabaseAdmin();

  if (supabase) {
    const bucket = process.env.SUPABASE_STORAGE_BUCKET || "jasaku";
    const objectPath = `assets/images/${filename}`;
    const { error } = await supabase.storage.from(bucket).upload(objectPath, buffer, {
      contentType: file.type || "application/octet-stream",
      upsert: true,
    });

    if (!error) {
      const { data } = supabase.storage.from(bucket).getPublicUrl(objectPath);
      return data.publicUrl;
    }
  }

  const target = path.join(process.cwd(), "public", "assets", "images", filename);
  await fs.writeFile(target, buffer);
  return filename;
}

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const supabase = supabaseAdmin();

  if (!email || !password) {
    redirect(`/login.php?error=${encodeMessage("Email dan password wajib diisi")}`);
  }

  if (!supabase) {
    redirect(`/login.php?error=${encodeMessage("Supabase belum dikonfigurasi")}`);
  }

  const { data: user } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .eq("status", "active")
    .maybeSingle();

  if (!user || !user.password) {
    redirect(`/login.php?error=${encodeMessage("Email atau password salah")}`);
  }

  const ok = await bcrypt.compare(password, normalizeBcryptHash(user.password));
  if (!ok) {
    redirect(`/login.php?error=${encodeMessage("Email atau password salah")}`);
  }

  await supabase.from("users").update({ updated_at: new Date().toISOString() }).eq("id", user.id);
  await setSessionUser({
    id: Number(user.id),
    username: user.username,
    email: user.email,
    full_name: user.full_name,
    role: user.role,
    profile_image: user.profile_image || "default-profile.jpg",
  });

  redirect(roleRedirect(user.role));
}

export async function registerAction(formData: FormData) {
  const supabase = supabaseAdmin();
  const username = String(formData.get("username") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const confirmPassword = String(formData.get("confirm_password") || "");
  const fullName = String(formData.get("full_name") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const address = String(formData.get("address") || "").trim();
  const role = String(formData.get("role") || "customer") === "provider" ? "provider" : "customer";
  const roleQuery = `role=${role}`;

  if (!supabase) {
    redirect(`/register.php?${roleQuery}&error=${encodeMessage("Supabase belum dikonfigurasi")}`);
  }

  if (!username || !email || !password || !fullName) {
    redirect(`/register.php?${roleQuery}&error=${encodeMessage("Username, email, password, dan nama lengkap wajib diisi")}`);
  }

  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    redirect(`/register.php?${roleQuery}&error=${encodeMessage("Username hanya boleh mengandung huruf, angka, dan underscore")}`);
  }

  if (password.length < 6) {
    redirect(`/register.php?${roleQuery}&error=${encodeMessage("Password minimal 6 karakter")}`);
  }

  if (password !== confirmPassword) {
    redirect(`/register.php?${roleQuery}&error=${encodeMessage("Password dan konfirmasi password tidak sama")}`);
  }

  const { data: existing } = await supabase.from("users").select("id").eq("email", email).maybeSingle();
  if (existing) {
    redirect(`/register.php?${roleQuery}&error=${encodeMessage("Email sudah terdaftar")}`);
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const now = new Date().toISOString();
  const verificationToken = crypto.randomUUID().replaceAll("-", "");

  const { error } = await supabase.from("users").insert({
    username,
    email,
    password: hashedPassword,
    full_name: fullName,
    phone,
    address,
    role,
    status: "active",
    profile_image: "default-profile.jpg",
    verification_token: verificationToken,
    created_at: now,
    updated_at: now,
  });

  if (error) {
    redirect(`/register.php?${roleQuery}&error=${encodeMessage(error.message)}`);
  }

  redirect(`/register.php?${roleQuery}&success=${encodeMessage("Registrasi berhasil! Silakan login untuk melanjutkan.")}`);
}

export async function requestPasswordResetAction(formData: FormData) {
  const supabase = supabaseAdmin();
  const email = String(formData.get("email") || "").trim();

  if (!supabase) redirect(`/forgot_password.php?error=${encodeMessage("Supabase belum dikonfigurasi")}`);
  if (!email) redirect(`/forgot_password.php?error=${encodeMessage("Email wajib diisi")}`);

  const { data: user } = await supabase.from("users").select("email,full_name").eq("email", email).maybeSingle();
  if (!user) {
    redirect(`/forgot_password.php?success=${encodeMessage("Jika email terdaftar, link reset akan disiapkan.")}`);
  }

  const token = crypto.randomUUID().replaceAll("-", "");
  await supabase.from("password_reset_tokens").upsert({
    email,
    token,
    created_at: new Date().toISOString(),
  });

  redirect(`/forgot_password.php?success=${encodeMessage(`Link reset siap: /reset_password.php?token=${token}`)}`);
}

export async function resetPasswordAction(formData: FormData) {
  const supabase = supabaseAdmin();
  const token = String(formData.get("token") || "");
  const password = String(formData.get("password") || "");
  const confirmPassword = String(formData.get("confirm_password") || "");

  if (!supabase) redirect(`/reset_password.php?token=${token}&error=${encodeMessage("Supabase belum dikonfigurasi")}`);
  if (!token || !password || password.length < 6 || password !== confirmPassword) {
    redirect(`/reset_password.php?token=${token}&error=${encodeMessage("Password baru tidak valid")}`);
  }

  const { data: reset } = await supabase.from("password_reset_tokens").select("*").eq("token", token).maybeSingle();
  if (!reset) redirect(`/reset_password.php?error=${encodeMessage("Token reset tidak valid")}`);

  await supabase.from("users").update({ password: await bcrypt.hash(password, 12), updated_at: new Date().toISOString() }).eq("email", reset.email);
  await supabase.from("password_reset_tokens").delete().eq("email", reset.email);
  redirect("/login.php?success=Password berhasil direset");
}

export async function logoutAction() {
  await clearSessionUser();
  redirect("/login.php?success=Logout berhasil");
}

export async function createBookingAction(formData: FormData) {
  const supabase = supabaseAdmin();
  const user = await getSessionUser();
  const serviceId = Number(formData.get("service_id"));
  const bookingDate = String(formData.get("booking_date") || "");
  const bookingTime = String(formData.get("booking_time") || "");
  const notes = String(formData.get("notes") || "");

  if (!user || user.role !== "customer") {
    redirect("/login.php?error=Anda harus login sebagai customer untuk melakukan booking");
  }

  if (!supabase) {
    redirect(`/service_detail.php?id=${serviceId}&error=${encodeMessage("Supabase belum dikonfigurasi")}`);
  }

  if (!bookingDate || !bookingTime) {
    redirect(`/service_detail.php?id=${serviceId}&error=${encodeMessage("Tanggal dan waktu booking harus diisi")}`);
  }

  const { data: service } = await supabase.from("services").select("*").eq("id", serviceId).maybeSingle();
  if (!service) {
    redirect(`/search.php?error=${encodeMessage("Layanan tidak ditemukan")}`);
  }

  const now = new Date().toISOString();
  const { error } = await supabase.from("bookings").insert({
    booking_code: `BK${Date.now()}`,
    customer_id: user.id,
    provider_id: service.provider_id,
    service_id: serviceId,
    booking_date: bookingDate,
    booking_time: bookingTime,
    total_price: service.price,
    notes,
    status: "pending",
    payment_status: "pending",
    created_at: now,
    updated_at: now,
  });

  if (error) {
    redirect(`/service_detail.php?id=${serviceId}&error=${encodeMessage(error.message)}`);
  }

  redirect("/customer/bookings.php?success=Booking berhasil dibuat!");
}

export async function updateBookingStatusAction(formData: FormData) {
  const supabase = supabaseAdmin();
  const user = await getSessionUser();
  const id = Number(formData.get("id"));
  const status = String(formData.get("status") || "pending");
  const returnTo = String(formData.get("return_to") || "");

  if (!supabase || !user) {
    redirect("/login.php?error=Anda harus login terlebih dahulu");
  }

  const booking = await getBookingById(id);
  if (!booking) {
    redirect(`${returnTo || "/"}?error=Booking tidak ditemukan`);
  }

  if (user.role === "provider" && booking.provider_id !== user.id) {
    redirect("/provider/bookings.php?error=Anda tidak memiliki akses ke booking ini");
  }

  if (user.role === "customer" && booking.customer_id !== user.id) {
    redirect("/customer/bookings.php?error=Anda tidak memiliki akses ke booking ini");
  }

  const updates: Record<string, string | null> = {
    status,
    updated_at: new Date().toISOString(),
  };
  if (status === "completed") updates.completed_at = new Date().toISOString();

  await supabase.from("bookings").update(updates).eq("id", id);
  redirect(`${returnTo || roleRedirect(user.role)}?success=Status booking berhasil diperbarui`);
}

export async function saveReviewAction(formData: FormData) {
  const supabase = supabaseAdmin();
  const user = await getSessionUser();
  const bookingId = Number(formData.get("booking_id"));
  const rating = Number(formData.get("rating"));
  const comment = String(formData.get("comment") || "").trim();

  if (!supabase || !user || user.role !== "customer") {
    redirect("/login.php?error=Anda harus login sebagai customer");
  }

  const booking = await getBookingById(bookingId);
  if (!booking || booking.customer_id !== user.id || booking.status !== "completed") {
    redirect("/customer/reviews.php?error=Booking tidak valid untuk review");
  }

  if (rating < 1 || rating > 5) {
    redirect("/customer/reviews.php?error=Rating wajib dipilih");
  }

  const now = new Date().toISOString();
  const { error } = await supabase.from("reviews").insert({
    booking_id: booking.id,
    customer_id: booking.customer_id,
    provider_id: booking.provider_id,
    service_id: booking.service_id,
    rating,
    comment,
    status: "active",
    created_at: now,
    updated_at: now,
  });

  if (error) redirect(`/customer/reviews.php?error=${encodeMessage(error.message)}`);
  redirect("/customer/reviews.php?success=Review berhasil dikirim");
}

export async function saveServiceAction(formData: FormData) {
  const supabase = supabaseAdmin();
  const user = await getSessionUser();
  const id = Number(formData.get("id") || 0);
  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const categoryId = Number(formData.get("category_id"));
  const providerId = Number(formData.get("provider_id") || user?.id || 0);
  const price = Number(formData.get("price") || 0);
  const duration = String(formData.get("duration") || "").trim();
  const location = String(formData.get("location") || "").trim();
  const status = String(formData.get("status") || "active");
  const returnTo = String(formData.get("return_to") || "/provider/services.php");

  if (!supabase || !user) {
    redirect("/login.php?error=Anda harus login terlebih dahulu");
  }

  if (user.role !== "provider" && user.role !== "admin") {
    redirect("/?error=Anda tidak memiliki akses");
  }

  if (!title || !description || !categoryId || !providerId || !price || !location) {
    redirect(`${returnTo}?error=Data layanan wajib diisi lengkap`);
  }

  const uploaded = await uploadImage(formData.get("image") as File | null, "service");
  const now = new Date().toISOString();
  const payload: Record<string, string | number | null> = {
    provider_id: providerId,
    category_id: categoryId,
    title,
    slug: slugify(title),
    description,
    price,
    duration,
    location,
    status,
    updated_at: now,
  };

  if (uploaded) payload.image = uploaded;

  if (id) {
    let query = supabase.from("services").update(payload).eq("id", id);
    if (user.role === "provider") query = query.eq("provider_id", user.id);
    const { error } = await query;
    if (error) redirect(`${returnTo}?error=${encodeMessage(error.message)}`);
  } else {
    const { error } = await supabase.from("services").insert({
      ...payload,
      image: uploaded || "default-service.jpg",
      rating: 0,
      total_reviews: 0,
      total_bookings: 0,
      price_type: "fixed",
      created_at: now,
    });
    if (error) redirect(`${returnTo}?error=${encodeMessage(error.message)}`);
  }

  redirect(`${returnTo}?success=Layanan berhasil disimpan`);
}

export async function deleteServiceAction(formData: FormData) {
  const supabase = supabaseAdmin();
  const user = await getSessionUser();
  const id = Number(formData.get("id"));
  const returnTo = String(formData.get("return_to") || "/provider/services.php");

  if (!supabase || !user) redirect("/login.php?error=Anda harus login terlebih dahulu");
  let query = supabase.from("services").delete().eq("id", id);
  if (user.role === "provider") query = query.eq("provider_id", user.id);
  await query;
  redirect(`${returnTo}?success=Layanan berhasil dihapus`);
}

export async function saveProfileAction(formData: FormData) {
  const supabase = supabaseAdmin();
  const user = await getSessionUser();
  const returnTo = String(formData.get("return_to") || "/customer/settings.php");

  if (!supabase || !user) redirect("/login.php?error=Anda harus login terlebih dahulu");

  const uploaded = await uploadImage(formData.get("profile_image") as File | null, "user");
  const payload: Record<string, string> = {
    full_name: String(formData.get("full_name") || "").trim(),
    email: String(formData.get("email") || "").trim(),
    phone: String(formData.get("phone") || "").trim(),
    address: String(formData.get("address") || "").trim(),
    updated_at: new Date().toISOString(),
  };
  if (uploaded) payload.profile_image = uploaded;

  const newPassword = String(formData.get("new_password") || "");
  const confirmPassword = String(formData.get("confirm_password") || "");
  if (newPassword) {
    if (newPassword.length < 6 || newPassword !== confirmPassword) {
      redirect(`${returnTo}?error=Password baru tidak valid`);
    }
    payload.password = await bcrypt.hash(newPassword, 12);
  }

  await supabase.from("users").update(payload).eq("id", user.id);
  await setSessionUser({ ...user, full_name: payload.full_name, email: payload.email, profile_image: payload.profile_image || user.profile_image });
  redirect(`${returnTo}?success=Pengaturan berhasil disimpan`);
}

export async function adminSaveUserAction(formData: FormData) {
  const supabase = supabaseAdmin();
  const user = await getSessionUser();
  const id = Number(formData.get("id") || 0);

  if (!supabase || user?.role !== "admin") redirect("/login.php?error=Anda tidak memiliki akses admin");

  const payload: Record<string, string> = {
    username: String(formData.get("username") || "").trim(),
    full_name: String(formData.get("full_name") || "").trim(),
    email: String(formData.get("email") || "").trim(),
    phone: String(formData.get("phone") || "").trim(),
    address: String(formData.get("address") || "").trim(),
    role: String(formData.get("role") || "customer"),
    status: String(formData.get("status") || "active"),
    updated_at: new Date().toISOString(),
  };

  const password = String(formData.get("password") || "");
  if (password) payload.password = await bcrypt.hash(password, 12);

  if (id) {
    await supabase.from("users").update(payload).eq("id", id);
  } else {
    await supabase.from("users").insert({
      ...payload,
      password: payload.password || (await bcrypt.hash("password", 12)),
      profile_image: "default-profile.jpg",
      created_at: new Date().toISOString(),
    });
  }

  redirect("/admin/users.php?success=User berhasil disimpan");
}

export async function adminDeleteUserAction(formData: FormData) {
  const supabase = supabaseAdmin();
  const user = await getSessionUser();
  const id = Number(formData.get("id"));

  if (!supabase || user?.role !== "admin") redirect("/login.php?error=Anda tidak memiliki akses admin");
  await supabase.from("users").delete().eq("id", id);
  redirect("/admin/users.php?success=User berhasil dihapus");
}

export async function adminSaveCategoryAction(formData: FormData) {
  const supabase = supabaseAdmin();
  const user = await getSessionUser();
  const id = Number(formData.get("id") || 0);
  const name = String(formData.get("name") || "").trim();

  if (!supabase || user?.role !== "admin") redirect("/login.php?error=Anda tidak memiliki akses admin");
  if (!name) redirect(`/admin/categories.php?error=${encodeMessage("Nama kategori harus diisi!")}`);

  const payload = {
    name,
    slug: slugify(name),
    description: String(formData.get("description") || "").trim(),
    icon: String(formData.get("icon") || "fas fa-concierge-bell").trim(),
    status: String(formData.get("status") || "active"),
    updated_at: new Date().toISOString(),
  };

  if (id) {
    const { error } = await supabase.from("categories").update(payload).eq("id", id);
    if (error) redirect(`/admin/categories.php?error=${encodeMessage(error.code === "23505" ? "Nama kategori sudah ada!" : `Database error: ${error.message}`)}`);
  } else {
    const { error } = await supabase.from("categories").insert({ ...payload, created_at: new Date().toISOString() });
    if (error) redirect(`/admin/categories.php?error=${encodeMessage(error.code === "23505" ? "Nama kategori sudah ada!" : `Database error: ${error.message}`)}`);
  }

  redirect(`/admin/categories.php?success=${encodeMessage(id ? "Kategori berhasil disimpan" : "Kategori berhasil ditambahkan!")}`);
}

export async function adminDeleteCategoryAction(formData: FormData) {
  const supabase = supabaseAdmin();
  const user = await getSessionUser();
  const id = Number(formData.get("id"));

  if (!supabase || user?.role !== "admin") redirect("/login.php?error=Anda tidak memiliki akses admin");
  await supabase.from("categories").delete().eq("id", id);
  redirect("/admin/categories.php?success=Kategori berhasil dihapus");
}
