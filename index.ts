
import express from 'express'
import cors from 'cors'
import connection from './db'
import { Stock } from './entities/Stock'
import { DataSource } from 'typeorm'

export interface Context {
      req: express.Request
      res: express.Response
}

export type StockType = {
      name: string
      price: number
}

export const PORT: number = 8000

const app: express.Express = express()

let corsOptions: cors.CorsOptions = {
      allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token', 'Authorization'],
      credentials: true,
      methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
      origin: '*',
      preflightContinue: false
}

app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*
app.get("/add", async ({ req, res }: Context) => {
      const db = await connection()
      const stockRepo = await db?.getRepository(Stock)

      stocks.forEach(async (stock) => {
            const newStock = new Stock(stock.name, stock.price)
            await stockRepo?.save(newStock)
      }
      )
      res.send("Stocks added")
})

// just thought for search then naah forget it .. aha

app.post("/api/filter", async (req, res) => {
      const name : string = req.body.name

      const db = await connection()
      const stocks = await db?.getRepository(Stock)
      const filteredStocks = await stocks?.find({ 
            where: { name: name }
       })

      if(db?.isConnected) {
            db.close()
      }

      res.json(filteredStocks)
})

*/

app.get("/api/stocks", async ({ req, res }: Context) => {
      const db = await connection()
      const stocks = await db?.getRepository(Stock)
      const allStocks = await stocks?.find()

      if (db?.isConnected) {
            db.close()
      }
      res.json(allStocks)
})

const updateContinuosPrices = async (db: DataSource | undefined) => {
      const stocks = await db?.getRepository(Stock);
      const allStocks = await stocks?.find();

      if (!allStocks) {
            return
      }

      // Update the prices of all stocks
      allStocks.forEach(async (stock) => {
            // Simulate updating the stock prices (you should replace this with your logic)
            const updatedPrice = stock.price + Math.random() * 10 - 5; // Simulate price change

            stocks?.update(stock.id, { price: updatedPrice });

            // Save the updated stock back to the database
            await stocks?.save(stock);

            if (db?.isConnected) {
                  db.close()
            }
      }); // Update every 2 seconds (2000 milliseconds)
};

app.get("/api/stocks/:id", async ({ req, res }: Context) => {

})

app.listen(PORT, async () => {
      //  const db = await connection()
      console.log(`Server running on port ${PORT}`)

})