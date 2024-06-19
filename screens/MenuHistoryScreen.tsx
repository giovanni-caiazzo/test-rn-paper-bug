import React, {useEffect, useState} from 'react';
import {Surface, Text, useTheme} from 'react-native-paper';
import {SectionList, StyleSheet} from 'react-native';
import ErrorBoundary from 'react-native-error-boundary';
import CustomErrorBoundary from '../components/CustomErrorBoundary';
import MenuHistoryItem from '../components/MenuHistoryItem';
import Constants from 'expo-constants';
export type MenuItem = {
  id: string;
  date: number;
  p: string;
  c: string;
};

const const_days = [
  {
    title: 'dic 2021',
    data: [
      {
        c: 'riso pollo al curry',
        date: 1639962000,
        p: 'ombrina e cavolo nero',
        id: '20-12-21',
      },
      {
        c: 'avanzi',
        p: 'aglio olio',
        date: 1639616400,
        id: '16-12-21',
      },
      {
        c: 'avanzi',
        p: 'pasta tonno e olive',
        date: 1639530000,
        id: '15-12-21',
      },
      {
        c: 'cavolini e uova',
        date: 1639443600,
        p: 'rombolino e cavolfiore al forno',
        id: '14-12-21',
      },
      {
        c: 'zuppa di legumi',
        p: 'Milano',
        date: 1639357200,
        id: '13-12-21',
      },
      {
        c: 'avanzi',
        date: 1639011600,
        p: 'fiera artigianato',
        id: '09-12-21',
      },
      {
        c: 'pizza leo',
        p: 'Gianna',
        date: 1638925200,
        id: '08-12-21',
      },
      {
        c: 'minestrone',
        p: 'pasta al pesto',
        date: 1638838800,
        id: '07-12-21',
      },
      {
        c: 'melanzane con avanzo di ragù',
        date: 1638752400,
        p: 'rombolino e cavolfiore al forno',
        id: '06-12-21',
      },
      {
        c: 'seppiaburger e cavolo nero',
        p: 'tagliatelle al ragù',
        date: 1638666000,
        id: '05-12-21',
      },
      {
        c: 'salmone riso e avocado',
        date: 1638406800,
        p: 'carbonara',
        id: '02-12-21',
      },
      {
        c: 'avanzi',
        p: 'ravioli',
        date: 1638320400,
        id: '01-12-21',
      },
    ],
  },
  {
    title: 'nov 2021',
    data: [
      {
        c: 'melanzane e hummus',
        date: 1638234000,
        p: 'pasta e fagioli',
        id: '30-11-21',
      },
      {
        c: 'tonno fresco e cavolfiore',
        date: 1638147600,
        p: 'risotto giallo con salsiccia',
        id: '29-11-21',
      },
      {
        c: 'ramen',
        date: 1637802000,
        p: 'avanzi',
        id: '25-11-21',
      },
      {
        c: 'torta salata',
        date: 1637715600,
        p: 'pasta lenticchie',
        id: '24-11-21',
      },
      {
        c: 'riso e salmone',
        p: 'minestrone',
        date: 1637629200,
        id: '23-11-21',
      },
      {
        c: 'zuppa legumi',
        p: 'pasta cozze',
        date: 1637542800,
        id: '22-11-21',
      },
      {
        c: 'spezzatino e patate',
        date: 1637197200,
        p: 'pasta cozze',
        id: '18-11-21',
      },
      {
        c: 'avanzi',
        p: 'ravioli',
        date: 1637110800,
        id: '17-11-21',
      },
      {
        c: 'polpette e piselli',
        p: 'pasta zucchina e gamberetti',
        date: 1637024400,
        id: '16-11-21',
      },
      {
        c: 'farinata',
        date: 1636938000,
        p: 'risotto giallo con funghi',
        id: '15-11-21',
      },
      {
        c: 'zuppa legumi',
        p: 'pasta melanzane',
        date: 1636592400,
        id: '11-11-21',
      },
    ],
  },
  {
    title: 'ott 2021',
    data: [
      {
        c: 'avanzi',
        date: 1634774400,
        p: 'aglio olio',
        id: '21-10-21',
      },
      {
        c: 'riso e pollo al curry',
        p: 'piada',
        date: 1634688000,
        id: '20-10-21',
      },
      {
        c: 'minestrone',
        p: 'pasta pesto',
        date: 1634601600,
        id: '19-10-21',
      },
      {
        c: 'zucca arrosto con filetto',
        date: 1634515200,
        p: 'hummus e melanenzane',
        id: '18-10-21',
      },
      {
        c: 'avanzi',
        p: 'aglio olio',
        date: 1634169600,
        id: '14-10-21',
      },
      {
        c: 'vellutata di porri',
        p: 'melanzane parmigiana',
        date: 1634083200,
        id: '13-10-21',
      },
      {
        c: 'farinata',
        date: 1633996800,
        p: 'ravioli',
        id: '12-10-21',
      },
      {
        c: 'cavolfiore e trota',
        date: 1633910400,
        p: 'pasta melanzane',
        id: '11-10-21',
      },
    ],
  },
  {
    title: 'set 2021',
    data: [
      {
        c: 'avanzi',
        date: 1632960000,
        p: 'pasta melanzane',
        id: '30-09-21',
      },
      {
        c: 'farinata',
        date: 1632873600,
        p: 'risotto',
        id: '29-09-21',
      },
      {
        c: 'frutta',
        date: 1632787200,
        p: "Castell'Arquato",
        id: '28-09-21',
      },
      {
        c: 'Walter',
        p: 'pasta pomodorini e gamberi',
        date: 1632700800,
        id: '27-09-21',
      },
      {
        c: 'avanzi',
        date: 1632355200,
        p: 'avanzi',
        id: '23-09-21',
      },
      {
        c: 'minestrone',
        date: 1632268800,
        p: 'pasta funghi',
        id: '22-09-21',
      },
      {
        c: 'canederli',
        date: 1632182400,
        p: 'pollo al curry',
        id: '21-09-21',
      },
      {
        c: 'torta salata',
        p: 'ravioli',
        date: 1632096000,
        id: '20-09-21',
      },
      {
        c: 'avanzi',
        date: 1631750400,
        p: 'aglio olio',
        id: '16-09-21',
      },
      {
        c: 'farinata',
        date: 1631664000,
        p: 'pasta pesto',
        id: '15-09-21',
      },
      {
        c: 'risotto con funghi',
        date: 1631577600,
        p: 'spaghetti pomodori e gamberi',
        id: '14-09-21',
      },
      {
        c: 'zuppa legumi',
        date: 1631491200,
        p: 'insalatona',
        id: '13-09-21',
      },
      {
        c: 'avanzi avanzi',
        date: 1631059200,
        p: 'ravioli',
        id: '08-09-21',
      },
      {
        c: 'pomodori e mozzarella',
        p: 'curry di lenticchie',
        date: 1630972800,
        id: '07-09-21',
      },
      {
        c: 'torta salata',
        date: 1630886400,
        p: 'insalatona',
        id: '06-09-21',
      },
      {
        c: 'avanzi',
        date: 1630540800,
        p: 'matrimonio',
        id: '02-09-21',
      },
      {
        c: 'riso e salmone',
        p: 'pasta e lenticchie',
        date: 1630454400,
        id: '01-09-21',
      },
    ],
  },
  {
    title: 'ago 2021',
    data: [
      {
        c: 'polpette e insalata e cetriolo',
        p: 'spaghetti al pomodoro',
        date: 1630368000,
        id: '31-08-21',
      },
      {
        c: 'pinsa',
        date: 1630281600,
        p: 'insalatona',
        id: '30-08-21',
      },
      {
        c: 'avanzi',
        date: 1629936000,
        p: 'pasta cozze',
        id: '26-08-21',
      },
      {
        c: 'farinata',
        p: 'pasta alla norma',
        date: 1629849600,
        id: '25-08-21',
      },
      {
        c: 'pizza Leo',
        date: 1629763200,
        p: 'insalatona',
        id: '24-08-21',
      },
      {
        c: 'mozzarella e pomodorini (+ pizza avanzata)',
        p: 'riso saltato con pollo mandorle e zenzero',
        date: 1629676800,
        id: '23-08-21',
      },
      {
        c: 'hamburger veggie e insalata',
        p: 'farro carota e zucchina',
        date: 1629590400,
        id: '22-08-21',
      },
      {
        c: 'avanzi',
        date: 1629331200,
        p: 'riso curry gamberi',
        id: '19-08-21',
      },
      {
        c: 'hummus',
        p: 'sushiii',
        date: 1629244800,
        id: '18-08-21',
      },
      {
        c: 'risotto giallo con funghi',
        p: 'insalatona',
        date: 1629158400,
        id: '17-08-21',
      },
      {
        c: 'seppia burger con insalata e pomodorini',
        p: 'farro',
        date: 1629072000,
        id: '16-08-21',
      },
      {
        c: 'nonna Dina',
        p: 'pasta pesto',
        date: 1628726400,
        id: '12-08-21',
      },
      {
        c: 'farro',
        p: 'Esselunga',
        date: 1628640000,
        id: '11-08-21',
      },
      {
        c: 'mozzarella e pomodorini',
        date: 1628553600,
        p: 'insalatona',
        id: '10-08-21',
      },
      {
        c: 'pizza',
        date: 1628467200,
        p: 'prosciutto e melone',
        id: '09-08-21',
      },
      {
        c: 'avanzi',
        p: 'nonni',
        date: 1628121600,
        id: '05-08-21',
      },
      {
        c: 'ape Ciompi',
        p: 'ravioli',
        date: 1628035200,
        id: '04-08-21',
      },
      {
        c: 'zuppa di legumi',
        p: 'risotto',
        date: 1627948800,
        id: '03-08-21',
      },
      {
        c: 'toro',
        date: 1627862400,
        p: 'pasta zucchine e gamberetti',
        id: '02-08-21',
      },
    ],
  },
  {
    title: 'lug 2021',
    data: [
      {
        c: 'pasta?',
        date: 1627516800,
        p: 'sushiii',
        id: '29-07-21',
      },
      {
        c: 'serata toscana',
        date: 1627430400,
        p: 'fagioli',
        id: '28-07-21',
      },
      {
        c: 'pizza',
        date: 1627344000,
        p: 'pasta pesto',
        id: '27-07-21',
      },
      {
        c: 'risotto funghi',
        date: 1627257600,
        p: 'insalata e zucchine',
        id: '26-07-21',
      },
      {
        c: 'pollo curry',
        date: 1626825600,
        p: 'insalatona',
        id: '21-07-21',
      },
      {
        c: 'farinata',
        p: 'toast',
        date: 1626739200,
        id: '20-07-21',
      },
      {
        c: 'mozzarella e pomodorini',
        date: 1626652800,
        p: 'insalatona',
        id: '19-07-21',
      },
      {
        c: 'avanzi',
        p: 'aglio e olio',
        date: 1626307200,
        id: '15-07-21',
      },
      {
        c: 'risotto giallo e funghi',
        p: 'insalata farro',
        date: 1626220800,
        id: '14-07-21',
      },
      {
        c: 'zuppa legumi',
        p: 'riso salmone avocado',
        date: 1626134400,
        id: '13-07-21',
      },
      {
        c: 'ex-colleghi/minestrone',
        date: 1626048000,
        p: 'poverella',
        id: '12-07-21',
      },
      {
        c: 'avanzi',
        p: 'carbonara',
        date: 1625702400,
        id: '08-07-21',
      },
      {
        c: 'farinata',
        date: 1625616000,
        p: 'toast',
        id: '07-07-21',
      },
      {
        c: 'prosciutto e melone',
        date: 1625529600,
        p: 'insalata di farro',
        id: '06-07-21',
      },
      {
        c: 'riso salmone avocado',
        date: 1625443200,
        p: 'pasta pesto fagiolini',
        id: '05-07-21',
      },
    ],
  },
  {
    title: 'giu 2021',
    data: [
      {
        c: 'Mondonico',
        date: 1623888000,
        p: 'avanzi',
        id: '17-06-21',
      },
      {
        c: 'grigliata',
        p: 'pasta pomodorini',
        date: 1623801600,
        id: '16-06-21',
      },
      {
        c: 'zuppa legumi',
        p: 'pizza avanzata',
        date: 1623715200,
        id: '15-06-21',
      },
      {
        c: 'zucchine ripiene',
        p: 'insalata di farro secondo tentativo',
        date: 1623628800,
        id: '14-06-21',
      },
      {
        c: 'zuppa di legumi',
        date: 1623369600,
        p: 'pasta pomodorini',
        id: '11-06-21',
      },
      {
        c: 'sushiiii',
        date: 1623283200,
        p: 'ravioli',
        id: '10-06-21',
      },
      {
        c: 'farinata',
        p: 'toast',
        date: 1623196800,
        id: '09-06-21',
      },
      {
        c: 'pomodori e mozzarella',
        p: 'spaghetti pomodorini',
        date: 1623110400,
        id: '08-06-21',
      },
      {
        c: 'zuppa legumi',
        p: 'insalata sgombro pomodorini olive',
        date: 1623024000,
        id: '07-06-21',
      },
      {
        c: 'sushi @ home',
        p: 'pasta al pesto',
        date: 1622937600,
        id: '06-06-21',
      },
      {
        c: 'zuppa legumi',
        date: 1622764800,
        p: 'avanzi',
        id: '04-06-21',
      },
      {
        c: 'roll di cavolo',
        date: 1622678400,
        p: 'mozzarella e pomodori',
        id: '03-06-21',
      },
      {
        c: 'gamberi al curry',
        p: 'prosciutto e melone',
        date: 1622592000,
        id: '02-06-21',
      },
      {
        c: 'farinata',
        p: 'yaki udon',
        date: 1622505600,
        id: '01-06-21',
      },
    ],
  },
  {
    title: 'mag 2021',
    data: [
      {
        c: 'tonno e cavolfiori',
        p: 'pasta e lenticchie',
        date: 1622419200,
        id: '31-05-21',
      },
      {
        c: 'bros',
        p: 'spaghetti pomodorini',
        date: 1622332800,
        id: '30-05-21',
      },
      {
        c: 'zuppa legumi',
        p: 'piada',
        date: 1622246400,
        id: '29-05-21',
      },
      {
        c: 'parmigiana',
        p: 'maiale e peperoni',
        date: 1622160000,
        id: '28-05-21',
      },
      {
        c: 'risotto proloco',
        p: 'Spaghetti pomodorini',
        date: 1622073600,
        id: '27-05-21',
      },
      {
        c: 'Farinata',
        p: 'avanzi',
        date: 1621987200,
        id: '26-05-21',
      },
      {
        c: 'Risotto con funghi',
        p: 'Poverella',
        date: 1621900800,
        id: '25-05-21',
      },
      {
        c: 'melanzane al forno e falafel',
        date: 1621814400,
        p: 'Pasta e lenticchie',
        id: '24-05-21',
      },
      {
        c: 'avanzi',
        p: 'aglio olio',
        date: 1621468800,
        id: '20-05-21',
      },
      {
        c: 'prince',
        date: 1621382400,
        p: 'avanzi',
        id: '19-05-21',
      },
      {
        c: 'hamburger veggie e piselli',
        p: 'poverella',
        date: 1621296000,
        id: '18-05-21',
      },
      {
        c: 'zuppa legumi',
        p: 'spaghetti pomodorini',
        date: 1621209600,
        id: '17-05-21',
      },
      {
        c: 'minestrone',
        date: 1621123200,
        p: 'Milano',
        id: '16-05-21',
      },
      {
        c: 'zuppa legumi',
        date: 1621036800,
        p: 'pasta pesto',
        id: '15-05-21',
      },
      {
        c: 'risotto asparagi',
        p: 'pesce e verdure con crema di melanzane',
        date: 1620950400,
        id: '14-05-21',
      },
      {
        c: 'avanzi',
        date: 1620864000,
        p: 'pasta pesto',
        id: '13-05-21',
      },
      {
        c: 'riso e gamberi al curry',
        date: 1620777600,
        p: 'bros',
        id: '12-05-21',
      },
      {
        c: 'farinata',
        date: 1620691200,
        p: 'pasta arachidi e broccoli',
        id: '11-05-21',
      },
      {
        c: 'risotto asparagi',
        date: 1620604800,
        p: 'pollo con funghi',
        id: '10-05-21',
      },
      {
        c: 'minestrone',
        date: 1620518400,
        p: 'focaccia e salmone affumicato',
        id: '09-05-21',
      },
      {
        c: 'pollo al curry',
        date: 1620432000,
        p: 'pesce e verdure',
        id: '08-05-21',
      },
      {
        c: 'risotto asparagi',
        p: 'ramen brodo avanzi',
        date: 1620345600,
        id: '07-05-21',
      },
      {
        c: 'avanzi',
        date: 1620259200,
        p: 'carbonara',
        id: '06-05-21',
      },
      {
        c: 'risotto giallo con funghi',
        date: 1620172800,
        p: 'piada',
        id: '05-05-21',
      },
      {
        c: 'hamburger veggie e piselli',
        p: 'pasta e carciofi',
        date: 1620086400,
        id: '04-05-21',
      },
      {
        c: 'Ombrina e asparagi',
        p: 'sardine e asparagi',
        date: 1620000000,
        id: '03-05-21',
      },
      {
        c: 'farinata',
        p: 'spaghetti pomodorini e gamberetti',
        date: 1619913600,
        id: '02-05-21',
      },
    ],
  },
  {
    title: 'apr 2021',
    data: [
      {
        c: 'uova e asparagi',
        date: 1619740800,
        p: 'pesce e cime di rapa',
        id: '30-04-21',
      },
      {
        c: 'nah',
        p: 'matrimonio Gio',
        date: 1619654400,
        id: '29-04-21',
      },
      {
        c: 'farinata',
        p: 'pasta con vongole',
        date: 1619568000,
        id: '28-04-21',
      },
      {
        c: 'zuppa legumi',
        date: 1619481600,
        p: 'pasta pesto',
        id: '27-04-21',
      },
      {
        c: 'torta salata',
        p: 'pasta lenticchie',
        date: 1619395200,
        id: '26-04-21',
      },
      {
        c: 'no grazie',
        date: 1619308800,
        p: 'grigliata',
        id: '25-04-21',
      },
      {
        c: 'salmone e carciofi saltati in padella',
        p: 'riso saltato con uova',
        date: 1619136000,
        id: '23-04-21',
      },
      {
        c: 'cesty',
        date: 1619049600,
        p: 'melanzane al forno con hummus',
        id: '22-04-21',
      },
      {
        c: 'pizza',
        p: 'pasta carciofi',
        date: 1618963200,
        id: '21-04-21',
      },
      {
        c: 'pollo al curry',
        p: 'pasta con aringa',
        date: 1618876800,
        id: '20-04-21',
      },
      {
        c: 'cesty',
        date: 1618790400,
        p: 'pasta del ramen in brodo',
        id: '19-04-21',
      },
      {
        c: 'zuppa legumi',
        date: 1618531200,
        p: 'albumi e asparagi',
        id: '16-04-21',
      },
      {
        c: 'avanzi',
        p: 'aglio e olio',
        date: 1618444800,
        id: '15-04-21',
      },
      {
        c: 'farinata',
        p: 'pasta cozze',
        date: 1618358400,
        id: '14-04-21',
      },
      {
        c: 'risotto asparagi',
        p: 'pasta fagioli',
        date: 1618272000,
        id: '13-04-21',
      },
      {
        c: 'torta salata scamorza porri',
        date: 1618185600,
        p: 'frittata zucchine',
        id: '12-04-21',
      },
      {
        c: 'risotto asparagi',
        date: 1618099200,
        p: 'pasta lenticchie',
        id: '11-04-21',
      },
      {
        c: 'avanzi',
        date: 1617840000,
        p: 'pasta zafferano asparagi',
        id: '08-04-21',
      },
      {
        c: 'tofu e funghi',
        p: 'riso peperoni',
        date: 1617753600,
        id: '07-04-21',
      },
      {
        c: 'triglie e spinaci',
        p: 'pasta pesto',
        date: 1617667200,
        id: '06-04-21',
      },
      {
        c: 'melanzane farinata',
        p: 'Milano',
        date: 1617580800,
        id: '05-04-21',
      },
      {
        c: 'minestrone',
        date: 1617494400,
        p: 'pasta pesto',
        id: '04-04-21',
      },
      {
        c: 'torta salata',
        p: 'pasta carciofi',
        date: 1617408000,
        id: '03-04-21',
      },
      {
        c: 'zuppa legumi',
        p: 'avanzi',
        date: 1617321600,
        id: '02-04-21',
      },
      {
        c: 'melanzane al forno con pomodorini',
        date: 1617235200,
        p: 'pasta con noci',
        id: '01-04-21',
      },
    ],
  },
  {
    title: 'mar 2021',
    data: [
      {
        c: 'minestrone',
        date: 1617148800,
        p: 'pasta vongole',
        id: '31-03-21',
      },
      {
        c: 'risotto funghi',
        p: 'poverella',
        date: 1617062400,
        id: '30-03-21',
      },
      {
        c: 'farinata',
        p: 'pasta e lenticchie',
        date: 1616976000,
        id: '29-03-21',
      },
      {
        c: 'minestrone',
        date: 1616893200,
        p: 'ravioli',
        id: '28-03-21',
      },
      {
        c: 'tagliata e insalata con pomodorini',
        p: 'pasta carciofi',
        date: 1616810400,
        id: '27-03-21',
      },
      {
        c: 'tonno e cavolfiori',
        p: 'riso salmone',
        date: 1616724000,
        id: '26-03-21',
      },
      {
        c: 'riso e salmone',
        date: 1616634000,
        p: 'orecchiette cime rapa',
        id: '25-03-21',
      },
      {
        c: 'polpette e cavolo nero',
        p: 'riso e arachidi (leggero)',
        date: 1616547600,
        id: '24-03-21',
      },
      {
        c: 'zuppa di legumi',
        date: 1616461200,
        p: 'pasta al pesto',
        id: '23-03-21',
      },
      {
        c: 'minestrone',
        date: 1616374800,
        p: 'piada',
        id: '22-03-21',
      },
      {
        c: 'minestrone',
        date: 1616202000,
        p: 'poverella',
        id: '20-03-21',
      },
      {
        c: 'raclette',
        date: 1616115600,
        p: 'avanzi',
        id: '19-03-21',
      },
      {
        c: 'farinata',
        p: 'riso alle arachidi',
        date: 1616029200,
        id: '18-03-21',
      },
      {
        c: 'pollo al curry',
        p: 'pane buono con mortadella',
        date: 1615942800,
        id: '17-03-21',
      },
      {
        c: 'riso e salmone',
        p: 'pasta e fagioli',
        date: 1615856400,
        id: '16-03-21',
      },
      {
        c: 'zuppa di legumi',
        p: 'poverella',
        date: 1615770000,
        id: '15-03-21',
      },
      {
        c: 'zuppa legumi',
        p: 'riso con pollo',
        date: 1615510800,
        id: '12-03-21',
      },
      {
        c: 'festa ciompi',
        date: 1615424400,
        p: 'ravioli',
        id: '11-03-21',
      },
      {
        c: 'vellutata cavolo nero',
        date: 1615338000,
        p: 'pasta e lenticchie',
        id: '10-03-21',
      },
      {
        c: 'riso con salmone',
        date: 1615251600,
        p: 'piadina hummus e melanzane',
        id: '09-03-21',
      },
      {
        c: 'torta salata',
        p: 'pasta pesto di anacardi e cavolo nero',
        date: 1615165200,
        id: '08-03-21',
      },
      {
        c: 'minestrone',
        p: 'pasta pesto x Ele',
        date: 1615078800,
        id: '07-03-21',
      },
      {
        c: 'hummus e melanzane',
        date: 1614992400,
        p: 'pasta pesto x Juan',
        id: '06-03-21',
      },
      {
        c: 'hamburger',
        date: 1614906000,
        p: 'pasta lenticchie',
        id: '05-03-21',
      },
      {
        c: 'pollo e funghi',
        date: 1614819600,
        p: 'pasta e lenticchie',
        id: '04-03-21',
      },
      {
        c: 'carciofi e patate',
        date: 1614733200,
        p: 'riso saltato',
        id: '03-03-21',
      },
      {
        c: 'hamburger veg e cavolini',
        p: 'pasta aglio olio',
        date: 1614646800,
        id: '02-03-21',
      },
      {
        c: 'vellutata cavolo viola',
        date: 1614560400,
        p: 'piada',
        id: '01-03-21',
      },
    ],
  },
  {
    title: 'feb 2021',
    data: [
      {
        c: 'risotto funghi e salsiccia',
        date: 1614474000,
        p: 'piada',
        id: '28-02-21',
      },
      {
        c: 'Andrea',
        p: 'avanzi',
        date: 1613523600,
        id: '17-02-21',
      },
      {
        c: 'avanzi',
        date: 1613437200,
        p: 'yakisoba alle arachidi e sesamo',
        id: '16-02-21',
      },
      {
        c: 'torta salata',
        p: 'pasta pomodorini gamberetti',
        date: 1613350800,
        id: '15-02-21',
      },
      {
        c: 'pesce spada e cavolfiori',
        date: 1613264400,
        p: 'pasta pesto cavolo nero',
        id: '14-02-21',
      },
      {
        c: 'avanzi',
        date: 1612918800,
        p: 'pasta cozze',
        id: '10-02-21',
      },
      {
        c: 'sushi@home feat. bros',
        date: 1612832400,
        p: 'parmigiana',
        id: '09-02-21',
      },
      {
        c: 'risotto ai funghi',
        p: 'pasta al pesto',
        date: 1612746000,
        id: '08-02-21',
      },
      {
        c: 'lasagna',
        p: 'avanzi tacos',
        date: 1612659600,
        id: '07-02-21',
      },
      {
        c: 'avanzi',
        p: 'carbonara',
        date: 1612314000,
        id: '03-02-21',
      },
      {
        c: 'torta salata',
        date: 1612227600,
        p: 'cavolfiori e Ombrina',
        id: '02-02-21',
      },
      {
        c: 'zuppa legumi',
        date: 1612141200,
        p: '???',
        id: '01-02-21',
      },
    ],
  },
  {
    title: 'gen 2021',
    data: [
      {
        c: 'riso salmone avocado',
        p: 'pasta lenticchie',
        date: 1612054800,
        id: '31-01-21',
      },
      {
        c: 'avanzi',
        p: 'aglio olio',
        date: 1611709200,
        id: '27-01-21',
      },
      {
        c: 'sushi@home',
        date: 1611622800,
        p: 'spaghetti pomodorini',
        id: '26-01-21',
      },
      {
        c: 'vellutata di carote',
        p: 'riso saltato con pollo',
        date: 1611536400,
        id: '25-01-21',
      },
      {
        c: '???',
        p: 'piada',
        date: 1611450000,
        id: '24-01-21',
      },
      {
        c: 'riso e salmone',
        date: 1611363600,
        p: 'gallinella e cime di rapa',
        id: '23-01-21',
      },
      {
        c: 'vellutata di carote',
        date: 1611277200,
        p: 'ravioli',
        id: '22-01-21',
      },
      {
        c: 'avanzi',
        p: 'pasta e lenticchie',
        date: 1611104400,
        id: '20-01-21',
      },
      {
        c: 'rana pescatrice e cavolo nero',
        date: 1611018000,
        p: 'sushi@home',
        id: '19-01-21',
      },
      {
        c: 'minestrone',
        date: 1610931600,
        p: 'piadina',
        id: '18-01-21',
      },
      {
        c: 'riso gamberi curry',
        p: 'pasta lenticchie',
        date: 1610845200,
        id: '17-01-21',
      },
      {
        c: 'vellutata di cavolo romano',
        p: 'pasta pesto',
        date: 1610499600,
        id: '13-01-21',
      },
      {
        c: 'zucca al forno e polpette',
        p: 'riso saltato',
        date: 1610413200,
        id: '12-01-21',
      },
      {
        c: 'finocchio e filetto',
        date: 1610326800,
        p: 'piadina',
        id: '11-01-21',
      },
      {
        c: 'riso salmone avocado',
        date: 1610240400,
        p: 'pasta e fagioli',
        id: '10-01-21',
      },
      {
        c: 'avanzi',
        p: 'lasagna',
        date: 1609894800,
        id: '06-01-21',
      },
      {
        c: 'pollo al curry',
        date: 1609808400,
        p: 'uova e cavolfiori',
        id: '05-01-21',
      },
      {
        c: 'tonno e hummus',
        date: 1609722000,
        p: 'risotto alla zucca',
        id: '04-01-21',
      },
      {
        c: 'vellutata di carote',
        date: 1609635600,
        p: 'pasta al pesto',
        id: '03-01-21',
      },
    ],
  },
  {
    title: 'ott 2020',
    data: [
      {
        c: 'polpette Cesty',
        date: 1602547200,
        p: 'pinzimonio',
        id: '13-10-20',
      },
    ],
  },
  {
    title: 'giu 2020',
    data: [
      {
        c: 'avanzi',
        p: '',
        date: 1592179200,
        id: '15-06-20',
      },
      {
        c: 'farinata con pomodorini',
        date: 1592092800,
        p: '',
        id: '14-06-20',
      },
      {
        c: 'riso e tofu',
        p: 'avanzi ravioli',
        date: 1591747200,
        id: '10-06-20',
      },
      {
        c: 'avanzi',
        date: 1591574400,
        p: 'ravioli @ home',
        id: '08-06-20',
      },
      {
        c: 'hummus con carote e sedano',
        p: 'pasta con sesamo e arachidi',
        date: 1591488000,
        id: '07-06-20',
      },
      {
        c: 'ravioli avanzati',
        date: 1591142400,
        p: 'avanzi',
        id: '03-06-20',
      },
      {
        c: 'avanzi',
        date: 1590969600,
        p: 'ravioli a mano',
        id: '01-06-20',
      },
    ],
  },
  {
    title: 'mag 2020',
    data: [
      {
        c: 'farinata',
        date: 1590537600,
        p: 'pasta cipollotto e asparagi',
        id: '27-05-20',
      },
      {
        c: 'avanzi',
        date: 1590364800,
        p: 'spaghetti pomodorini',
        id: '25-05-20',
      },
      {
        c: 'torta salata',
        date: 1590278400,
        p: 'pasta e fagioli',
        id: '24-05-20',
      },
      {
        c: 'pollo al curry',
        p: 'pasta e pomodorini',
        date: 1589932800,
        id: '20-05-20',
      },
      {
        c: 'avanzi',
        date: 1589760000,
        p: 'pasta cozze',
        id: '18-05-20',
      },
      {
        c: 'farinata',
        date: 1589673600,
        p: 'pasta noci',
        id: '17-05-20',
      },
      {
        c: 'crepe bretone',
        p: 'pasta fagioli',
        date: 1589328000,
        id: '13-05-20',
      },
      {
        c: 'avanzi',
        p: 'carbonara',
        date: 1589155200,
        id: '11-05-20',
      },
      {
        c: 'cavolfiore e pesce spada',
        p: 'pasta ai funghi',
        date: 1589068800,
        id: '10-05-20',
      },
      {
        c: 'albumi e ricotta',
        p: 'pasta e melanzane',
        date: 1588723200,
        id: '06-05-20',
      },
      {
        c: 'avanzi',
        p: 'ramen',
        date: 1588550400,
        id: '04-05-20',
      },
      {
        c: 'ravioli',
        p: 'avanzi',
        date: 1588464000,
        id: '03-05-20',
      },
    ],
  },
  {
    title: 'apr 2020',
    data: [
      {
        c: 'avanzi con zola',
        p: 'Milano',
        date: 1588118400,
        id: '29-04-20',
      },
      {
        c: 'birrificio',
        date: 1587945600,
        p: 'ravioli',
        id: '27-04-20',
      },
      {
        c: 'avanzi',
        p: 'jacked potato',
        date: 1587859200,
        id: '26-04-20',
      },
      {
        c: 'zuppa legumi',
        date: 1587513600,
        p: 'avanzi',
        id: '22-04-20',
      },
      {
        c: 'avanzi',
        date: 1587340800,
        p: 'ravioli fatti in casa!',
        id: '20-04-20',
      },
      {
        c: 'avanzi',
        p: 'avanzi',
        date: 1586908800,
        id: '15-04-20',
      },
      {
        c: 'poke',
        date: 1586736000,
        p: 'ravioli',
        id: '13-04-20',
      },
      {
        c: 'pizza',
        date: 1586649600,
        p: 'pesce e fagiolini',
        id: '12-04-20',
      },
      {
        c: 'avanzi',
        p: 'poverella',
        date: 1586304000,
        id: '08-04-20',
      },
      {
        c: 'avanzi',
        p: 'ravioli',
        date: 1586131200,
        id: '06-04-20',
      },
    ],
  },
  {
    title: 'mar 2020',
    data: [
      {
        c: 'avanzi',
        p: 'aglio olio',
        date: 1585526400,
        id: '30-03-20',
      },
      {
        c: 'riso e pollo',
        date: 1585443600,
        p: 'lox',
        id: '29-03-20',
      },
      {
        c: 'avanzi',
        p: 'pesto cavolo nero e anacardi',
        date: 1585098000,
        id: '25-03-20',
      },
      {
        c: 'pollo al curry',
        date: 1585011600,
        p: 'piada',
        id: '24-03-20',
      },
      {
        c: 'polpette e carciofi',
        p: 'pasta e carciofi',
        date: 1584925200,
        id: '23-03-20',
      },
      {
        c: 'zuppa di legumi',
        date: 1584838800,
        p: 'pasta e fagioli',
        id: '22-03-20',
      },
      {
        c: 'zuppa di legumi',
        date: 1584666000,
        p: 'pasta lenticchie',
        id: '20-03-20',
      },
      {
        c: 'torta salata porri',
        p: 'pasta pomodorini',
        date: 1584579600,
        id: '19-03-20',
      },
      {
        c: 'pizza',
        date: 1584493200,
        p: 'spaghetti al cipollotto',
        id: '18-03-20',
      },
      {
        c: 'hamburger e piselli',
        p: 'pasta allo scoglio',
        date: 1584406800,
        id: '17-03-20',
      },
      {
        c: 'risotto ai funghi',
        p: 'piada con salmone',
        date: 1584320400,
        id: '16-03-20',
      },
      {
        c: 'avanzi',
        p: 'parmigiana di melanzane',
        date: 1584234000,
        id: '15-03-20',
      },
      {
        c: 'farinata',
        p: 'pasta fagioli',
        date: 1583888400,
        id: '11-03-20',
      },
      {
        c: 'avanzi',
        p: 'carbonara',
        date: 1583715600,
        id: '09-03-20',
      },
      {
        c: 'riso curry gamberi',
        date: 1583629200,
        p: 'piada',
        id: '08-03-20',
      },
      {
        c: 'zuppa legumi',
        p: 'avanzi',
        date: 1583283600,
        id: '04-03-20',
      },
      {
        c: 'avanzi',
        p: 'avanzi',
        date: 1583110800,
        id: '02-03-20',
      },
      {
        c: 'tonno e cavolfiori',
        date: 1583024400,
        p: 'halloumi e pomodorini',
        id: '01-03-20',
      },
    ],
  },
  {
    title: 'gen 2020',
    data: [
      {
        c: 'avanzi',
        date: 1579827600,
        p: 'aglio olio',
        id: '24-01-20',
      },
      {
        c: 'laghetto fonteviva',
        date: 1579482000,
        p: 'spatzle',
        id: '20-01-20',
      },
      {
        c: 'farinata',
        p: 'poverella',
        date: 1579395600,
        id: '19-01-20',
      },
    ],
  },
  {
    title: 'mar 2019',
    data: [
      {
        c: 'hummus melanzane',
        date: 1553475600,
        p: 'poverella',
        id: '25-03-19',
      },
      {
        c: 'avanzi',
        p: 'Milano',
        date: 1553302800,
        id: '23-03-19',
      },
      {
        c: 'noodleria',
        p: 'ravioli per Juan',
        date: 1553216400,
        id: '22-03-19',
      },
      {
        c: 'polenta',
        p: 'parmigiana',
        date: 1552870800,
        id: '18-03-19',
      },
      {
        c: 'ciompi',
        date: 1552698000,
        p: 'pasta vongole',
        id: '16-03-19',
      },
      {
        c: 'farinata',
        p: 'pasta al pesto cavolo nero',
        date: 1551402000,
        id: '01-03-19',
      },
    ],
  },
  {
    title: 'gen 2019',
    data: [
      {
        c: 'risotto funghi',
        p: 'cime di rapa e gallinella',
        date: 1547946000,
        id: '20-01-19',
      },
    ],
  },
];

const MenuHistoryScreen = () => {
  const {colors} = useTheme();
  const [days, setDays] = useState<{title: string; data: MenuItem[]}[]>([]);
  useEffect(() => {
    if (!days || days.length === 0) {
      setTimeout(() => setDays(const_days), 500);
    }
  }, [days]);
  return (
    <ErrorBoundary FallbackComponent={CustomErrorBoundary}>
      <Surface style={styles.container}>
        <SectionList
          sections={days}
          stickySectionHeadersEnabled={true}
          renderItem={({item}) => <MenuHistoryItem menuItemData={item} />}
          keyExtractor={item => item.date.toString()}
          renderSectionHeader={({section: {title}}) => (
            <Text
              style={{
                ...styles.sectionTitle,
                color: colors.primary,
                backgroundColor: colors.background,
              }}>
              {title}
            </Text>
          )}
        />
        <Text style={{...styles.version, color: colors.onSurfaceDisabled}}>
          Versione App: {Constants.expoConfig?.version}
        </Text>
      </Surface>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  version: {
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'right',
    paddingRight: 5,
  },
  sectionTitle: {
    fontSize: 20,
    textTransform: 'uppercase',
    paddingLeft: 5,
  },
});

export default MenuHistoryScreen;
