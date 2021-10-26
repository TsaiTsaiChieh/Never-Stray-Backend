/* eslint-disable require-jsdoc */
import {MigrationInterface, QueryRunner} from 'typeorm'

export class AlterPetEnumColumn1635164623493 implements MigrationInterface {
  name = 'MigrationName1635164623493'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`ns-app\`.\`pets\` 
            CHANGE \`age\` \`age\` 
            enum ('A', 'C', 'U') NOT NULL DEFAULT 'U'
        `)
    await queryRunner.query(`
            ALTER TABLE \`ns-app\`.\`pets\` 
            CHANGE \`ligation\` \`ligation\` 
            enum ('T', 'F', 'U') NOT NULL DEFAULT 'U'
        `)
    await queryRunner.query(`
            ALTER TABLE \`ns-app\`.\`pets\` 
            CHANGE \`rabies\` \`rabies\` 
            enum ('T', 'F', 'U') NOT NULL DEFAULT 'U'
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`ns-app\`.\`pets\` 
            CHANGE \`rabies\` \`rabies\` 
            enum ('True', 'False', 'Unknown') NOT NULL DEFAULT 'Unknown'
        `)
    await queryRunner.query(`
            ALTER TABLE \`ns-app\`.\`pets\` 
            CHANGE \`ligation\` \`ligation\` 
            enum ('True', 'False', 'Unknown') NOT NULL DEFAULT 'Unknown'
        `)
    await queryRunner.query(`
            ALTER TABLE \`ns-app\`.\`pets\` 
            CHANGE \`age\` \`age\` 
            enum ('Adult', 'Child', 'Unknown') NOT NULL DEFAULT 'Unknown'
        `)
  }
}
