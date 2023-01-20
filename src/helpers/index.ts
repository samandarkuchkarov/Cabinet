export * from './create-theme';
export * from './storage';
export * from './parse-tariff';

export const getUserStatus = (internetStatus: any, status: any) => {
  const res = +status;
  if (internetStatus !== 0) {
    return 'Disabled';
  }
  switch (res) {
    case 0:
      return 'Actived';
    case 1:
      return 'Disabled';
    case 2:
      return 'Not activated';
    case 3:
      return 'Suspended';
    case 5:
      return 'SMD';
  }
  return 'undefined';
};

export function toStringDate(t: any, time = false) {
  const res = t.toLocaleDateString('ru');
  t.setHours(t.getHours() + 2);
  if (time) {
    return `${t.toLocaleTimeString('ru')} - ${t.toLocaleDateString('ru')}`;
  }
  return res;
}
export function getCurrentMonthToDate(first = true, monthAdd = 0) {
  const date = new Date();
  if (first) {
    const firstDay = new Date(
      date.getFullYear(),
      date.getMonth() + monthAdd,
      1,
    );
    return firstDay;
  } else {
    const lastDay = new Date(date.getFullYear(), date.getMonth() + monthAdd, 0);
    return lastDay;
  }
}
export function toDate(dateStr: any) {
  if (!dateStr) {
    return;
  }
  if (dateStr === '0000-00-00') {
    return getCurrentMonthToDate();
  }
  const parts = dateStr.includes('.')
    ? dateStr.split('.')
    : dateStr.split('-').reverse();
  return new Date(parts[2], parts[1] - 1, parts[0]);
}

export function getCurrentMonthDate(first = true, monthAdd = 0) {
  const date = new Date();
  if (first) {
    const firstDay = new Date(
      date.getFullYear(),
      date.getMonth() + monthAdd,
      1,
    );
    return toStringDate(firstDay);
  } else {
    const lastDay = new Date(date.getFullYear(), date.getMonth() + monthAdd, 0);
    return toStringDate(lastDay);
  }
}
export function modifyDate(date: string) {
  if (!date) {
    return;
  }
  return date.split('-').reverse().join('.');
}

export function intervalBetweenDate(t1: any, t2: any) {
  if (!t1 || !t2) {
    return {};
  }

  const date1: any = toDate(t1);
  const date2: any = toDate(t2);
  if (date1 > date2) {
    return {days: 0};
  }

  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return {days: diffDays};
}

export function getCurrentDate() {
  const t = new Date();
  const month =
    t.getMonth() + 1 < 10 ? '0' + (t.getMonth() + 1) : t.getMonth() + 1;
  const date = t.getDate() < 10 ? '0' + t.getDate() : t.getDate();
  return `${date}.${month}.${t.getFullYear()}`;
}

export function addToMonth(date: string, month = 1) {
  if (!date) {
    return '';
  }
  const t = toDate(date);
  if (month === -1) {
    t?.setMonth(new Date().getMonth() + 1);
    return toStringDate(t);
  }
  t?.setMonth(t.getMonth() + month);
  return toStringDate(t);
}

export const convertToFullDate = (internetActivate: string) =>
  internetActivate === '0000-00-00'
    ? getCurrentMonthDate()
    : modifyDate(internetActivate);

export const getLastDays = (internetActivate: string) => {
  const nextDate =
    internetActivate === '0000-00-00'
      ? getCurrentMonthDate(true, 1)
      : addToMonth(internetActivate);
  return internetActivate === '0000-00-00'
    ? intervalBetweenDate(
        getCurrentDate(),
        addToMonth(getCurrentMonthDate(), 1),
      ).days
    : intervalBetweenDate(getCurrentDate(), nextDate).days;
};

export function convertToCurrency(amount: number) {
  if (!amount) {
    return 0;
  }

  const result = [];
  const temp = amount.toString().split('').reverse();
  for (let i = 0; i < temp.length; i++) {
    const letter = temp[i];
    result.unshift(letter);
    if ((i + 1) % 3 === 0) {
      result.unshift(' ');
    }
  }

  return result.join('');
}

export const getNextPay = (
  monthleFee: number,
  reduction: number,
  deposit: number,
) => {
  const withoutSkidkaPriceTariff = monthleFee - (monthleFee / 100) * reduction;
  if (withoutSkidkaPriceTariff < deposit) {
    return 0;
  } else {
    return withoutSkidkaPriceTariff - deposit;
  }
};

export const formatDate = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};

export function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) {
    return '0 Bytes';
  }

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
