const { spawn } = require("child_process")

exports.executeJplag = (config, jarPath, submissionsPath, resultPath) => {

    return new Promise((resolve, reject) => {

        const args = []

        args.push("-jar", jarPath)

        args.push("-M", "RUN")

        if (config.language)
            args.push("-l", config.language)

        if (config.minTokens)
            args.push("-t", config.minTokens)

        if (config.normalize)
            args.push("--normalize")

        if (config.similarityThreshold)
            args.push("--similarity-threshold", config.similarityThreshold)

        if (config.showAllComparisons)
            args.push("-n", "-1")
        else if (config.shownComparisons)
            args.push("-n", config.shownComparisons)

        if (!config.clusterEnabled) {
            args.push("--cluster-skip")
        }
        else if (config.clusterAlgorithm) {
            args.push("--cluster-algorithm", config.clusterAlgorithm)
        }

        if (config.suffixes)
            args.push("-p", config.suffixes)

        if (config.subdirectory)
            args.push("-s", config.subdirectory)

        if (config.matchMerging)
            args.push("--match-merging")

        args.push("-r", resultPath)

        args.push(submissionsPath)

        console.log("Running command:")
        console.log("java", args.join(" "))

        const process = spawn("java", args)

        process.stdout.on("data", (data) => {
            console.log(data.toString())
        })

        process.stderr.on("data", (data) => {
            console.error(data.toString())
        })

        process.on("error", (err) => {
            reject(err)
        })

        process.on("close", (code) => {

            if (code === 0)
                resolve()
            else
                reject(new Error("JPlag failed"))

        })

    })

}