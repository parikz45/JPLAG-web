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

import { useJplag } from "../../context/jplagContext"

export default function AdvancedOptions() {

  const { config, setConfig } = useJplag()

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

          {/* Language */}

          <Card>

            <CardHeader>

              <CardTitle>
                Language
              </CardTitle>

              <CardDescription>
                Select programming language
              </CardDescription>

            </CardHeader>

            <CardContent>

              <Select
                value={config.language}
                onValueChange={(value) =>
                  setConfig({ ...config, language: value })
                }
              >

                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>

                  <SelectItem value="java-cpg">Java (CPG)</SelectItem>
                  <SelectItem value="python3">Python</SelectItem>
                  <SelectItem value="cpp">C++</SelectItem>
                  <SelectItem value="c">C</SelectItem>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="typescript">TypeScript</SelectItem>
                  <SelectItem value="go">Go</SelectItem>
                  <SelectItem value="rust">Rust</SelectItem>

                </SelectContent>

              </Select>

            </CardContent>

          </Card>

          {/* Sensitivity */}

          <Card>

            <CardHeader>

              <CardTitle>
                Sensitivity
              </CardTitle>

            </CardHeader>

            <CardContent className="grid grid-cols-2 gap-6">

              <div className="space-y-2">

                <Label>Min Token Match</Label>

                <Input
                  type="number"
                  value={config.minTokens}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      minTokens: Number(e.target.value)
                    })
                  }
                />

              </div>

              <div className="space-y-2">

                <Label>Similarity Threshold</Label>

                <Input
                  type="number"
                  step="0.1"
                  value={config.similarityThreshold}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      similarityThreshold: Number(e.target.value)
                    })
                  }
                />

              </div>

            </CardContent>

          </Card>

          {/* Comparison */}

          <Card>

            <CardHeader>

              <CardTitle>
                Comparison Settings
              </CardTitle>

            </CardHeader>

            <CardContent className="space-y-6">

              <div className="flex items-center justify-between">

                <Label>Normalize Tokens</Label>

                <Switch
                  checked={config.normalize}
                  onCheckedChange={(v) =>
                    setConfig({ ...config, normalize: v })
                  }
                />

              </div>

              <div className="flex items-center justify-between">

                <Label>Show All Comparisons</Label>

                <Switch
                  checked={config.showAllComparisons}
                  onCheckedChange={(v) =>
                    setConfig({ ...config, showAllComparisons: v })
                  }
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

            </CardHeader>

            <CardContent className="space-y-6">

              <div className="flex items-center justify-between">

                <Label>Enable Clustering</Label>

                <Switch
                  checked={config.clusterEnabled}
                  onCheckedChange={(v) =>
                    setConfig({ ...config, clusterEnabled: v })
                  }
                />

              </div>

              {config.clusterEnabled && (

                <Select
                  value={config.clusterAlgorithm}
                  onValueChange={(v) =>
                    setConfig({ ...config, clusterAlgorithm: v })
                  }
                >

                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>

                    <SelectItem value="AGGLOMERATIVE">
                      Agglomerative
                    </SelectItem>

                    <SelectItem value="SPECTRAL">
                      Spectral
                    </SelectItem>

                  </SelectContent>

                </Select>

              )}

            </CardContent>

          </Card>

        </div>

      </SidebarInset>

    </div>

  )
}