/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import {MigrationInterface, QueryRunner} from 'typeorm'

export class AddIndexInPetTable1641206038791 implements MigrationInterface {
  name = 'AddIndexInPetTable1641206038791'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE INDEX \`IDX_102d71238583de038b1ab36bb8\` ON \`ns-app\`.\`pets\` (
                \`status\`,
                \`city_id\`,
                \`color\`,
                \`kind\`,
                \`age\`,
                \`sex\`,
                \`ref\`,
                \`created_at\`,
                \`updated_at\`
            )
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP INDEX \`IDX_102d71238583de038b1ab36bb8\` ON \`ns-app\`.\`pets\`
        `)
  }
}
