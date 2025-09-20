import { MetaDto } from "../dto/list-response.dto";

export class CommonSerivce {
  constructor(private readonly constant: Constnat) {}

  protected get Name(): string {
    return `${this.constant.NAME}`;
  }

  getMetaData({ page, take, totalCount }: IMetaDataRequest): MetaDto {
    const totalPages = Math.ceil(totalCount / take);

    return {
      totalCount,
      page,
      limit: take,
      totalPages,
    };
  }
}

interface IMetaDataRequest {
  page: number;
  take: number;
  totalCount: number;
}

interface Constnat {
  NAME: string;
}
