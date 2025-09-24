/*import { binary } from "joi";
import { uuidToBinaryTrans } from "src/common/transformers/uuidBinary.transformer";
import { Medico } from "src/modules/medico/entity/medico.entity";
import { Paciente } from "src/modules/paciente/entity/paciente.entity";
import { Unique, Column, Entity, PrimaryColumn, CreateDateColumn, Index, ManyToOne, JoinColumn } from "typeorm";



@Entity('agenda_cita')
@Index(['medico_id','hora_inicio'])
@Unique('unica_cita_hora',['medico_id','hora_inicio'])
export class AgendaCita{
    @PrimaryColumn({
        name:'cita_id',
        type:'binary',
        length:16,
        transformer: new uuidToBinaryTrans(),
    })
    cita_id!:string;

    @Column({
        name:'medico_rut',
        type:'binary',
        length:16,
        transformer: new uuidToBinaryTrans(),
    })
    medico_id!:string;

    @Column({
        name:'paciente_rut',
        type:'binary',
        length:16,
        transformer: new uuidToBinaryTrans(),
    })
    paciente_id!:string;

    @Column({
        name:'hora_inicio',
        type:'datetime'
    })
    hora_inicio!:Date;

    @Column({
        name:'hora_fin',
        type:'datetime'
    })
    hora_fin!:Date;

    @Column({
        name:'tipo_cita',
        type:'enum',
        enum:['PRESENCIAL','ONLINE'],
    })
    tipo_cita!:'PRESENCIAL'|'ONLINE';

    @Column({
        name:'motivo',
        type:'varchar',
        length:200,
        nullable: true
    })
    motivo!:string | null;

    @CreateDateColumn({
        name:'creado',
        type:'timestamp'
    })
    creado!: Date;

    @ManyToOne(()=> Medico,(medico)=>medico.agendacita,{
        onDelete:'RESTRICT',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({
        name:'medico_id',
        referencedColumnName: 'usuario_id'
    })
    medico!:Medico;

    @ManyToOne(()=>Paciente,(paciente)=> paciente.agendacita,{
        onDelete:'RESTRICT',
        onUpdate:'CASCADE'
    })
    @JoinColumn({
        name:'paciente_id',
        referencedColumnName:'usuario_id'
    })
    paciente!: Paciente;
}*/