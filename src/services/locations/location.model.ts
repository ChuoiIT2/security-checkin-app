import { TPaginatedInput } from '@/base/base.model';

export type TGetListLocationsInput = TPaginatedInput;

export type TLocationDto = {
  id: number;
  name: string;
  longitude: number;
  latitude: number;
  address: string;
  description?: string;
};
