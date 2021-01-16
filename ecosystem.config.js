module.exports = {
  apps: [
    {
      name: 'senator',
      exec_mode: 'cluster',
      instances: 'max', // Or a number of instances
      max_memory_restart: '500M',
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start'
    }
  ]
}
