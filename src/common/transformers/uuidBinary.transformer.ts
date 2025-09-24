import { ValueTransformer } from "typeorm";

export class uuidToBinaryTrans implements ValueTransformer{
    to(uuid: string): Buffer | null {
        if(!uuid) return null;
        return Buffer.from(uuid.replace(/-/g,''),'hex');
    }
    from(Buffer: Buffer):string | null{
        if(!Buffer) return null;
        const hex = Buffer.toString('hex');
        return `${hex.substr(0,8)}-${hex.substr(8,4)}-${hex.substr(12,4)}-${hex.substr(16,4)}-${hex.substr(20)}`;
    }
}