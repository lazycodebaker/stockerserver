
import { Stock } from "./entities/Stock"
import { createConnection } from "typeorm"


const connection = async () => {
      try {
            // create connection with database
            const connection = await createConnection({
                  type: 'sqlite',
                  database: 'db.sqlite',
                  synchronize: true,
                  logging: true,
                  entities: [Stock],
            });
            return connection
      } catch (error) {
            console.error('Error connecting to the database:', error);
      }
}


export default connection