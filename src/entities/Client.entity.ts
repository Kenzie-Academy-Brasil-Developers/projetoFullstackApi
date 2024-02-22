import { getRounds, hashSync } from "bcryptjs";

import { Contact } from "./Contact.entity";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("clients")
export class Client {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: 120 })
  name: string;

  @Column({ length: 120, unique: true })
  email: string;

  @Column({ length: 120 })
  password: string;

  @Column({ length: 12, unique: true })
  telephone: string;

  @CreateDateColumn({ type: "date" })
  createdAt: string;

  @UpdateDateColumn({ type: "date" })
  updatedAt: string;

  @DeleteDateColumn({ type: "date", nullable: true })
  deletedAt: string | null;

  @OneToMany(() => Contact, (contact) => contact.client)
  contacts: Contact[];

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    const hasRounds: number = getRounds(this.password);

    if (!hasRounds) {
      this.password = hashSync(this.password, 10);
    }
  }
}
