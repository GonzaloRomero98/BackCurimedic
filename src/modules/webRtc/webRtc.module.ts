import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { WebRtcGateway } from "./webRtc.gateway";

@Module({
    imports:[AuthModule],
    providers:[WebRtcGateway]
})
export class WebRtcModule{
    
}