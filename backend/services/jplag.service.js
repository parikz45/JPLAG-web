const { spawn } = require("child_process")
const path = require("path")
const fs = require("fs")

exports.executeJplag = (config) => {

    return new Promise((resolve, reject) => {

        let workingDir
        let jarFile

        // If user provided full jar path
        if (config.jarPath.endsWith(".jar")) {
            workingDir = path.dirname(config.jarPath)
            jarFile = path.basename(config.jarPath)
        }
        else {
            // If user provided only folder
            workingDir = config.jarPath
            jarFile = "jplag.jar"
        }

        const args = []

        args.push("-jar", jarFile)

        args.push("-M", "RUN_AND_VIEW")

        if (config.language) {
            args.push("-l", config.language)
        }

        if (config.minTokens) {
            args.push("-t", config.minTokens)
        }

        if (config.normalize) {
            args.push("--normalize")
        }

        if (config.similarityThreshold) {
            args.push("--similarity-threshold", config.similarityThreshold)
        }

        if (config.showAllComparisons) {
            args.push("-n", "-1")
        } else if (config.shownComparisons) {
            args.push("-n", config.shownComparisons)
        }

        if (config.disableClustering) {
            args.push("--cluster-skip")
        } else if (config.clusterAlgorithm) {
            args.push("--cluster-algorithm", config.clusterAlgorithm)
        }

        if (config.suffixes) {
            args.push("-p", config.suffixes)
        }

        if (config.subdirectory) {
            args.push("-s", config.subdirectory)
        }

        if (config.resultPath) {
            args.push("-r", config.resultPath)
        }

        if (config.matchMerging) {
            args.push("--match-merging")
        }

        args.push(config.submissionPath)

        console.log("Running command:")
        console.log("java", args.join(" "))
        console.log("Working directory:", workingDir)

        const jplag = spawn("java", args, {
            cwd: workingDir
        })

        jplag.stdout.on("data", (data) => {
            console.log(data.toString())
        })

        jplag.stderr.on("data", (data) => {
            console.error(data.toString())
        })

        jplag.on("error", (err) => {
            console.error("Process failed:", err)
            reject(err)
        })

        jplag.on("close", (code) => {
            if (code === 0) {
                resolve({ message: "JPlag completed successfully" })
            } else {
                reject(new Error("JPlag process failed"))
            }
        })

    })

}