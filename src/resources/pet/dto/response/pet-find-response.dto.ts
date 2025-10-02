import { OmitType } from "@nestjs/swagger";
import { PetModel } from "../../models/pet.model";
import { ResponseDto } from "src/common/dto/response.dto";
import { ListResponseDto } from "src/common/dto/list-response.dto";

/** Unique */
export class PetFindUniqueResponseDto extends ResponseDto {
  data: PetFindUniqueData;
}
class PetFindUniqueData extends OmitType(PetModel, []) {}

/** List */
export class PetFindManyResponseDto extends ListResponseDto {
  data: PetFindManyData[];
}
class PetFindManyData extends OmitType(PetModel, []) {}
