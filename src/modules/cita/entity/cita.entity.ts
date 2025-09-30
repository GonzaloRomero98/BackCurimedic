import { uuidToBinaryTrans } from "src/common/transformers/uuidBinary.transformer";
import { Medico } from "src/modules/medico/entity/medico.entity";
import { Paciente } from "src/modules/paciente/entity/paciente.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity()
export class Cita{
    //Columna de la id de la cita
    @PrimaryColumn({
        name:'cita_id',
        type:'binary',
        length:16,
        transformer: new uuidToBinaryTrans()
    })
    cita_id!:string;

    //Columna de id del paciente
    @Column({
        name:'paciente_id',
        type:"binary",
        length:16,
        transformer: new uuidToBinaryTrans(),
        nullable:false
    })
    paciente_id!:string;

    //Columna de la id del medico
    @Column({
        name:'medico_id',
        type:'binary',
        length:16,
        transformer: new uuidToBinaryTrans(),
        nullable:false
    })
    medico_id!:string;

    //Columna de la id del servicio
    @Column({
        name:'servicio_id',
        type:'int',
        nullable:false
    })
    servicio_id!:number;

    //Columna de la hora de inicio de la cita
    @Column({
        name:'inicio_cita',
        type:'datetime',
        precision:6,
        nullable:false
    })
    inicio_cita!:Date;

    //Columna de la hora final de la cita
    @Column({
        name:'fin_cita',
        type:'datetime',
        precision:6,
        nullable:false
    })
    fin_cita!:Date;

    //Estado de la cita
    @Column({
        name:'estado',
        enum:['PENDIENTE','CANCELADA','REALIZADA'],
        default:'PENDIENTE'
    })
    estado!: 'PENDIENTE'|'CANCELADA'|'REALIZADA';

    //MUCHAS CITAS TIENE 1 SOLO PACIENTE
    @ManyToOne(()=> Paciente,(paciente)=> paciente.cita,{
        onDelete:'RESTRICT',
    })
    @JoinColumn({
        name:'paciente_id',
        referencedColumnName:'usuario_id'
    })
    paciente!:Paciente;


    @ManyToOne(()=> Medico,(medico)=> medico.cita,{
        onDelete:'RESTRICT',
    })
    @JoinColumn({
        name:'medico_id',
        referencedColumnName:'usuario_id'
    })
    medico!:Medico;
}