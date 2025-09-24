import { Column, Entity, PrimaryColumn , Index, OneToOne } from "typeorm";
import { uuidToBinaryTrans } from "../../../common/transformers/uuidBinary.transformer";
import { Paciente } from "src/modules/paciente/entity/paciente.entity";
import { Administrador } from "src/modules/administrador/entity/administrador.entity";
import { Medico } from "src/modules/medico/entity/medico.entity";
import { Recepcionista } from "src/modules/recepcionista/entity/recepcionista.entity";

@Entity({name:'usuario'})
export class Usuario {
    @PrimaryColumn({
        type:'binary',
        length:16,
        transformer: new uuidToBinaryTrans(),
    })
    id!: string;

    @Index({ unique: true })
    @Column({
        name: 'correo',
        type: 'varchar',
        length: 100,
        unique: true,
        nullable: false,
    })
    correo!:string;

    @Column({
        name: 'contrasena',
        type:'varchar',
        length: 255,
        nullable: false,
    })
    contrasena!:string;

    @Column({
        name:'rol',
        type:'enum',
        enum:['ADMIN','PACIENTE','DOCTOR','RECEPCIONISTA'],
    })
    rol!: 'ADMIN'|'PACIENTE'|'DOCTOR'|'RECEPCIONISTA';

    @Column({
        name:'creacion',
        type: 'timestamp'
    })
    creacion!:Date;

    @Column({
        name:'editado',
        type: 'timestamp',
    })
    editado!:Date;

    @OneToOne(()=> Paciente, (paciente)=> paciente.usuario)
    paciente!: Paciente;

    @OneToOne(()=> Administrador, (administrador) => administrador.usuario)
    administrador!: Administrador; 

    @OneToOne(()=> Medico, (medico) => medico.usuario)
    medico!: Medico; 

    @OneToOne(()=> Recepcionista, (recepcionista) => recepcionista.usuario)
    recepcionista!: Recepcionista; 
}