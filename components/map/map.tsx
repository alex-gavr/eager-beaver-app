'use client';
import { YMaps, Map, Placemark, GeolocationControl, ZoomControl } from '@pbe/react-yandex-maps';
import { FC, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useWindowSize } from 'usehooks-ts';

interface IProps {
  style?: any;
  widthMobile: number;
  widthDesktop: number;
  heightMobile: number;
  heightDesktop: number;
  latitude?: number;
  longitude?: number;
}

const SchoolLocationMap: FC<IProps> = ({
  style,
  widthMobile,
  widthDesktop,
  heightMobile,
  heightDesktop,
  latitude,
  longitude,
}) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const { width } = useWindowSize();
  const options = {
    iconLayout: 'default#image',
    // Custom image for the placemark icon.
    iconImageHref: '/cool.svg',
    // The size of the placemark.
    iconImageSize: [60, 60],
  };
  return (
    <YMaps>
      <div
        style={style}
        className='relative flex h-[300px] w-[300px] items-center justify-center lg:h-[550px] lg:w-[550px]'
      >
        {!mapLoaded && (
          <Skeleton
            width={width < 1024 ? widthMobile : widthDesktop}
            height={width < 1024 ? heightMobile : heightDesktop}
            // className='z-[888] absolute top-0 left-0'
            style={{ zIndex: 888, position: 'absolute', top: 0, left: 0 }}
          />
        )}
        <Map
          onLoad={() => setMapLoaded(true)}
          style={{
            width: width < 1024 ? widthMobile : widthDesktop,
            height: width < 1024 ? heightMobile : heightDesktop,
          }}
          defaultState={{
            center: [latitude ? latitude : 48.699778, longitude ? longitude : 44.505735],
            zoom: 17,
          }}
        >
          <Placemark
            geometry={[latitude ? latitude : 48.699778, longitude ? longitude : 44.505735]}
            options={options}
          />
          <GeolocationControl
            options={{
              float: 'left',
            }}
          />
          <ZoomControl
            options={{
              position: { right: '10px', bottom: '80px' },
            }}
          />
        </Map>
      </div>
    </YMaps>
  );
};

export default SchoolLocationMap;
