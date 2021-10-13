/* eslint-disable require-jsdoc */
import {MigrationInterface, QueryRunner} from 'typeorm'

export class ChangeAeaColumn1631944050940 implements MigrationInterface {
  name = 'ChangeAeaColumn1631944050940'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`ns-app\`.\`areas\` CHANGE \`area\` \`region\` enum (
              'E', 'W', 'S', 'N', 'M') NOT NULL
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`ns-app\`.\`areas\` CHANGE \`region\` \`area\` enum (
              'E', 'W', 'S', 'N', 'M') NOT NULL
        `)
  }
}
