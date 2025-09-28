import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { PacienteModule } from './modules/paciente/paciente.module';
import { AdministradorModule } from './modules/administrador/administrador.module';
import { MedicoModule } from './modules/medico/medico.module';
import { RecepcionistaModule } from './modules/recepcionista/recepcionista.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { EspecialidaModule } from './modules/especialidad/especialida.module';
import { ComunaModule } from './modules/comuna/comuna.module';
import { ServicioModule } from './modules/serivicio/sercicio.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath: '.env'
    }),
    UsuarioModule,
    DatabaseModule,
    PacienteModule,
    AdministradorModule,
    MedicoModule,
    RecepcionistaModule,
    EspecialidaModule,
    AuthModule,
    ServicioModule,
    ComunaModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
