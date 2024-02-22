import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInitialTables1708486995497 implements MigrationInterface {
    name = 'CreateInitialTables1708486995497'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contacts" ("id" SERIAL NOT NULL, "name" character varying(120) NOT NULL, "email" character varying(120) NOT NULL, "telephone" character varying(12) NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), "deletedAt" date, "clientId" integer, CONSTRAINT "PK_b99cd40cfd66a99f1571f4f72e6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clients" ("id" SERIAL NOT NULL, "name" character varying(120) NOT NULL, "email" character varying(120) NOT NULL, "password" character varying(120) NOT NULL, "telephone" character varying(12) NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), "deletedAt" date, CONSTRAINT "UQ_b48860677afe62cd96e12659482" UNIQUE ("email"), CONSTRAINT "UQ_5e1236d7feffe204333944ed649" UNIQUE ("telephone"), CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD CONSTRAINT "FK_8039454fab552403d5579cf7423" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts" DROP CONSTRAINT "FK_8039454fab552403d5579cf7423"`);
        await queryRunner.query(`DROP TABLE "clients"`);
        await queryRunner.query(`DROP TABLE "contacts"`);
    }

}
