import { useState } from "react"

import { SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select"

import ThemeToggle from "@/components/themetoggle/Themetoggle"

export default function AdvancedOptions() {

  const [language, setLanguage] = useState("java")
  const [minTokens, setMinTokens] = useState(9)
  const [similarity, setSimilarity] = useState(0)
  const [shownComparisons, setShownComparisons] = useState(2500)
  const [normalize, setNormalize] = useState(false)

  const [clusterEnabled, setClusterEnabled] = useState(true)
  const [clusterAlg, setClusterAlg] = useState("agglomerative")

  const [subdirectory, setSubdirectory] = useState("")
  const [suffixes, setSuffixes] = useState("")

  const [showAllComparisons, setShowAllComparisons] = useState(false)

  return (

    <div className="flex min-h-screen w-full">

      <AppSidebar />

      <SidebarInset className="p-8 flex justify-center items-center">

        <div className="w-full max-w-5xl space-y-8">

          {/* Header */}

          <div className="flex justify-between items-center">

            <h1 className="text-3xl font-bold">
              Advanced JPlag Options
            </h1>

            <ThemeToggle />

          </div>

          {/* Language & Sensitivity */}

          <Card>

            <CardHeader>

              <CardTitle>
                Language & Sensitivity
              </CardTitle>

              <CardDescription>
                Configure language and token sensitivity
              </CardDescription>

            </CardHeader>

            <CardContent className="grid grid-cols-2 gap-6">

              <div className="space-y-2">

                <Label>Language</Label>

                <Select value={language} onValueChange={setLanguage}>

                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>

                    <SelectItem value="java">Java</SelectItem>
                    <SelectItem value="python3">Python</SelectItem>
                    <SelectItem value="cpp">C++</SelectItem>
                    <SelectItem value="c">C</SelectItem>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="typescript">TypeScript</SelectItem>
                    <SelectItem value="kotlin">Kotlin</SelectItem>
                    <SelectItem value="go">Go</SelectItem>
                    <SelectItem value="rust">Rust</SelectItem>
                    <SelectItem value="swift">Swift</SelectItem>
                    <SelectItem value="scala">Scala</SelectItem>
                    <SelectItem value="scheme">Scheme</SelectItem>
                    <SelectItem value="text">Text</SelectItem>

                  </SelectContent>

                </Select>

              </div>

              <div className="space-y-2">

                <Label>Min Token Match</Label>

                <Input
                  type="number"
                  value={minTokens}
                  onChange={(e) => setMinTokens(e.target.value)}
                />

              </div>

            </CardContent>

          </Card>

          {/* Comparison Settings */}

          <Card>

            <CardHeader>

              <CardTitle>
                Comparison Settings
              </CardTitle>

              <CardDescription>
                Control how similarities are detected
              </CardDescription>

            </CardHeader>

            <CardContent className="grid grid-cols-2 gap-6">

              <div className="space-y-2">

                <Label>Similarity Threshold</Label>

                <Input
                  type="number"
                  step="0.1"
                  value={similarity}
                  onChange={(e) => setSimilarity(e.target.value)}
                />

              </div>

              <div className="space-y-2">

                <Label>Shown Comparisons</Label>

                <Input
                  type="number"
                  value={shownComparisons}
                  onChange={(e) => setShownComparisons(e.target.value)}
                />

              </div>

              <div className="flex items-center justify-between col-span-2">

                <Label>Show All Comparisons</Label>

                <Switch
                  checked={showAllComparisons}
                  onCheckedChange={setShowAllComparisons}
                />

              </div>
              <div className="flex items-center justify-between col-span-2">

                <Label>Normalize Tokens</Label>

                <Switch
                  checked={normalize}
                  onCheckedChange={setNormalize}
                />

              </div>

            </CardContent>

          </Card>

          {/* Clustering */}

          <Card>

            <CardHeader>

              <CardTitle>
                Clustering
              </CardTitle>

              <CardDescription>
                Group similar submissions automatically
              </CardDescription>

            </CardHeader>

            <CardContent className="space-y-6">

              <div className="flex items-center justify-between">

                <Label>Enable Clustering</Label>

                <Switch
                  checked={clusterEnabled}
                  onCheckedChange={setClusterEnabled}
                />

              </div>

              {clusterEnabled && (

                <div className="space-y-2">

                  <Label>Clustering Algorithm</Label>

                  <Select value={clusterAlg} onValueChange={setClusterAlg}>

                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>

                      <SelectItem value="agglomerative">
                        Agglomerative
                      </SelectItem>

                      <SelectItem value="spectral">
                        Spectral
                      </SelectItem>

                    </SelectContent>

                  </Select>

                </div>

              )}

            </CardContent>

          </Card>

          {/* Submission Structure */}

          <Card>

            <CardHeader>

              <CardTitle>
                Submission Structure
              </CardTitle>

              <CardDescription>
                Configure how submissions are parsed
              </CardDescription>

            </CardHeader>

            <CardContent className="grid grid-cols-2 gap-6">

              <div className="space-y-2">

                <Label>Subdirectory</Label>

                <Input
                  placeholder="Example: src"
                  value={subdirectory}
                  onChange={(e) => setSubdirectory(e.target.value)}
                />

              </div>

              <div className="space-y-2">

                <Label>File Suffixes</Label>

                <Input
                  placeholder=".java,.cpp,.py"
                  value={suffixes}
                  onChange={(e) => setSuffixes(e.target.value)}
                />

              </div>

            </CardContent>

          </Card>

        </div>

      </SidebarInset>

    </div>
  )
}