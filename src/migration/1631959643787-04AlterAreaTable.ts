/* eslint-disable require-jsdoc */
import {MigrationInterface, QueryRunner} from 'typeorm'

export class AlterAreaTable1631959643787 implements MigrationInterface {
  name = 'AlterAreaTable1631959643787'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`ns-app\`.\`areas\`
            ADD \`name\` varchar(4) NOT NULL
        `)
    await queryRunner.query(`
            CREATE UNIQUE INDEX \`REGION_CITY_INDEX\` 
            ON \`ns-app\`.\`areas\` (\`region\`, \`city\`)
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP INDEX \`REGION_CITY_INDEX\` ON \`ns-app\`.\`areas\`
        `)
    await queryRunner.query(`
            ALTER TABLE \`ns-app\`.\`areas\` DROP COLUMN \`name\`
        `)
  }
}
