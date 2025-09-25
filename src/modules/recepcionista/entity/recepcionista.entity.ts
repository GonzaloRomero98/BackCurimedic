import { uuidToBinaryTrans } from "src/common/transformers/uuidBinary.transformer";
import { Comuna } from "src/modules/comuna/entity/comuna.entity";
import { Usuario } from "src/modules/usuario/entity/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, RelationId } from "typeorm";
import { ManyToMany } from "typeorm/browser";

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

    @ManyToOne(()=>Comuna,{
        nullable:true,
        onDelete:'SET NULL',
        onUpdate:'CASCADE'
    })
    @JoinColumn({
        name:'comuna_id',
        referencedColumnName:'comuna_id'
    })
    comuna?:Comuna

    @RelationId((recepcionista:Recepcionista)=> recepcionista.comuna)
    comuna_id?:number;
    
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