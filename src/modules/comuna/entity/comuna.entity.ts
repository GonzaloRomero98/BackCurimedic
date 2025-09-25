import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Paciente } from "../../paciente/entity/paciente.entity";
import { Medico } from "../../medico/entity/medico.entity";

@Entity('comuna')
export class Comuna{
    @PrimaryGeneratedColumn({
        name:'comuna_id',
        type:'int'
    })
    comuna_id!:number;

    @Column({
        name:'nombre',
        type:'varchar',
        length:120,
        unique:true
    })
    nombre!:string;

    @OneToMany(()=> Paciente,(paciente)=>paciente.comuna)
    pacientes?:Paciente[];

    @OneToMany(()=>Medico,(medico)=>medico.comuna)
    medicos?:Medico[]
}