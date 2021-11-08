module.exports = {
    apps: [
        {
            name: 'farmplay',
            script: './bin/www',
            instances: 0,
            exec_mode: "cluster",
            watch: true
    }
]
  }