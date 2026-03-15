exports.buildCommand = (config, resultPath) => {

  const args = []

  args.push("-M", "RUN_AND_VIEW")

  args.push("-l", config.language)

  if (config.normalize)
    args.push("--normalize")

  if (config.minTokens)
    args.push("-t", config.minTokens)

  if (config.similarityThreshold)
    args.push("--similarity-threshold", config.similarityThreshold)

  if (config.clusterAlg)
    args.push("--cluster-algorithm", config.clusterAlg)

  if (config.showComparisons)
    args.push("-n", config.showComparisons)

  if (config.subdirectory)
    args.push("-s", config.subdirectory)

  if (config.suffixes)
    args.push("-p", config.suffixes)

  args.push("-r", resultPath)

  args.push(config.submissionPath)

  return args
}