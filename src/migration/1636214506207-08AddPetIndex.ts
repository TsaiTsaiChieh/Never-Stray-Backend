/* eslint-disable require-jsdoc */
import {MigrationInterface, QueryRunner} from 'typeorm'

export class AddPetIndex1636214506207 implements MigrationInterface {
  name = 'AddPetIndex1636214506207'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE INDEX \`IDX_6e94e5943dfbc8b2bb9ff0de55\` 
            ON \`ns-app\`.\`pets\` (\`status\`, \`accept_num\`)
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE INDEX \`abc\` 
            ON \`ns-app\`.\`pets\` (\`status\`, \`accept_num\`)
        `)
  }
}
