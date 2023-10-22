import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Stock {
      @PrimaryGeneratedColumn()
      id: number;

      @Column({type:"varchar"})
      name: string;

      @Column({type:"float"})
      price: number;

      constructor(name: string, price: number) {
            this.name = name;
            this.price = price;
      }
}


// we can also use id! and define it as undefined (: