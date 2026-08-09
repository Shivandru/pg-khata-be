import { BedService } from "../services/bed.service.js";
import { HttpStatusCodes } from "../utils/enums/http.js";
export class BedController {
    bedService;
    constructor(bedService) {
        this.bedService = bedService;
    }
    create = async (req, res) => {
        const { propertyId, roomId } = req.params;
        const bed = await this.bedService.create(roomId, propertyId);
        res.status(HttpStatusCodes.Success.CREATED).json(bed);
    };
    getBedsByRoom = async (req, res) => {
        const { roomId, propertyId } = req.params;
        const beds = await this.bedService.getBedsByRoom(roomId, propertyId);
        res.status(HttpStatusCodes.Success.OK).json(beds);
    };
    update = async (req, res) => {
        const { bedId, roomId, propertyId } = req.params;
        const bed = await this.bedService.update({ bedId, propertyId, roomId, updateData: req.body });
        res.status(HttpStatusCodes.Success.OK).json(bed);
    };
    delete = async (req, res) => {
        const { bedId, roomId, propertyId } = req.params;
        const result = await this.bedService.delete(bedId, propertyId, roomId);
        res.status(HttpStatusCodes.Success.OK).json(result);
    };
}
//# sourceMappingURL=bed.controller.js.map