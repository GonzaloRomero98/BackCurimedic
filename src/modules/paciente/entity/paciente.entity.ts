import Joi from "joi";
import { uuidToBinaryTrans } from "src/common/transformers/uuidBinary.transformer";
//import { AgendaCita } from "src/modules/agenda/entity/agenda.entity";
import { Usuario } from "src/modules/usuario/entity/usuario.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm";

@Entity('paciente')
export class Paciente {
    @PrimaryColumn({
        name:'usuario_id',
        type:'binary',
        length:16,
        transformer: new uuidToBinaryTrans(),
    })
    usuario_id!: string;

     @Column({
        name:'rut_paciente',
        type:'varchar',
        length:15
    })
    rut_paciente!:string;

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

    @OneToOne(()=>Usuario,(usuario) => usuario.paciente, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({
        name: 'usuario_id',
        referencedColumnName: 'id',
    })
    usuario!: Usuario;

    /*@OneToMany(()=> AgendaCita,(agendacita)=>agendacita.paciente)
    agendacita!: AgendaCita[]*/


}