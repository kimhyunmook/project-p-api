import { IntersectionType, OmitType, PartialType, PickType } from "@nestjs/swagger";
import { PetCreateDto } from "./pet-create.dto";
import { IPetUpdate } from "../../pet.type";
import { PetModel } from "../../models/pet.model";

export class PetUpdateDto
  extends IntersectionType(PickType(PetModel, ["id"]), OmitType(PartialType(PetCreateDto), []))
  implements IPetUpdate {}
