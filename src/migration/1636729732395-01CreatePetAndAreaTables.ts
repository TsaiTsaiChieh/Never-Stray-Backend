/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import {MigrationInterface, QueryRunner} from 'typeorm'

export class CreatePetAndAreaTable1636729732395 implements MigrationInterface {
    name = 'CreatePetAndAreaTable1636729732395'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`areas\` (
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
                UNIQUE INDEX \`IDX_e9481f082921789e2cb47a79a5\` (\`region\`, \`city\`),
                INDEX \`IDX_83604f081c8f39604d33db2e7d\` (\`city\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `)
        await queryRunner.query(`
            CREATE TABLE \`pets\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`sub_id\` int NOT NULL,
                \`accept_num\` varchar(32) NULL COMMENT '政府收容編號',
                \`ref\` enum ('gov', 'map', 'own') NOT NULL,
                \`kind\` enum ('D', 'C', 'O') NOT NULL,
                \`sex\` enum ('F', 'M', 'U') NOT NULL DEFAULT 'U',
                \`color\` tinytext NOT NULL,
                \`age\` enum ('A', 'C', 'U') NOT NULL DEFAULT 'U',
                \`ligation\` enum ('T', 'F', 'U') NOT NULL COMMENT '是否絕育' DEFAULT 'U',
                \`rabies\` enum ('T', 'F', 'U') NOT NULL COMMENT '是否施打狂犬病疫苗' DEFAULT 'U',
                \`title\` tinytext NOT NULL,
                \`status\` enum ('Unknown', 'Open', 'Adopted', 'Other', 'Dead') NOT NULL DEFAULT 'Unknown',
                \`remark\` text NULL,
                \`address\` tinytext NULL,
                \`phone\` tinytext NULL,
                \`image\` json NULL,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`city_id\` enum (
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
                ) NULL,
                INDEX \`IDX_6e94e5943dfbc8b2bb9ff0de55\` (\`status\`, \`accept_num\`),
                UNIQUE INDEX \`IDX_e87fb3dcb389be107725e1f1bf\` (\`sub_id\`, \`accept_num\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `)
        await queryRunner.query(`
            ALTER TABLE \`pets\`
            ADD CONSTRAINT \`FK_859edd5c48585a95bd7c7d4e4c9\` FOREIGN KEY (\`city_id\`) REFERENCES \`areas\`(\`city\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`pets\` DROP FOREIGN KEY \`FK_859edd5c48585a95bd7c7d4e4c9\`
        `)
        await queryRunner.query(`
            DROP INDEX \`IDX_e87fb3dcb389be107725e1f1bf\` ON \`pets\`
        `)
        await queryRunner.query(`
            DROP INDEX \`IDX_6e94e5943dfbc8b2bb9ff0de55\` ON \`pets\`
        `)
        await queryRunner.query(`
            DROP TABLE \`pets\`
        `)
        await queryRunner.query(`
            DROP INDEX \`IDX_83604f081c8f39604d33db2e7d\` ON \`areas\`
        `)
        await queryRunner.query(`
            DROP INDEX \`IDX_e9481f082921789e2cb47a79a5\` ON \`areas\`
        `)
        await queryRunner.query(`
            DROP TABLE \`areas\`
        `)
    }
}
