import { Grid } from 'antd-mobile';

import { TLocationDto } from '@/services/locations/location.model';

const DialogListItem = ({ title, value }: { title: string; value: string }) => {
  return (
    <>
      <Grid.Item span={1} className="text-slate-500 text-sm">
        {title}
      </Grid.Item>
      <Grid.Item span={2} className="text-end">
        {value}
      </Grid.Item>
    </>
  );
};

type TLocationDetailViewProps = {
  location: TLocationDto;
  showDescription?: boolean;
};

const LocationDetailView = (props: TLocationDetailViewProps) => {
  const location = props.location;
  const showDescription = props.showDescription ?? false;

  return (
    <Grid columns={3}>
      {[
        { title: 'Name', value: location.name },
        { title: 'Address', value: location.address },
        { title: 'Latitude', value: location.latitude },
        { title: 'Longitude', value: location.longitude },
      ].map((item) => (
        <DialogListItem key={item.title} {...item} />
      ))}

      {showDescription && (
        <>
          <Grid.Item span={1} className="text-slate-500 text-sm">
            Description
          </Grid.Item>
          <Grid.Item span={3} className="mt-2 text-slate-600 text-sm">
            {location.description}
          </Grid.Item>
        </>
      )}
    </Grid>
  );
};

export default LocationDetailView;
