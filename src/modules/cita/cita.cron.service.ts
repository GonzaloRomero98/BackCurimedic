import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { DataSource } from 'typeorm';
import { Cita } from './entity/cita.entity';

@Injectable()
export class CitaCronService {
  private readonly logger = new Logger(CitaCronService.name);

  constructor(private readonly dataSource: DataSource) {}

  @Cron('5 0 * * *', { timeZone: 'America/Santiago' })
  async actualizarCitasPasadas() {
    this.logger.log('Iniciando revisión automática de citas pasadas...');

    await this.dataSource.transaction(async (manager) => {
      const result = await manager
        .createQueryBuilder()
        .update(Cita)
        .set({ estado: 'CANCELADA' })
        .where('estado = :pend', { pend: 'PENDIENTE' })
        .andWhere('fecha_cita < CURDATE()')
        .execute();

      this.logger.log(`Citas canceladas automáticamente: ${result.affected ?? 0}`);
    });

    this.logger.log('✅ Revisión de citas pasadas finalizada');
  }
}