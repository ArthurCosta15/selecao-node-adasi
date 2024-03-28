import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1711634302051 implements MigrationInterface {
    name = 'Default1711634302051'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "student" ("cpf" character varying NOT NULL, "name" character varying NOT NULL, "matrícula" character varying NOT NULL, "course_id" uuid, CONSTRAINT "UQ_79dfe04f9559f2e68e849df789c" UNIQUE ("cpf"), CONSTRAINT "UQ_11e960d84704eff660d791a108f" UNIQUE ("matrícula"), CONSTRAINT "PK_79dfe04f9559f2e68e849df789c" PRIMARY KEY ("cpf"))`);
        await queryRunner.query(`CREATE TABLE "course" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "FK_140d2607308f60eda2ae0d72a4f" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "FK_140d2607308f60eda2ae0d72a4f"`);
        await queryRunner.query(`DROP TABLE "course"`);
        await queryRunner.query(`DROP TABLE "student"`);
        await queryRunner.query(`DROP TABLE "task"`);
    }

}
