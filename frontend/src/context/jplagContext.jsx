import { createContext, useContext, useState } from "react"

const JplagContext = createContext()

export function JplagProvider({ children }) {

  const [config, setConfig] = useState({

    language: "java-cpg",
    minTokens: 9,
    similarityThreshold: 0,

    normalize: false,

    shownComparisons: 2500,
    showAllComparisons: false,

    clusterEnabled: true,
    clusterAlgorithm: "AGGLOMERATIVE",

    suffixes: "",
    subdirectory: ""
  })

  return (
    <JplagContext.Provider value={{ config, setConfig }}>
      {children}
    </JplagContext.Provider>
  )
}

export function useJplag() {
  return useContext(JplagContext)
}