import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Comuna } from "./entity/comuna.entity";
import { ComunaController } from "./comuna.controller";
import { ComunaService } from "./comuna.service";

@Module({
    imports:[TypeOrmModule.forFeature([Comuna])],
    controllers:[ComunaController],
    providers:[ComunaService],
    exports:[TypeOrmModule]
})
export class ComunaModule{
    
}