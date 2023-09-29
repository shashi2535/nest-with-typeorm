import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class add_col_in_user1695967434575 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.addColumns('user', [
      new TableColumn({
        name: 'role',
        type: 'enum',
        enumName: 'role_enum_type',
        enum: ['user', 'admin'],
        isNullable: true,
      }),
    ]);
  }
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropColumns('user', ['role']);
  }
}
