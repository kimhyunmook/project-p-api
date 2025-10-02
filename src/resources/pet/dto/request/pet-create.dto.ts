import { PetModel } from "../../models/pet.model";
import { IPetCreate } from "../../pet.type";
import { CreateDtoFromModel } from "src/common/helpers/create-from-model.dto";

export class PetCreateDto
  extends CreateDtoFromModel({
    model: PetModel,
    pick: ["type", "name", "age", "ownerId"],
    optional: ["categoryId", "tagId"],
  })
  implements IPetCreate {}
