import { INestApplication, Injectable, Logger } from "@nestjs/common";
import axios from "axios";
import { v4 } from "uuid";
import { ServiceRegistryModule } from "./service-registry.module";
import { isEmpty, nearest } from "./utils";

export interface ServiceDescription {
  name?: string;
  serviceId?: string;
  host?: string;
  ipAddress: string;
  lastContact?: Date;
}

@Injectable()
export class ServiceRegistry {
  constructor() {
    this.CheckAllService();
  }

  // Set variable
  private static config: {
    serviceName?: string;
    serviceId?: string;
    registryServer?: string;
    host?: string;
  } = {
    serviceName: "",
    serviceId: "",
    registryServer: "",
    host: "",
  };
  private listService: ServiceDescription[] = [];
  private readonly logger = new Logger(ServiceRegistry.name);

  /**
   * (API) Registering service to registry server.
   * @param config ServiceDescription
   */
  async ApiAddService(config: ServiceDescription) {
    let list: ServiceDescription[] = this.listService;
    let find: ServiceDescription = list.find((x) => x.serviceId == config.serviceId);
    if (!find) {
      list.push(config);

      // Add logger
      this.logger.log(`New service registered: ${config.name}`);
      this.logger.log(`-- Service ID: ${config.serviceId}`);
      this.logger.log(`-- Info: ${config.host} ${config.ipAddress}`);
    } else {
      let index = list.indexOf(find);
      this.listService[index].host = config.host;
      this.listService[index].lastContact = config.lastContact;
    }
  }

  /**
   * (API) Remove service by service id
   * @param serviceId string ServiceId
   * @returns Promise<boolean>
   */
  async ApiRemoveService(serviceId: string): Promise<boolean> {
    let list: ServiceDescription[] = this.listService;
    let find: ServiceDescription = list.find((x) => x.serviceId == serviceId);
    if (!find) {
      return false;
    }

    let index = list.indexOf(find);
    this.listService.splice(index, 1);

    // Add logger
    this.logger.log(`Service exited: ${find.name}`);
    this.logger.log(`-- Service ID: ${find.serviceId}`);
    this.logger.log(`-- Info: ${find.host} ${find.ipAddress}`);
    return true;
  }

  /**
   * (API) Show all available service
   * @returns Promise<ServiceDescription[]>
   */
  async ApiListAll(): Promise<ServiceDescription[]> {
    return this.listService;
  }

  /**
   * (API) Get one service by service name and nearest contacting time
   * @param serviceName string Service Name
   * @returns Promise<ServiceDescription>
   */
  async ApiGetService(serviceName: string): Promise<ServiceDescription> {
    let filter = this.listService.filter((x) => x.name == serviceName);
    let convertToMap: Date[] = filter.map((x) => x.lastContact);
    let index: number = nearest(convertToMap, new Date());
    return filter[index];
  }

  /**
   * (API) Get grouped service
   * @returns Promise<Record<string, ServiceDescription>>
   */
  async ApiGroupService(): Promise<Record<string, ServiceDescription>> {
    let groupService: Record<string, ServiceDescription> = {};
    for (const service of this.listService) {
      let name: string = service.name;
      if (!groupService.hasOwnProperty(name)) {
        groupService[name] = await this.ApiGetService(name);
      }
    }
    return groupService;
  }

  async CheckAllService(): Promise<boolean> {
    let self = this;
    setInterval(function () {
      if (self.listService.length > 0) {
        let fromTime = new Date();
        for (const service of self.listService) {
          if (!service?.lastContact) {
            continue;
          }
          let differenceTravel = fromTime.getTime() - service.lastContact.getTime();
          let seconds = Math.floor(differenceTravel / 1000);
          if (seconds >= 20) {
            self.ApiRemoveService(service.serviceId);
          }
        }
      }
    }, 5 * 1000);
    return true;
  }

  /**
   * Get one service
   * @param serviceName string Service Name
   * @returns Promise<ServiceDescription>
   */
  async GetService(serviceName: string): Promise<ServiceDescription> {
    let service: ServiceDescription = null;
    if (ServiceRegistryModule.mode == "server") {
      service = await this.ApiGetService(serviceName);
    } else {
      await axios
        .get<ServiceDescription>(
          [ServiceRegistry.config.registryServer, "service-registry", "list", serviceName].join(
            "/",
          ),
        )
        .then(function (resp) {
          service = resp.data;
        })
        .catch(function (error) {});
    }
    return service;
  }

  /**
   * Get grouped service
   * @returns Promise<Record<string, ServiceDescription>>
   */
  async GetServices(): Promise<Record<string, ServiceDescription>> {
    let service: Record<string, ServiceDescription> = null;
    if (ServiceRegistryModule.mode == "server") {
      service = await this.ApiGroupService();
    } else {
      await axios
        .get<Record<string, ServiceDescription>>(
          [ServiceRegistry.config.registryServer, "service-registry", "list", "group"].join("/"),
        )
        .then(function (resp) {
          service = resp.data;
        })
        .catch(function (error) {});
    }
    return service;
  }

  /**
   * Create new unique service id
   */
  static async setServiceId() {
    ServiceRegistry.config.serviceId = v4();
  }

  /**
   * Registering service to registry server.
   * @param app INestApplication
   * @param config.serviceName string Service Name
   * @param config.registryServer string Registry Server
   * @param config.host string Service Host
   * @returns Promise<boolean>
   */
  static async register(
    app: INestApplication,
    config: {
      serviceName: string;
      registryServer: string;
      host?: string;
    },
  ): Promise<boolean> {
    ServiceRegistry.config.serviceName = config.serviceName;
    ServiceRegistry.config.registryServer = config.registryServer;
    ServiceRegistry.config.host = config.host;

    let host = config.host ?? (await app.getUrl());
    const request = function () {
      let url = [config.registryServer, "service-registry", "register", config.serviceName].join(
        "/",
      );

      // Send request
      axios
        .get(url, {
          params: {
            host: host,
            id: ServiceRegistry.config.serviceId,
          },
        })
        .catch(function (error) {
          console.log(`Failed to connect registry '${url}'`);
        });
    };

    // Registering service
    request();
    setInterval(request, 15 * 1000);
    return true;
  }

  /**
   * Unregister service
   * @param serviceId string Service Id
   * @returns Promise<boolean>
   */
  static async unregister(): Promise<boolean> {
    let id = ServiceRegistry.config.serviceId;
    if (isEmpty(id)) {
      return true;
    }

    // Unregister service
    let success: boolean = false;
    await axios
      .get<ServiceDescription>(
        [ServiceRegistry.config.registryServer, "service-registry", "unregister", id].join("/"),
      )
      .then(function (resp) {
        success = true;
      })
      .catch(function (error) {});
    return success;
  }
}
