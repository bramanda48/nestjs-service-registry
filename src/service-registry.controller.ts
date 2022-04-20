import { Controller, Get, Param, Query } from "@nestjs/common";
import { ServiceDescription, ServiceRegistry } from "./service-registry.service";
import { GetClientIp, isEmpty } from "./utils";

@Controller('service-registry')
export class ServiceRegistryController {
    constructor(
        private readonly serviceRegistry: ServiceRegistry,
    ) {}

    @Get('/list')
    async listService() {
        let list: ServiceDescription[] = await this.serviceRegistry.ApiListAll();
        return {
            total: list.length,
            service: list
        };
    }

    @Get('/list/:name')
    async getOneService(
        @Param('name') name: string,
    ) {
        return await this.serviceRegistry.ApiGetService(name)
    }

    @Get('/register/:name')
    async addService(
        @GetClientIp() ip: string,
        @Param('name') name: string,
        @Query('host') host: string,
        @Query('id') id: string,
    ) {
        if(isEmpty(name) || isEmpty(host) || isEmpty(id)) {
            return {"message": "INVALID_PARAMETER"};
        }
        this.serviceRegistry.ApiAddService({
            name: name,
            host: host,
            serviceId: id,
            ipAddress: ip,
            lastContact: new Date(),
        });
        return {
            "message": "OK"
        };
    }

    @Get('/unregister/:service_id')
    async removeService(
        @Param('service_id') serviceId: string,
    ) {
        let unregister = this.serviceRegistry.ApiRemoveService(serviceId);
        if(!unregister) {
            return {
                "message": "SERVICE_NOT_FOUND"
            };
        }
        return {
            "message": "OK"
        };
    }
}