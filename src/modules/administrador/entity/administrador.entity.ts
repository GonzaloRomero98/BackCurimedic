import { uuidToBinaryTrans } from "src/common/transformers/uuidBinary.transformer";
import { Usuario } from "src/modules/usuario/entity/usuario.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { PrimaryColumn } from "typeorm";

@Entity('administrador')
export class Administrador{
    @PrimaryColumn({
        name:'usuario_id',
        type:'binary',
        length:16,
        transformer: new uuidToBinaryTrans(),
    })
    usuario_id!:String;

    @Column({
        type:'varchar',
        length:100,
        nullable: false,
    })
    nombres!:string;

    @Column({
        type:'varchar',
        length:100,
        nullable: false,
    })
    apellidos!:string

    @OneToOne(()=> Usuario,(usuario) => usuario.administrador,{
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({
        name:'usuario_id',
        referencedColumnName: 'id',    
    })
    usuario!: Usuario;
}