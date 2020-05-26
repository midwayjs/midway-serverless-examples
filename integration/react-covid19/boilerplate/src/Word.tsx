import {
  LayerEvent,
  LineLayer,
  MapboxScene,
  PointLayer,
  PolygonLayer,
  Popup,
} from '@antv/l7-react';
import './word.css';
import * as React from 'react';
function joinData(geodata: any, ncovData: any) {
  const ncovDataObj: any = {};
  ncovData.forEach((item: any) => {
    const {
      countryName,
      provinceName,
      countryEnglishName,
      currentConfirmedCount,
      confirmedCount,
      suspectedCount,
      curedCount,
      deadCount,
    } = item;
    if (countryName === provinceName) {
      ncovDataObj[countryName] = {
        countryName,
        countryEnglishName,
        currentConfirmedCount,
        confirmedCount,
        pointCount: confirmedCount > 10000 ? 10000: confirmedCount,
        suspectedCount,
        curedCount,
        deadCount,
      };
    }
  });
  const geoObj: any = {};
  geodata.features.forEach((feature: any) => {
    const { name } = feature.properties;
    geoObj[name] = feature.properties;
    const ncov = ncovDataObj[name] || {};
    feature.properties = {
      ...feature.properties,
      ...ncov,
    };
  });
  return geodata;
}

function numFormat(num: any) {
  return num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
}

export default React.memo(function Map() {
  const [data, setData] = React.useState();
  const [filldata, setfillData] = React.useState();
  const [popupInfo, setPopupInfo] = React.useState<{
    lnglat: number[];
    feature: any;
  }>();
  React.useEffect(() => {
    const fetchData = async () => {
      const [geoData, ncovData] = await Promise.all([
        fetch(
          'https://gw.alipayobjects.com/os/bmw-prod/e62a2f3b-ea99-4c98-9314-01d7c886263d.json',
        ).then((d) => d.json()),
        fetch(
          '/api/index',
        ).then((d) => d.json()),
      ]);
      const worldData = joinData(geoData, ncovData.results);
      const pointdata = worldData.features.map((feature: any) => {
        return feature.properties;
      });
      setfillData(worldData);
      setData(pointdata);
    };
    fetchData();
  }, []);
  function showPopup(args: any): void {
    setPopupInfo({
      lnglat: args.lngLat,
      feature: args.feature,
    });
  }

  let total = 0;
  const allCounts: any = [];
  filldata && filldata.features.forEach((item: any) => {
    if (item && item.properties && item.properties.countryName && item.properties.confirmedCount) {
      total += item.properties.confirmedCount;
      allCounts.push({
        countryName: item.properties.countryName,
        count: item.properties.confirmedCount,
      });
    }
  })
  allCounts.sort((a: any,b: any) => {
    return b.count - a.count;
  })

  return (
    <>
      <div className='wordCount'>
        <div className='wordCountSize'>
          <div>Total Confirmed</div>
          <div className='wordCountNumber'>{ total ? numFormat(total) : 'Loading...' }</div>
        </div>
        <div className='wordList'>
          {
            allCounts.map((item: any) => {
              return <div className='wordItem'><span>{ numFormat(item.count) }</span>{ item.countryName }</div>
            })
          }
        </div>
        <div className='bottom'>数据非实时 Powered by <a href='https://github.com/midwayjs/midway-faas/' rel="noopener noreferrer" target='_blank'>Midway FaaS</a></div>
      </div>
      <MapboxScene
        map={{
          center: [110.19382669582967, 50.258134],
          pitch: 0,
          style: 'blank',
          zoom: 1,
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        {popupInfo && (
          <Popup lnglat={popupInfo.lnglat}>
            {popupInfo.feature.name}
            <ul
              style={{
                margin: 0,
              }}
            >
              <li>现有确诊:{popupInfo.feature.currentConfirmedCount}</li>
              <li>累计确诊:{popupInfo.feature.confirmedCount}</li>
              <li>治愈:{popupInfo.feature.curedCount}</li>
              <li>死亡:{popupInfo.feature.deadCount}</li>
            </ul>
          </Popup>
        )}
        {data && [
          <PolygonLayer
            key={'1'}
            options={{
              autoFit: false,
            }}
            source={{
              data: filldata,
            }}
            scale={{
              values: {
                confirmedCount: {
                  type: 'quantile',
                },
              },
            }}
            color={{
              values: '#ddd',
            }}
            shape={{
              values: 'fill',
            }}
            style={{
              opacity: 1,
            }}
          />,
          <LineLayer
            key={'3'}
            source={{
              data: filldata,
            }}
            size={{
              values: 0.6,
            }}
            color={{
              values: '#fff',
            }}
            shape={{
              values: 'line',
            }}
            style={{
              opacity: 1,
            }}
          />,
          <PointLayer
            key={'2'}
            options={{
              autoFit: true,
            }}
            source={{
              data,
              parser: {
                type: 'json',
                coordinates: 'centroid',
              },
            }}
            scale={{
              values: {
                confirmedCount: {
                  type: 'log',
                },
              },
            }}
            color={{
              values: '#b10026',
            }}
            shape={{
              values: 'circle',
            }}
            active={{
              option: {
                color: '#0c2c84',
              },
            }}
            size={{
              field: 'pointCount',
              values: [5, 50],
            }}
            animate={{
              enable: true,
            }}
            style={{
              opacity: 0.6,
            }}
          >
            <LayerEvent type="mousemove" handler={showPopup} />
          </PointLayer>,
        ]}
      </MapboxScene>
    </>
  );
});
