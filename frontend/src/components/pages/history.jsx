import { useEffect, useState } from "react"

import { SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

import {
    Card,
    CardHeader,
    CardTitle,
    CardContent
} from "@/components/ui/card"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import ThemeToggle from "../themetoggle/Themetoggle"

const API = "https://jplag.onrender.com"

export default function History() {

    const [runs, setRuns] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchRuns = async () => {

        try {
            const res = await fetch(`${API}/api/history`)
            const data = await res.json()
            setRuns(data)
            setLoading(false)

        } catch (err) {
            console.error(err)
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchRuns()
    }, [])

    const downloadReport = (run) => {

        const url = `${API}/reports/${run.zip}`

        const link = document.createElement("a")
        link.href = url
        link.download = run.zip

        document.body.appendChild(link)
        link.click()

        document.body.removeChild(link)

    }

    return (

        <div className="flex min-h-screen w-full">

            <AppSidebar />

            <SidebarInset className="p-8 flex items-center">

                <div className="w-full max-w-6xl space-y-6">

                    {/* Header */}

                    <div className="flex justify-between items-center">

                        <h1 className="text-3xl font-bold">
                            Run History
                        </h1>

                        <ThemeToggle />

                    </div>

                    {/* History Table */}

                    <Card>

                        <CardHeader>

                            <CardTitle>
                                Previous JPlag Runs
                            </CardTitle>

                        </CardHeader>

                        <CardContent>

                            {loading ? (

                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full"></div>
                                    Loading runs...
                                </div>

                            ) : runs.length === 0 ? (

                                <div className="text-muted-foreground">
                                    No runs found
                                </div>

                            ) : (

                                <Table>

                                    <TableHeader>

                                        <TableRow>

                                            <TableHead>ID</TableHead>

                                            <TableHead>Language</TableHead>

                                            <TableHead>Timestamp</TableHead>

                                            <TableHead className="text-right">
                                                Report
                                            </TableHead>

                                        </TableRow>

                                    </TableHeader>

                                    <TableBody>

                                        {runs.map((run) => (

                                            <TableRow key={run.id}>

                                                <TableCell className="font-medium">

                                                    #{run.id}

                                                </TableCell>

                                                <TableCell>

                                                    <Badge variant="secondary">

                                                        {run.language}

                                                    </Badge>

                                                </TableCell>

                                                <TableCell>

                                                    {new Date(run.timestamp).toLocaleString()}

                                                </TableCell>

                                                <TableCell className="text-right">

                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => downloadReport(run)}
                                                    >
                                                        Download ZIP
                                                    </Button>

                                                </TableCell>

                                            </TableRow>

                                        ))}
                                    </TableBody>
                                </Table>
                            )}

                        </CardContent>
                    </Card>
                </div>
            </SidebarInset>
        </div>

    )
}