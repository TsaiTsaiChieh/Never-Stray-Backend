/* eslint-disable require-jsdoc */
import {MigrationInterface, QueryRunner} from 'typeorm'

export class CreatePetAndAreaTables1636295547632 implements MigrationInterface {
  name = 'CreatePetAndAreaTables1636295547632'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE \`ns-app\`.\`areas\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`region\` enum ('E', 'W', 'S', 'N', 'M') NOT NULL,
                \`city\` enum (
                    '2',
                    '3',
                    '4',
                    '5',
                    '6',
                    '7',
                    '8',
                    '9',
                    '10',
                    '11',
                    '12',
                    '13',
                    '14',
                    '15',
                    '16',
                    '17',
                    '18',
                    '19',
                    '20',
                    '21',
                    '22',
                    '23'
                ) NOT NULL,
                \`name\` varchar(4) NOT NULL,
                UNIQUE INDEX \`REGION_CITY_INDEX\` (\`region\`, \`city\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `)
    await queryRunner.query(`
            CREATE TABLE \`ns-app\`.\`pets\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`sub_id\` int NOT NULL,
                \`accept_num\` varchar(32) NULL COMMENT '政府收容編號',
                \`ref\` enum ('gov', 'map', 'own') NOT NULL,
                \`area_id\` tinyint NOT NULL,
                \`kind\` tinytext NOT NULL,
                \`sex\` enum ('F', 'M', 'U') NOT NULL DEFAULT 'U',
                \`color\` tinytext NOT NULL,
                \`age\` enum ('A', 'C', 'U') NOT NULL DEFAULT 'U',
                \`ligation\` enum ('T', 'F', 'U') NOT NULL 
                COMMENT '是否絕育' DEFAULT 'U',
                \`rabies\` enum ('T', 'F', 'U') NOT NULL 
                COMMENT '是否施打狂犬病疫苗' DEFAULT 'U',
                \`title\` tinytext NOT NULL,
                \`status\` enum ('Unknown', 'Open', 'Adopted', 'Other', 'Dead') 
                NOT NULL DEFAULT 'Unknown',
                \`remark\` text NULL,
                \`address\` tinytext NULL,
                \`phone\` tinytext NULL,
                \`image\` json NULL,
                \`created_at\` datetime(6) NOT NULL 
                DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL 
                DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                INDEX \`IDX_6e94e5943dfbc8b2bb9ff0de55\` 
                (\`status\`, \`accept_num\`),
                UNIQUE INDEX \`IDX_e87fb3dcb389be107725e1f1bf\` 
                (\`sub_id\`, \`accept_num\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP INDEX \`IDX_e87fb3dcb389be107725e1f1bf\` ON \`ns-app\`.\`pets\`
        `)
    await queryRunner.query(`
            DROP INDEX \`IDX_6e94e5943dfbc8b2bb9ff0de55\` ON \`ns-app\`.\`pets\`
        `)
    await queryRunner.query(`
            DROP TABLE \`ns-app\`.\`pets\`
        `)
    await queryRunner.query(`
            DROP INDEX \`REGION_CITY_INDEX\` ON \`ns-app\`.\`areas\`
        `)
    await queryRunner.query(`
            DROP TABLE \`ns-app\`.\`areas\`
        `)
  }
}
