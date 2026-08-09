import { RoomService } from "../services/room.service.js";
import { HttpStatusCodes } from "../utils/enums/http.js";
export class RoomController {
    roomService;
    constructor(roomService) {
        this.roomService = roomService;
    }
    create = async (req, res) => {
        const { propertyId } = req.params;
        const { roomNumber, floor, bedCount, occupiedCount } = req.body;
        const room = await this.roomService.create({ propertyId, roomNumber, floor, bedCount, occupiedCount });
        res.status(HttpStatusCodes.Success.CREATED).json(room);
    };
    getRoomsByProperty = async (req, res) => {
        const { propertyId } = req.params;
        const rooms = await this.roomService.getRoomsByProperty(propertyId);
        res.status(HttpStatusCodes.Success.OK).json(rooms);
    };
    getRoomById = async (req, res) => {
        const { roomId, propertyId } = req.params;
        const room = await this.roomService.getById({ propertyId, roomId });
        res.status(HttpStatusCodes.Success.OK).json(room);
    };
    update = async (req, res) => {
        const { roomId, propertyId } = req.params;
        const updateData = req.body;
        const room = await this.roomService.update({ roomId, propertyId, updateData });
        res.status(HttpStatusCodes.Success.OK).json(room);
    };
    delete = async (req, res) => {
        const { roomId, propertyId } = req.params;
        const result = await this.roomService.delete({ roomId, propertyId });
        res.status(HttpStatusCodes.Success.OK).json(result);
    };
}
//# sourceMappingURL=room.controller.js.map