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

export default function History() {

    const [runs, setRuns] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchRuns = async () => {

        try {
            const res = await fetch("http://localhost:5000/api/history")
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

    const openReport = (run) => {
        const url = `http://localhost:5000/reports/${run.path}/index.html`
        window.open(url, "_blank")
    }

    return (

        <div className="flex min-h-screen w-full">

            <AppSidebar />

            <SidebarInset className="p-8">

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

                                <div className="text-muted-foreground">
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
                                                        onClick={() => openReport(run)}
                                                    >
                                                        Open Report
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