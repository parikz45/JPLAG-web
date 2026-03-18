import { useState } from "react"

import { SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

import {
    Card,
    CardHeader,
    CardTitle,
    CardContent
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useJplag } from "../../context/jplagContext"
import {
    ToastProvider,
    Toast,
    ToastTitle,
    ToastDescription,
    ToastViewport,
    ToastClose
} from "@/components/ui/local-toast"

import ThemeToggle from "../themetoggle/Themetoggle"

const API = "https://jplag.onrender.com"

export default function Dashboard() {

    const [toastOpen, setToastOpen] = useState(false)
    const [toastData, setToastData] = useState({
        title: "",
        description: "",
        variant: "default"
    })
    const [running, setRunning] = useState(false)
    const [jarFile, setJarFile] = useState(null)
    const [submissions, setSubmissions] = useState([])

    const { config } = useJplag()

    const handleJarUpload = (e) => {
        setJarFile(e.target.files[0])
    }

    const handleSubmissions = (e) => {
        setSubmissions(Array.from(e.target.files))
    }

    const removeJar = () => setJarFile(null)

    const removeSubmissions = () => setSubmissions([])

    const openViewer = () => {
        window.open("https://jplag.github.io/JPlag/", "_blank")
    }

    const handleRun = async () => {

        if (!jarFile || submissions.length === 0) {
            alert("Jar file and submissions required")
            return
        }

        setRunning(true)

        try {
            const formData = new FormData()
            formData.append("jar", jarFile)
            formData.append("config", JSON.stringify(config))

            submissions.forEach(file =>
                formData.append("submissions", file)
            )

            const res = await fetch(`${API}/api/run`, {
                method: "POST",
                body: formData
            })

            if (!res.ok) throw new Error("Run failed")

            const data = await res.json()

            if (data.success) {

                const zipUrl = `${API}/reports/${data.zip}`

                // force download
                const link = document.createElement("a")
                link.href = zipUrl
                link.download = data.zip
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)

                setToastData({
                    title: "Report Downloaded",
                    description: "Upload the ZIP in JPlag viewer to see the results.",
                    variant: "success"
                })

                setToastOpen(true)
            }

        }
        catch (err) {
            console.error(err)
            setToastData({
                title: "JPlag Run Failed",
                description: "Something went wrong while executing JPlag.",
                variant: "error"
            })

            setToastOpen(true)
        }
        finally {
            setRunning(false)
        }
    }

    return (
        <div className="flex min-h-screen w-full">
            <AppSidebar />

            <SidebarInset className="p-12 space-y-8">

                {/* Header */}

                <div className="relative flex items-center justify-center">

                    <h1 className="text-3xl font-bold">
                        JPlag Runner
                    </h1>

                    <div className="absolute right-0 flex gap-2 ">
                        <Button
                            variant="outline"
                            onClick={openViewer}
                            className="cursor-pointer"
                        >
                            Open JPlag Viewer
                        </Button>

                        <ThemeToggle />
                    </div>

                </div>

                <div className="flex justify-center">

                    <div className="w-full max-w-4xl">

                        <Card>

                            <CardHeader>
                                <CardTitle>
                                    Run JPlag Analysis
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="space-y-8">

                                {/* Jar Upload */}

                                <div className="space-y-3">

                                    <Label>Upload JPlag Jar *</Label>

                                    <label className="flex flex-col items-center justify-center border border-dashed rounded-lg p-6 cursor-pointer hover:bg-muted transition">

                                        <span className="text-sm text-muted-foreground">
                                            Click to upload JPlag jar
                                        </span>

                                        <input
                                            type="file"
                                            accept=".jar"
                                            className="hidden"
                                            onChange={handleJarUpload}
                                        />

                                    </label>

                                    {jarFile && (

                                        <div className="flex items-center justify-between border rounded-md px-4 py-2">

                                            <span className="text-sm">
                                                📦 {jarFile.name}
                                            </span>

                                            <button
                                                onClick={removeJar}
                                                className="text-red-500 text-sm cursor-pointer"
                                            >
                                                ✕
                                            </button>

                                        </div>

                                    )}

                                </div>

                                <Separator />

                                {/* Submissions */}

                                <div className="space-y-3">

                                    <Label>Upload Submissions Folder *</Label>

                                    <label className="flex flex-col items-center justify-center border border-dashed rounded-lg p-8 cursor-pointer hover:bg-muted transition">

                                        <span className="text-sm text-muted-foreground">
                                            Click to upload submissions folder
                                        </span>

                                        <input
                                            type="file"
                                            webkitdirectory
                                            multiple
                                            className="hidden"
                                            onChange={handleSubmissions}
                                        />

                                    </label>

                                    {submissions.length > 0 && (

                                        <div className="flex items-center justify-between border rounded-md px-4 py-2">

                                            <span className="text-sm">
                                                📁 {submissions.length} files selected
                                            </span>

                                            <button
                                                onClick={removeSubmissions}
                                                className="text-red-500 text-sm cursor-pointer"
                                            >
                                                ✕
                                            </button>

                                        </div>

                                    )}

                                </div>

                                <Separator />

                                {/* Run */}

                                <Button
                                    onClick={handleRun}
                                    disabled={running || !jarFile || submissions.length === 0}
                                    className={`w-full ${running || !jarFile || submissions.length === 0
                                        ? "cursor-not-allowed"
                                        : "cursor-pointer"
                                        }`}
                                >

                                    {running ? "Running JPlag..." : "Run JPlag"}

                                </Button>

                                {running && (

                                    <div className="flex items-center gap-2 text-muted-foreground text-sm">

                                        <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full"></div>

                                        Running plagiarism detection (This may take a few seconds)

                                    </div>

                                )}

                            </CardContent>

                        </Card>

                    </div>

                </div>

            </SidebarInset>
            <ToastProvider>
                <Toast
                    open={toastOpen}
                    onOpenChange={setToastOpen}
                    variant={toastData.variant}
                >

                    <div className="grid gap-1">

                        <ToastTitle>{toastData.title}</ToastTitle>

                        <ToastDescription>
                            {toastData.description}
                        </ToastDescription>

                    </div>

                    <ToastClose />

                </Toast>

                <ToastViewport />

            </ToastProvider>
        </div>

    )

}