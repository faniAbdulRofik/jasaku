import { PageChrome } from "@/components/PageChrome";
import { resetPasswordAction } from "@/lib/actions";

export const dynamic = "force-dynamic";
type PageProps = { searchParams: Promise<Record<string, string | string[] | undefined>> };
function single(value: string | string[] | undefined) { return Array.isArray(value) ? value[0] : value; }

export default async function ResetPasswordPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const token = single(params.token) || "";
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
                    <i className="fas fa-lock me-2" />Reset Password
                  </h2>
                  <p className="text-muted">Buat password baru untuk akun Anda</p>
                </div>

                {token && !hasSuccess && (
                  <>
                    <div className="alert alert-info">
                      <i className="fas fa-user me-2" />
                      Reset password untuk: <strong>token aktif</strong>
                    </div>

                    <form action={resetPasswordAction}>
                      <input type="hidden" name="token" value={token} />
                      <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password Baru</label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <i className="fas fa-lock" />
                          </span>
                          <input type="password" className="form-control" id="password" name="password" placeholder="Minimal 6 karakter" required />
                          <button className="btn btn-outline-secondary" type="button" id="togglePasswordButton">
                            <i className="fas fa-eye" id="eyeIcon" />
                          </button>
                        </div>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="confirm_password" className="form-label">Konfirmasi Password</label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <i className="fas fa-lock" />
                          </span>
                          <input type="password" className="form-control" id="confirm_password" name="confirm_password" placeholder="Ulangi password baru" required />
                          <button className="btn btn-outline-secondary" type="button" id="toggleConfirmPasswordButton">
                            <i className="fas fa-eye" id="confirmEyeIcon" />
                          </button>
                        </div>
                      </div>

                      <div className="d-grid">
                        <button type="submit" className="btn btn-primary btn-lg">
                          <i className="fas fa-save me-2" />Reset Password
                        </button>
                      </div>
                    </form>
                  </>
                )}

                {!token && (
                  <div className="alert alert-danger">
                    <i className="fas fa-exclamation-circle me-2" />
                    Token reset password tidak valid
                  </div>
                )}

                <hr className="my-4" />

                <div className="text-center">
                  <p className="mb-0">
                    <a href="/login.php" className="text-decoration-none fw-bold">
                      <i className="fas fa-arrow-left me-2" />Kembali ke Login
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
