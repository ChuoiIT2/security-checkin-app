import { TPaginatedInput } from '@/base/base.model';

import { TLocationDto } from '../locations/location.model';

export type TCheckinDto = {
  id: number;
  time: string | Date;
  location: TLocationDto;
  user: {
    id: number;
    name: string;
    email: string;
    username: string;
    phoneNumber: string;
  };
};

export type TGetListCheckinsInput = TPaginatedInput;

export type TCreateCheckinInput = {
  locationId: number;
  userId: number;
};
