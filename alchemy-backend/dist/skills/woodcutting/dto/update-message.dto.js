"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMessageDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const woodcutting_dto_1 = require("./woodcutting.dto");
class UpdateMessageDto extends (0, mapped_types_1.PartialType)(woodcutting_dto_1.CreateMessageDto) {
}
exports.UpdateMessageDto = UpdateMessageDto;
//# sourceMappingURL=update-message.dto.js.map