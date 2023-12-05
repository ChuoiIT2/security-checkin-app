import { TPaginatedResult } from '@/base/base.model';
import { httpService } from '@/base/http-service';

import { TCheckinDto, TGetListCheckinsInput } from './checkin.model';

class CheckinService {
  public async getListCheckin(input: TGetListCheckinsInput) {
    const result = await httpService.request<TPaginatedResult<TCheckinDto>>({
      url: '/check-ins/get-many',
      method: 'GET',
      params: input,
    });

    return result.data;
  }
}

const checkinService = new CheckinService();

export default checkinService;
