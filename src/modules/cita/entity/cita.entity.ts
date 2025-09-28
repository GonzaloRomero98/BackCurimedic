import { uuidToBinaryTrans } from "src/common/transformers/uuidBinary.transformer";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Cita{
    @PrimaryColumn({
        name:'cita_id',
        type:'binary',
        length:16,
        transformer: new uuidToBinaryTrans()
    })
    cita_id!:string;

    @Column({
        name:'paciente_id',
        type:"binary",
        length:16,
        transformer: new uuidToBinaryTrans(),
        nullable:false
    })
    paciente_id!:string;

    @Column({
        name:'medico_id',
        type:'binary',
        length:16,
        transformer: new uuidToBinaryTrans(),
        nullable:false
    })
    medico_id!:string;

    @Column({
        name:'servicio_id',
        type:'int',
        nullable:false
    })
    servicio_id!:number;

    @Column({
        name:'inicio_cita',
        type:'datetime',
        precision:6,
        nullable:false
    })
    inicio_cita!:Date;

    @Column({
        name:'fin_cita',
        type:'datetime',
        precision:6,
        nullable:false
    })
    fin_cita!:Date;

    @Column({
        name:'estado',
        enum:['PENDIENTE','CANCELADA','REALIZADA']
    })
    estado!: 'PENDIENTE'|'CANCELADA'|'REALIZADA';
}