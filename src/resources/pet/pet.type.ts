import { PetCreateDto } from "./dto/request/pet-create.dto";
import { PetFindManyDto, PetFindUniqueDto } from "./dto/request/pet-find.dto";
import { PetUpdateDto } from "./dto/request/pet-update.dto";

/** create */
export interface IPetCreate extends PetCreateDto {}

/** find */
export interface IPetFindUnique extends PetFindUniqueDto {}
export interface IPetFindMany extends PetFindManyDto {}

/** update */
export interface IPetUpdate extends PetUpdateDto {}
