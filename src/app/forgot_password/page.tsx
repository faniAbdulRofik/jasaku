import { PageChrome } from "@/components/PageChrome";
import { requestPasswordResetAction } from "@/lib/actions";

export const dynamic = "force-dynamic";
type PageProps = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function ForgotPasswordPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const hasSuccess = Boolean(params.success);

  return (
    <PageChrome searchParams={params}>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card shadow">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <h2 className="fw-bold text-primary">
                    <i className="fas fa-key me-2" />Lupa Password
                  </h2>
                  <p className="text-muted">Masukkan email Anda untuk reset password</p>
                </div>

                {!hasSuccess && (
                  <form action={requestPasswordResetAction}>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="fas fa-envelope" />
                        </span>
                        <input type="email" className="form-control" id="email" name="email" placeholder="Masukkan email Anda" required />
                      </div>
                    </div>

                    <div className="d-grid">
                      <button type="submit" className="btn btn-primary btn-lg">
                        <i className="fas fa-paper-plane me-2" />Kirim Link Reset
                      </button>
                    </div>
                  </form>
                )}

                <hr className="my-4" />

                <div className="text-center">
                  <p className="mb-0">
                    Ingat password Anda?{" "}
                    <a href="/login" className="text-decoration-none fw-bold">
                      Login di sini
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageChrome>
  );
}
