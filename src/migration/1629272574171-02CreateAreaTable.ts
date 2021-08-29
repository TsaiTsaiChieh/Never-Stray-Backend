/* eslint-disable require-jsdoc */
import {MigrationInterface, QueryRunner} from 'typeorm'

export class CreateAreaTable1629272574171 implements MigrationInterface {
  name = 'CreateAreaTable1629272574171'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE \`ns-app\`.\`areas\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`area\` enum ('E', 'W', 'S', 'N', 'M') NOT NULL,
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
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE \`ns-app\`.\`areas\`
        `)
  }
}
