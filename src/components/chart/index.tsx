/* eslint-disable react-native/no-inline-styles */

import React, {useEffect, useState} from 'react';

import {Text, TouchableWithoutFeedback, View} from 'react-native';
import {LineChart} from 'react-native-gifted-charts';

import {createTheme} from '@app/helpers';
import {formatDate} from '@app/helpers';

import {ChartsData} from './data';

export const Charts = () => {
  const [dayData, setDayData] = useState<{value: number}[]>([]);
  const [recivedData, setRecivedData] = useState<{value: number}[]>([]);
  const customLabel = (val: string) => {
    return (
      <View style={{width: 70, marginLeft: 7}}>
        <Text>{val}</Text>
      </View>
    );
  };
  useEffect(() => {
    const today = new Date('2022-08-15 13:56:01');
    const data = ChartsData.filter(
      i => formatDate(new Date(i[0])) === formatDate(today),
    );
    data.reverse();
    const lengthData = data.length;
    const divede = Math.trunc(lengthData / 30);
    let dayDatas = [];
    for (let i = 0; i < lengthData; i = i + divede) {
      dayDatas.push(data[i]);
    }
    let recive: {value: number}[] = [];
    dayDatas = dayDatas.map((i, index) => {
      if (index % 5 === 0) {
        let minute = `${new Date(i[0]).getMinutes()}`;
        minute = `${minute}`.length < 2 ? `0${minute}` : `${minute}`;
        let hour = `${new Date(i[0]).getHours()}`;
        hour = `${hour}`.length < 2 ? `0${hour}` : `${hour}`;
        recive.push({
          value: Number((Number(i[4]) / (1024 * 1024)).toFixed(0)),
        });
        return {
          value: Number((Number(i[3]) / (1024 * 1024)).toFixed(0)),
          label: customLabel(`${hour}:${minute}`),
        };
      }
      recive.push({value: Number((Number(i[4]) / (1024 * 1024)).toFixed(0))});
      return {value: Number((Number(i[3]) / (1024 * 1024)).toFixed(0))};
    });
    setRecivedData(recive);
    setDayData(dayDatas);
  }, []);

  return (
    <View style={styles.container}>
      {dayData.length ? (
        <>
          <LineChart
            areaChart
            curved
            data={dayData}
            data2={recivedData}
            height={250}
            showVerticalLines
            spacing={20}
            initialSpacing={0}
            color1="#6bca3f"
            color2="#F35459"
            textColor1="green"
            hideDataPoints
            dataPointsColor1="blue"
            dataPointsColor2="red"
            startFillColor1="#6bca3f"
            startFillColor2="#F35459"
            startOpacity={0.2}
            noOfSections={4}
            endOpacity={0.2}
          />
          <View style={styles.content}>
            <TouchableWithoutFeedback>
              <View>
                <Text>Получено</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <View>
                <Text>Отправлено</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </>
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = createTheme({
  container: {
    marginTop: 20,
    marginBottom: 60,
    marginLeft: -20,
  },
  chart: {
    width: '100%',
    height: 200,
  },
  content: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 30,
    padding: 20,
    justifyContent: 'space-around',
    marginBottom: 20,
  },
});
