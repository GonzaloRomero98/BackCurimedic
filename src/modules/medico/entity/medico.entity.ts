import { uuidToBinaryTrans } from "src/common/transformers/uuidBinary.transformer";
import { Cita } from "src/modules/cita/entity/cita.entity";
import { Comuna } from "src/modules/comuna/entity/comuna.entity";
import { Especialidad } from "src/modules/especialidad/entity/especialidad.entity";
//import { AgendaCita } from "src/modules/agenda/entity/agenda.entity";
import { Usuario } from "src/modules/usuario/entity/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, RelationId } from "typeorm";

@Entity('medico')
export class Medico{
    @PrimaryColumn({
        name:'usuario_id',
        type:'binary',
        length:16,
        transformer: new uuidToBinaryTrans(),
    })
    usuario_id!:string;

    @Column({
        name:'rut_medico',
        type:'varchar',
        length:15
    })
    rut_medico!:string

    @Column({
        type:'varchar',
        length:'100',
        nullable:false,
    })
    nombres!:string;

    @Column({
        type:'varchar',
        length:100,
        nullable:false,
    })
    apellidos!: string;

    @Column({
        type:'varchar',
        length:9,
    })
    celular!:string;

    @Column({
        name:'fecha_nacimiento',
        type:'date',
    })
    fecha_nacimiento!: Date;


    @Column({
        type:'varchar',
        length:150,
    })
    direccion!:string;

    @ManyToOne(()=>Comuna,{
        nullable:true,
        onDelete:'SET NULL',
        onUpdate:'CASCADE'
    })
    @JoinColumn({
        name:'comuna_id',
        referencedColumnName:'comuna_id'
    })
    comuna?:Comuna;

    @RelationId((medico:Medico)=>medico.comuna)
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

    @ManyToOne(()=>Especialidad,{
        nullable:true,
        onDelete:'SET NULL',
        onUpdate:'CASCADE'
    })
    @JoinColumn({
        name:'especialidad_id',
        referencedColumnName:'especialidad_id'
    })
    especialidad?:Especialidad;

    @RelationId((medico: Medico)=> medico.especialidad)
    especialidad_id?:number;

   @OneToMany(()=>Cita, (cita)=>cita.medico)
   cita!:Cita[];
}