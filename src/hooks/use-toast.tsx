import { useState, useCallback } from "react"

type ToastVariant = "default" | "success" | "error" | "warning" | "destructive"

interface ToastMessage {
  id: number
  title: string
  description?: string
  variant?: ToastVariant
}

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const toast = useCallback(
    ({ title, description, variant = "default" }: Omit<ToastMessage, "id">) => {
      const id = Date.now()
      const newToast = { id, title, description, variant }
      setToasts((prev) => [...prev, newToast])

      // Auto remove after 3s
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
      }, 3000)
    },
    [],
  )

  const ToastContainer = () => (
    <div className="fixed top-4 right-4 space-y-3 z-[9999]">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`p-4 rounded-lg shadow-lg border text-sm transition-all duration-300 animate-fade-in-down
            ${
              t.variant === "success"
                ? "bg-green-50 border-green-500 text-green-700"
                : t.variant === "error"
                ? "bg-red-50 border-red-500 text-red-700"
                : t.variant === "warning"
                ? "bg-yellow-50 border-yellow-500 text-yellow-700"
                : "bg-gray-50 border-gray-300 text-gray-800"
            }`}
        >
          <strong className="block font-semibold">{t.title}</strong>
          {t.description && <p className="text-xs mt-1">{t.description}</p>}
        </div>
      ))}
    </div>
  )

  return { toast, ToastContainer }
}
