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
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports:[
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject:[ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.get<string>('DB_HOST'),
                port: configService.get<number>('DB_PORT'),
                username: configService.get<string>('DB_USER'),
                password: configService.get<string>('DB_PASS'),
                database: configService.get<string>('DB_NAME'),
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
        }),
    ]
})
export class DatabaseModule {
    
}
