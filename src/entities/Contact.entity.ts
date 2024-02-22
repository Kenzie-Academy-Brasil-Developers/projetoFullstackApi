import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Client } from "./Client.entity";

@Entity("contacts")
export class Contact {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: 120 })
  name: string;

  @Column({ length: 120 })
  email: string;

  @Column({ length: 12 })
  telephone: string;

  @CreateDateColumn({ type: "date" })
  createdAt: string;

  @UpdateDateColumn({ type: "date" })
  updatedAt: string;

  @DeleteDateColumn({ type: "date", nullable: true })
  deletedAt: string | null;

  @ManyToOne(() => Client, (client) => client.contacts)
  client: Client;
}
