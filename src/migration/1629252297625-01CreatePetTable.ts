/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import {MigrationInterface, QueryRunner} from 'typeorm'

export class CreateUserTable1629252297625 implements MigrationInterface {
  name = 'CreateUserTable1629252297625'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE \`ns-app\`.\`pets\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`ref\` enum ('gov', 'map', 'own') NOT NULL,
                \`area_id\` tinyint NOT NULL,
                \`kind\` tinytext NOT NULL,
                \`sex\` enum ('F', 'M', 'U') NOT NULL DEFAULT 'U',
                \`color\` tinytext NOT NULL,
                \`age\` enum ('Adult', 'Child', 'Unknown') NOT NULL DEFAULT 'Unknown',
                \`ligation\` enum ('True', 'False', 'Unknown') NOT NULL DEFAULT 'Unknown',
                \`rabies\` enum ('True', 'False', 'Unknown') NOT NULL DEFAULT 'Unknown',
                \`title\` tinytext NOT NULL,
                \`status\` enum ('Unknown', 'Open', 'Adopted', 'Other', 'Dead') NOT NULL DEFAULT 'Unknown',
                \`remark\` tinytext NULL,
                \`address\` tinytext NULL,
                \`phone\` tinytext NULL,
                \`image\` json NULL,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE \`ns-app\`.\`pets\`
        `)
  }
}
