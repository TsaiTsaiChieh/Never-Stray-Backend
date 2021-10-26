/* eslint-disable require-jsdoc */
import {MigrationInterface, QueryRunner} from 'typeorm'

export class AddPetColumn1635234036591 implements MigrationInterface {
  name = 'MigrationName1635234036591'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`ns-app\`.\`pets\`
            ADD \`sub_id\` bigint NOT NULL
        `)
    await queryRunner.query(`
            ALTER TABLE \`ns-app\`.\`pets\`
            ADD \`accept_num\` varchar(16) NULL COMMENT '政府收容編號'
        `)
    await queryRunner.query(`
            ALTER TABLE \`ns-app\`.\`pets\` 
            CHANGE \`ligation\` \`ligation\` 
            enum ('T', 'F', 'U') NOT NULL COMMENT '是否絕育' DEFAULT 'U'
        `)
    await queryRunner.query(`
            ALTER TABLE \`ns-app\`.\`pets\` 
            CHANGE \`rabies\` \`rabies\` 
            enum ('T', 'F', 'U') NOT NULL COMMENT '是否施打狂犬病疫苗' DEFAULT 'U'
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`ns-app\`.\`pets\` 
            CHANGE \`rabies\` \`rabies\` 
            enum ('T', 'F', 'U') NOT NULL DEFAULT 'U'
        `)
    await queryRunner.query(`
            ALTER TABLE \`ns-app\`.\`pets\` 
            CHANGE \`ligation\` \`ligation\` 
            enum ('T', 'F', 'U') NOT NULL DEFAULT 'U'
        `)
    await queryRunner.query(`
            ALTER TABLE \`ns-app\`.\`pets\` DROP COLUMN \`accept_num\`
        `)
    await queryRunner.query(`
            ALTER TABLE \`ns-app\`.\`pets\` DROP COLUMN \`sub_id\`
        `)
  }
}
