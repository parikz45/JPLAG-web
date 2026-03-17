"use client"

import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { X } from "lucide-react"

export function ToastProvider({ children }) {
    return (
        <ToastPrimitives.Provider swipeDirection="right">
            {children}
        </ToastPrimitives.Provider>
    )
}

export const ToastViewport = React.forwardRef(function ToastViewport(props, ref) {
    return (
        <ToastPrimitives.Viewport
            ref={ref}
            className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 w-[350px] max-w-[100vw]"
            {...props}
        />
    )
})

export const Toast = React.forwardRef(function Toast(
    { variant = "default", children, ...props },
    ref
) {

    const variants = {
        default: "border bg-background",
        success: "border-green-500 bg-green-50 dark:bg-green-950",
        error: "border-red-500 bg-red-50 dark:bg-red-950"
    }

    return (
        <ToastPrimitives.Root
            ref={ref}
            className={`relative flex items-start gap-3 rounded-md p-4 shadow-lg ${variants[variant]}`}
            {...props}
        >
            {children}
        </ToastPrimitives.Root>
    )
})

export const ToastTitle = React.forwardRef(function ToastTitle(props, ref) {
    return (
        <ToastPrimitives.Title
            ref={ref}
            className="text-sm font-semibold"
            {...props}
        />
    )
})

export const ToastDescription = React.forwardRef(function ToastDescription(
    props,
    ref
) {
    return (
        <ToastPrimitives.Description
            ref={ref}
            className="text-sm text-muted-foreground"
            {...props}
        />
    )
})

export const ToastClose = React.forwardRef(function ToastClose(props, ref) {
    return (
        <ToastPrimitives.Close
            ref={ref}
            className="absolute right-2 top-2 opacity-70 hover:opacity-100"
            {...props}
        >
            <X className="h-4 w-4" />
        </ToastPrimitives.Close>
    )
})