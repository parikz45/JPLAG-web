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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

import ThemeToggle from "../themetoggle/Themetoggle"

export default function Dashboard() {

    const [folder, setFolder] = useState("")
    const [running, setRunning] = useState(false)
    const [language, setLanguage] = useState("java")
    const [token, setToken] = useState(9)
    const [dragActive, setDragActive] = useState(false)

    const handleDragOver = (e) => {
        e.preventDefault()
        setDragActive(true)
    }

    const handleDragLeave = () => {
        setDragActive(false)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        setDragActive(false)

        const files = e.dataTransfer.files
        console.log("Dropped files:", files)
    }

    const handleRun = () => {
        setRunning(true)

        setTimeout(() => {
            setRunning(false)
        }, 5000)
    }

    return (

        <div className="flex min-h-screen w-full">

            <AppSidebar />

            <SidebarInset className="p-8 space-y-6">

                {/* Header */}
                <div className="relative flex items-center justify-center">

                    <h1 className="text-3xl font-bold">
                        JPlag Runner
                    </h1>

                    <div className="absolute right-0">
                        <ThemeToggle />
                    </div>

                </div>

                {/* Centered content */}
                <div className="flex justify-center">
                    <div className="w-full max-w-4xl space-y-6">

                        {/* Run Card */}
                        <Card>

                            <CardHeader>
                                <CardTitle>Run JPlag Analysis</CardTitle>
                            </CardHeader>

                            <CardContent className="space-y-6">

                                {/* Drag Drop */}
                                <div
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    className={`border-dashed border rounded-lg p-8 text-center flex flex-col items-center justify-center gap-3
    ${dragActive ? "bg-muted border-primary" : "text-muted-foreground"}
  `}
                                >
                                    <p>Drag & Drop submissions folder here</p>

                                    <span className="text-sm">or</span>

                                    <label className="cursor-pointer">

                                        <span className="px-4 py-2 border rounded-md bg-background hover:bg-muted transition">
                                            Choose Folder
                                        </span>

                                        <input
                                            type="file"
                                            webkitdirectory=""
                                            directory=""
                                            className="hidden"
                                        />

                                    </label>

                                </div>

                                <Separator />

                                {/* Folder Path */}
                                <div className="space-y-2">
                                    <Label>Or Enter Folder Path</Label>

                                    <Input
                                        placeholder="e.g. C:/submissions/assignment1"
                                        value={folder}
                                        onChange={(e) => setFolder(e.target.value)}
                                    />
                                </div>

                                <Separator />

                                <Button
                                    onClick={handleRun}
                                    disabled={running}
                                    className="w-full"
                                >
                                    {running ? "Running JPlag..." : "Run JPlag"}
                                </Button>

                                {running && (
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full"></div>
                                        Running plagiarism detection (30-60 seconds)
                                    </div>
                                )}

                            </CardContent>

                        </Card>

                        {/* Run History */}
                        <Card>

                            <CardHeader>
                                <CardTitle>Previous Runs</CardTitle>
                            </CardHeader>

                            <Card>

                                <CardHeader>
                                    <CardTitle>Previous Runs</CardTitle>
                                </CardHeader>

                                <CardContent className="divide-y">

                                    {/* Run */}
                                    <div className="flex items-center justify-between py-3">

                                        <div className="flex flex-col">
                                            <span className="font-medium">Run #12</span>

                                            <span className="text-sm text-muted-foreground">
                                                Java • 120 files • 2 min ago
                                            </span>
                                        </div>

                                        <Button size="sm" variant="outline">
                                            Open
                                        </Button>

                                    </div>

                                    {/* Run */}
                                    <div className="flex items-center justify-between py-3">

                                        <div className="flex flex-col">
                                            <span className="font-medium">Run #11</span>

                                            <span className="text-sm text-muted-foreground">
                                                Java • 98 files • 10 min ago
                                            </span>
                                        </div>

                                        <Button size="sm" variant="outline">
                                            Open
                                        </Button>

                                    </div>

                                    {/* Run */}
                                    <div className="flex items-center justify-between py-3">

                                        <div className="flex flex-col">
                                            <span className="font-medium">Run #10</span>

                                            <span className="text-sm text-muted-foreground">
                                                Python • 76 files • 1 hr ago
                                            </span>
                                        </div>

                                        <Button size="sm" variant="outline">
                                            Open
                                        </Button>

                                    </div>

                                </CardContent>

                            </Card>

                        </Card>

                    </div>
                </div>

            </SidebarInset>

        </div>
    )
}