import express from 'express'
import cors from 'cors'
import routes from './routes'
import path from 'path';


import './database'

class App {
  constructor() {
    this.server = express()
    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.server.use(express.json())
    this.server.use(cors(
      /* {origin: true} //permite requisições */
    ))
    this.server.use('/MDWRAnexo',
      express.static(path.resolve(__dirname, '..', 'data', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes)
  }
}
export default new App().server