import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1711664892204 implements MigrationInterface {
    name = 'Default1711664892204'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "activity" DROP COLUMN "hora_inicial"`);
        await queryRunner.query(`ALTER TABLE "activity" DROP COLUMN "hora_final"`);
        await queryRunner.query(`ALTER TABLE "activity" ADD "hora_inicio" TIME`);
        await queryRunner.query(`ALTER TABLE "activity" ADD "hora_termino" TIME`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "activity" DROP COLUMN "hora_termino"`);
        await queryRunner.query(`ALTER TABLE "activity" DROP COLUMN "hora_inicio"`);
        await queryRunner.query(`ALTER TABLE "activity" ADD "hora_final" TIME NOT NULL`);
        await queryRunner.query(`ALTER TABLE "activity" ADD "hora_inicial" TIME NOT NULL`);
    }

}
