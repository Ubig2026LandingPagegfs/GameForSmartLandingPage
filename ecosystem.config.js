module.exports = {
    apps: [
        {
            name: "Landing Page",
            script: "node_modules/next/dist/bin/next",
            args: "start -p 3007",
            cwd: "./",
            exec_mode: "cluster",
            instances: "3",
            autorestart: true,
            watch: false,
            max_memory_restart: "3G",
            env: {
                NODE_ENV: "production",
            }
        }
    ]
}