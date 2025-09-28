import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('servicio')
export class Servicio{
    @PrimaryGeneratedColumn({
        name:'servicio_id',
        type:'int',
    })
    servicio_id!:number;

    @Column({
        type:'varchar',
        length:150,
        nullable:false
    })
    nombre!:string;

    @Column({
        type:'int',
        nullable:false
    })
    duracion!:number;
}
