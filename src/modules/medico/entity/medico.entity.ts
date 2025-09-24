import { uuidToBinaryTrans } from "src/common/transformers/uuidBinary.transformer";
//import { AgendaCita } from "src/modules/agenda/entity/agenda.entity";
import { Usuario } from "src/modules/usuario/entity/usuario.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm";

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

    @Column({
        type:'int',
    })
    comuna_id!:number;

    
    @Column({
        type:'varchar',
        length:255,
        nullable:false
    })
    especialidad!:string;

    @OneToOne(()=> Usuario,(usuario)=> usuario.medico,{
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({
        name: 'usuario_id',
        referencedColumnName: 'id',
    })
    usuario!:Usuario;

   /* @OneToMany(()=> AgendaCita,(agendacita)=>agendacita.medico)
    agendacita!:AgendaCita[]*/
}