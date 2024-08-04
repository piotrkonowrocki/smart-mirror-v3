import {
  IconAlertTriangle,
  IconBolt,
  IconCircles,
  IconDroplet,
  IconFaceMask,
  IconFlame,
  IconGrain,
  IconMist,
  IconMountain,
  IconRipple,
  IconSnowflake,
  IconTemperatureMinus,
  IconTemperaturePlus,
  IconTornado,
  IconWind,
  TablerIcon,
} from '@tabler/icons-react'

const openWeatherAlertTagData: {
  icon: TablerIcon
  tags: string[]
}[] = [
  {
    icon: IconRipple,
    tags: ['coastal event', 'flood', 'marine event'],
  },
  {
    icon: IconTemperaturePlus,
    tags: ['extreme high temperature'],
  },
  {
    icon: IconTemperatureMinus,
    tags: ['extreme low temperature'],
  },
  {
    icon: IconWind,
    tags: ['wind'],
  },
  {
    icon: IconGrain,
    tags: ['sand dust'],
  },
  {
    icon: IconDroplet,
    tags: ['rain'],
  },
  {
    icon: IconFlame,
    tags: ['fire warning'],
  },
  {
    icon: IconMountain,
    tags: ['avalanches'],
  },
  {
    icon: IconMist,
    tags: ['fog'],
  },
  {
    icon: IconFaceMask,
    tags: ['air quality'],
  },
  {
    icon: IconTornado,
    tags: ['tornado', 'cyclone'],
  },
  {
    icon: IconSnowflake,
    tags: ['snow ice'],
  },
  {
    icon: IconBolt,
    tags: ['thunderstorm'],
  },
  {
    icon: IconCircles,
    tags: ['hail'],
  },
]

export const getAlertIcon = (openWeatherAlertTag: string) => {
  return openWeatherAlertTagData.find(({tags}) => tags.includes(openWeatherAlertTag.toLowerCase()))?.icon ?? IconAlertTriangle
}
