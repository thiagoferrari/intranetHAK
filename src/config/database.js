module.exports = {
  dialect: 'postgres',
  host: '192.168.1.22',
  username: 'postgres',
  password: 'docker',
  database: 'intranet',
  define: {
    timestamps: true,
    /* underscored: true,
    underscoredAll: true, */
    freezeTableName: true /* isso para de fazer add 's' ao fim da class (extendida do Model) */
  },
}