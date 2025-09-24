import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}