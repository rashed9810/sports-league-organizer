"use client";

// Adapted from shadcn/ui toast component
// https://ui.shadcn.com/docs/components/toast

import { useState, useEffect } from "react";

type ToastProps = {
  message: string;
  type?: "default" | "success" | "error" | "warning";
  duration?: number;
};

type ToastState = {
  toasts: ToastProps[];
};

let toastState: ToastState = {
  toasts: [],
};

let listeners: Array<(state: ToastState) => void> = [];

const addToast = (toast: ToastProps) => {
  const id = Date.now();
  toastState = {
    toasts: [...toastState.toasts, { ...toast, id }],
  };
  listeners.forEach((listener) => listener(toastState));

  // Auto-dismiss
  setTimeout(() => {
    removeToast(id);
  }, toast.duration || 3000);

  return id;
};

const removeToast = (id: number) => {
  toastState = {
    toasts: toastState.toasts.filter((t: any) => t.id !== id),
  };
  listeners.forEach((listener) => listener(toastState));
};

export const toast = {
  success: (message: string, duration?: number) =>
    addToast({ message, type: "success", duration }),
  error: (message: string, duration?: number) =>
    addToast({ message, type: "error", duration }),
  warning: (message: string, duration?: number) =>
    addToast({ message, type: "warning", duration }),
  default: (message: string, duration?: number) =>
    addToast({ message, type: "default", duration }),
};

export const useToast = () => {
  const [state, setState] = useState<ToastState>(toastState);

  useEffect(() => {
    const listener = (newState: ToastState) => {
      setState(newState);
    };
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  }, []);

  return {
    toasts: state.toasts,
    toast,
    dismiss: removeToast,
  };
};

export const Toaster = () => {
  const { toasts, dismiss } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast: any) => (
        <div
          key={toast.id}
          className={`rounded-md px-6 py-4 shadow-md ${
            toast.type === "success"
              ? "bg-green-500 text-white"
              : toast.type === "error"
              ? "bg-red-500 text-white"
              : toast.type === "warning"
              ? "bg-yellow-500 text-white"
              : "bg-gray-800 text-white"
          }`}
        >
          <div className="flex items-center justify-between">
            <p>{toast.message}</p>
            <button
              onClick={() => dismiss(toast.id)}
              className="ml-4 text-white hover:text-gray-200"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
