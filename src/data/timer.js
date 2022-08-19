export const Timer = [
  '1 minutes',
  '5 minutes',
  '10 minutes',
  '15 minutes',
  '30 minutes',
  '1 hour',
];

export const minute = [
  '00',
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '30',
  '31',
  '32',
  '33',
  '34',
  '35',
  '36',
  '37',
  '38',
  '39',
  '40',
  '41',
  '42',
  '43',
  '44',
  '45',
  '46',
  '47',
  '48',
  '49',
  '50',
  '51',
  '52',
  '53',
  '54',
  '55',
  '56',
  '57',
  '58',
  '59',
];
export const hour = [
  '00',
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
];
export function range(start, end) {
  return Array(end - start + 1)
    .fill()
    .map((_, idx) => start + idx);
}

export function minutesToMiliSeconds(minutes) {
  return minutes * 60 * 1000;
}
export function hoursToMiliSeconds(hour) {
  return hour * 60 * 60 * 1000;
}

export function minutesToSeconds(minutes) {
  return minutes * 60;
}
export function hoursToSeconds(hour) {
  return hour * 60 * 60;
}
