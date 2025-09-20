import { Type } from "@nestjs/common";
import { IntersectionType, PartialType, PickType } from "@nestjs/swagger";

/**
 * @param model - 대상 클래스(Model DTO)
 * @param pickFpickields - 필수로 가져올 필드 배열
 * @param optional - optional로 만들 필드 배열
 */
export function CreateDtoFromModel<
  T,
  P extends readonly (keyof T)[] = [],
  O extends readonly (keyof T)[] = [],
>({
  model,
  pick,
  optional,
}: {
  model: Type<T>;
  pick: P;
  optional: O;
}): Type<Pick<T, P[number]> & Partial<Pick<T, O[number]>>> {
  // 필수 필드만 pick
  const BaseMandatory = pick.length ? PickType(model, pick as readonly (keyof T)[]) : model;

  // optional 필드 pick
  const BaseOptional = optional.length
    ? PickType(PartialType(model), optional as readonly (keyof T)[])
    : class {};

  return IntersectionType(BaseMandatory, BaseOptional) as Type<
    Pick<T, P[number]> & Partial<Pick<T, O[number]>>
  >;
}
