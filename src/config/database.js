module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'intranet_docker',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
