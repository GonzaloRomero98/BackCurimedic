import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../usuario/entity/usuario.entity';
import { Paciente } from '../paciente/entity/paciente.entity';
import { Administrador } from '../administrador/entity/administrador.entity';
import { Medico } from '../medico/entity/medico.entity';
import { Recepcionista } from '../recepcionista/entity/recepcionista.entity';
import { Comuna } from '../comuna/entity/comuna.entity';
import { Especialidad } from '../especialidad/entity/especialidad.entity';
import { Servicio } from '../serivicio/entity/servicio.entity';
import { Cita } from '../cita/entity/cita.entity';

@Module({
    imports:[
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'curimeddb.cnucgwsko5jy.us-east-1.rds.amazonaws.com',
            port: 3306,
            username: 'admin',
            password: 'yGRSK5hLAtmpfMc',
            database: 'curimedDb',
            entities:[
                Usuario,
                Paciente,
                Administrador,
                Medico,
                Recepcionista,
                Comuna,
                Especialidad,
                Servicio,
                Cita
            ],
        }),
    ]
})
export class DatabaseModule {
    
}
