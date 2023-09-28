import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';
export class add_public_id_in_user1695887274805 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.addColumns('user', [
      new TableColumn({
        name: 'public_id',
        type: 'varchar',
        isNullable: true,
      }),
    ]);
  }
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropColumns('user', ['password', 'avtar']);
  }
}
