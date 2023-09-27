import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class add_col_in_user1695800089009 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.addColumns('user', [
      new TableColumn({
        name: 'password',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'avtar',
        type: 'varchar',
        isNullable: true,
      }),
    ]);
  }
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropColumns('user', ['password', 'avtar']);
  }
}
