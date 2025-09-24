import { uuidToBinaryTrans } from "src/common/transformers/uuidBinary.transformer";
import { Usuario } from "src/modules/usuario/entity/usuario.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";

@Entity('recepcionista')
export class Recepcionista{
    @PrimaryColumn({
        name:'usuario_id',
        type:'binary',
        length:16,
        transformer: new uuidToBinaryTrans(),
    })
    usuario_id!: string;
    
    @Column({
        type:'varchar',
        length:100,
        nullable:false,
    })
    nombres!: string;
    
    @Column({
        type:'varchar',
        length:100,
        nullable:false,
    })
    apellidos!: string;
    
    @Column({
        type: 'varchar',
        length: 10,
        nullable: true,
    })
    celular!: string;
    
    @Column({
        name:'fecha_nacimiento',
        type:'date',
    })
    fecha_nacimiento!: Date;
    
    @Column({
        type:'varchar',
        length: 150,
        nullable: true,
    })
    direccion!: string;

    @Column({
        type:'int',
    })
    comuna_id!:number;

    
    @OneToOne(()=> Usuario,(usuario)=> usuario.medico,{
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({
        name: 'usuario_id',
        referencedColumnName: 'id',
    })
    usuario!:Usuario;
}