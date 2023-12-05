import { TPaginatedResult } from '@/base/base.model';
import { httpService } from '@/base/http-service';

import { TGetListLocationsInput, TLocationDto } from './location.model';

class LocationService {
  public async getListLocations(input: TGetListLocationsInput) {
    const result = await httpService.request<TPaginatedResult<TLocationDto>>({
      url: '/location/get-all',
      method: 'GET',
      params: input,
    });

    return result.data;
  }
}

const locationService = new LocationService();

export default locationService;
