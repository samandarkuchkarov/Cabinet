import {allTariffsProps} from '@app/store/reducers/user';
export type parseTariffProps = {
  mainSpeed: number;
  mainSpeedDesc: string;
  secondSpeedDesc: string;
  secondSpeed: number;
  tasixDesc: string;
  tasixSpeed: number;
  monthly: number;
  name: string;
  tpId: number;
};
export const parseTariff = (text: string, tariff: allTariffsProps) => {
  let data = text.split('|');
  let monthly = Number(data[1].replace(/\D/g, ''));
  let mainSpeedList = data[2].split(':');
  let mainSpeedDesc = mainSpeedList[0].substring(1);
  let mainSpeed = mainSpeedList[1].replace(/\D/g, '');
  let secondSpeedList = data[3].split(':');
  let secondSpeedDesc = secondSpeedList[0].substring(1);
  let secondSpeed = secondSpeedList[1].replace(/\D/g, '');
  let tasixList = data[4].split(':');
  let tasixDesc = tasixList[0].substring(1);
  let tasixSpeed = tasixList[1].replace(/\D/g, '');
  return {
    mainSpeed: Number(mainSpeed),
    mainSpeedDesc,
    secondSpeedDesc,
    secondSpeed: Number(secondSpeed),
    tasixDesc,
    tasixSpeed: Number(tasixSpeed),
    monthly,
    name: tariff.name,
    tpId: tariff.tpId,
  };
};
