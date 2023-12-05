import { TPaginatedResult } from '@/base/base.model';
import { httpService } from '@/base/http-service';

import {
  TCheckinDto,
  TCreateCheckinInput,
  TGetListCheckinsInput,
} from './checkin.model';

class CheckinService {
  public async getListCheckin(input: TGetListCheckinsInput) {
    const result = await httpService.request<TPaginatedResult<TCheckinDto>>({
      url: '/check-ins/get-many',
      method: 'GET',
      params: input,
    });

    return result.data;
  }

  public async createCheckin(input: TCreateCheckinInput) {
    const result = await httpService.request<TCheckinDto>({
      url: '/check-ins/create',
      method: 'POST',
      data: input,
    });

    return result.data;
  }
}

const checkinService = new CheckinService();

export default checkinService;
