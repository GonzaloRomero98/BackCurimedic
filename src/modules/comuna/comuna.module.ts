import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Comuna } from "./entity/comuna.entity";

@Module({
    imports:[TypeOrmModule.forFeature([Comuna])],
    exports:[TypeOrmModule]
})
export class ComunaModule{
    
}