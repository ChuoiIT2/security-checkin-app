import { TPaginatedInput } from '@/base/base.model';

export type TGetListLocationsInput = TPaginatedInput;

export type TLocationDto = {
  id: number;
  name: string;
  longitude: string;
  latitude: string;
  address: string;
  description?: string;
};
