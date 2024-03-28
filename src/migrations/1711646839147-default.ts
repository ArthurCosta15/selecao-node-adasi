import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1711646839147 implements MigrationInterface {
    name = 'Default1711646839147'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "activity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "data" date NOT NULL, "hora_agendamento_inicio" character varying NOT NULL, "hora_agendamento_termino" character varying NOT NULL, "hora_inicio" character varying, "hora_termino" character varying, "task_id" uuid, "student_cpf" character varying, CONSTRAINT "PK_24625a1d6b1b089c8ae206fe467" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "UQ_79dfe04f9559f2e68e849df789c" UNIQUE ("cpf")`);
        await queryRunner.query(`ALTER TABLE "activity" ADD CONSTRAINT "FK_7b3e5bb29e7f5bdc2d876b3efea" FOREIGN KEY ("task_id") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "activity" ADD CONSTRAINT "FK_1f6bf28f0cd925a65a9991961ef" FOREIGN KEY ("student_cpf") REFERENCES "student"("cpf") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "activity" DROP CONSTRAINT "FK_1f6bf28f0cd925a65a9991961ef"`);
        await queryRunner.query(`ALTER TABLE "activity" DROP CONSTRAINT "FK_7b3e5bb29e7f5bdc2d876b3efea"`);
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "UQ_79dfe04f9559f2e68e849df789c"`);
        await queryRunner.query(`DROP TABLE "activity"`);
    }

}
