/* eslint-disable require-jsdoc */
import {MigrationInterface, QueryRunner} from 'typeorm'

export class AddPetIndex1635240228964 implements MigrationInterface {
  name = 'AddPetIndex1635240228964'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE UNIQUE INDEX \`IDX_e87fb3dcb389be107725e1f1bf\` 
            ON \`ns-app\`.\`pets\` (\`sub_id\`, \`accept_num\`)
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP INDEX \`IDX_e87fb3dcb389be107725e1f1bf\` 
            ON \`ns-app\`.\`pets\`
        `)
  }
}
