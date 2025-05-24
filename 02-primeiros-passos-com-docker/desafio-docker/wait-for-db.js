const { exec } = require('node:child_process')
require('dotenv').config()

let tries = 60

const { MARIADB_USER, MARIADB_PASSWORD } = process.env

const checkMariaDB = () => {
  exec(
    `mariadb-admin ping --host=mariadb-container --protocol=TCP --user=${MARIADB_USER} --password=${MARIADB_PASSWORD}`,
    (_, stdout) => {
      if (tries === 0) {
        console.error(
          '\n\n🔴 Não foi possível estabelecer a conexão com o MariaDB. Verifique se ele está rodando\n'
        )
        process.exit(1)
      }

      if (!stdout.includes('mysqld is alive')) {
        process.stdout.write('.')
        tries--
        setTimeout(checkMariaDB, 1000)
        return
      }

      console.log('\n\n🟢 MariaDB está pronto e aceitando conexões!\n')
    }
  )
}

process.stdout.write('\n\n🔴 Aguardando MariaDB aceitar conexões')
checkMariaDB()
