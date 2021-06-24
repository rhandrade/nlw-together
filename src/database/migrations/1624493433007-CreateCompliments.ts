import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateCompliments1624493433007 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.createTable(
            new Table({
                name: 'compliments',
                columns: [
                    {
                        name      : 'id',
                        type      : 'varchar',
                        isPrimary : true
                    },
                    {
                        name : 'user_sender_id',
                        type : 'varchar'                        
                    },
                    {
                        name : 'user_receiver_id',
                        type : 'varchar'                        
                    },
                    {
                        name : 'tag_id',
                        type : 'varchar'                        
                    },
                    {
                        name : 'message',
                        type : 'varchar'
                    },
                    {
                        name    : 'created_at',
                        type    : 'timestamp',
                        default : 'now()'
                    }
                ],
                foreignKeys: [
                    {
                        name                  : 'user_sender_fk',
                        columnNames           : ['user_sender_id'],
                        referencedTableName   : 'users',
                        referencedColumnNames : ['id'],
                        onDelete              : 'NO ACTION',
                        onUpdate              : 'NO ACTION',
                    },
                    {
                        name                  : 'user_receiver_fk',
                        columnNames           : ['user_receiver_id'],
                        referencedTableName   : 'users',
                        referencedColumnNames : ['id'],
                        onDelete              : 'NO ACTION',
                        onUpdate              : 'NO ACTION',
                    },
                    {
                        name                  : 'tag_fk',
                        columnNames           : ['tag_id'],
                        referencedTableName   : 'tags',
                        referencedColumnNames : ['id'],
                        onDelete              : 'NO ACTION',
                        onUpdate              : 'NO ACTION',
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('compliments');
    }

}
