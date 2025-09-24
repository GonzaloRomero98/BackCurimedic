import { Column, Entity,PrimaryGeneratedColumn } from "typeorm";

@Entity('entity')
export class Especialidad{
    @PrimaryGeneratedColumn({
        name: 'especialidad_id',
        type: 'int',
    })
    especialidad_id!:number;

    @Column({
        name:'nombre',
        type:'varchar',
        length:150,
        unique:true,
    })
    nombre!:string

    @Column({
        name:'activo',
        type:'boolean',
        default:true,
    })
    activo!:boolean;
}