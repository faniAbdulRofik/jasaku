"use client";

import { useState } from "react";
import { createPortal } from "react-dom";

type ConfirmSubmitButtonProps = {
  message: string;
  className?: string;
  title?: string;
  children: React.ReactNode;
};

export function ConfirmSubmitButton({ message, className, title, children }: ConfirmSubmitButtonProps) {
  const [pendingForm, setPendingForm] = useState<HTMLFormElement | null>(null);
  const modal =
    pendingForm && typeof document !== "undefined"
      ? createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4 py-6">
            <button
              type="button"
              aria-label="Tutup konfirmasi"
              className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm"
              onClick={() => setPendingForm(null)}
            />
            <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl border border-gray-100">
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
                    <i className="fas fa-triangle-exclamation text-xl" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold text-gray-900">Konfirmasi Aksi</h3>
                    <p className="mt-2 whitespace-normal break-words text-sm leading-6 text-gray-600">{message}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col-reverse gap-3 border-t border-gray-100 bg-gray-50 px-6 py-4 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-100"
                  onClick={() => setPendingForm(null)}
                >
                  Batal
                </button>
                <button
                  type="button"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
                  onClick={() => {
                    const form = pendingForm;
                    setPendingForm(null);
                    setTimeout(() => form.requestSubmit(), 0);
                  }}
                >
                  Ya, Lanjutkan
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <button
        type="button"
        className={className}
        title={title}
        onClick={(event) => {
          setPendingForm(event.currentTarget.form);
        }}
      >
        {children}
      </button>

      {modal}
    </>
  );
}
