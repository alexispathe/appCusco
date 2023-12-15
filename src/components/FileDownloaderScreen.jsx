import React, {useState} from 'react';
import {View, Text, Button, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import XLSX from 'xlsx';
import RNFS from 'react-native-fs';
import {handleGetData} from '../assets/questionnaireFunctions';
import {columns} from '../database/preguntasCuscoDB';
import {requestExternalStoragePermission} from '../assets/permissions';
import NetInfo from '@react-native-community/netinfo';
import { OpenExcelFile } from './OpenExcelFile';
import Share from 'react-native-share';
export const FileDownloaderScreen = () => {
  const [selectedYear, setSelectedYear] = useState('2023'); // Año seleccionado por defecto
  const [downloading, setDownloading] = useState(false); // Estado para controlar la descarga
  const handleSaveDataXlSXNumeric = async () => {
    try {
      const netInfo = await NetInfo.fetch();
      if (!netInfo.isConnected){
        Alert.alert('Sin conexión', 'Revise la conexión a interner');

      }
      else{
        // const permissions = await requestExternalStoragePermission();
        setDownloading(true); // Comienza la descarga, desactiva el botón
        const permissions = true;
        if (permissions) {
          const dataCloudFirestore = await handleGetData();
          const dataSurvey = dataCloudFirestore.filter(
            data => data.dataType === 'numeric' && data.year === selectedYear,
          );
          const valuesArray = [];
          dataSurvey.forEach((data, index) => {
            const values = Object.entries(data.results)
              .sort((a, b) => columns.indexOf(a[0]) - columns.indexOf(b[0]))
              .map(entry => entry[1]);

            values.unshift(index + 1);
            valuesArray.push(values);
          });
          const filePath = `${RNFS.ExternalDirectoryPath}/archivos/cusco_numeric_${selectedYear}.xlsx`;
          await RNFS.mkdir(`${RNFS.ExternalDirectoryPath}/archivos`);
          let workbook = null;
          if (await RNFS.exists(filePath)) {
            await RNFS.unlink(filePath); // Elimina el archivo existente
          }
          workbook = XLSX.utils.book_new();

          let sheetName = 'Datos';
          let worksheet = workbook.Sheets[sheetName];

          if (!worksheet) {
            worksheet = XLSX.utils.aoa_to_sheet([columns]);
            XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
          }

          XLSX.utils.sheet_add_aoa(worksheet, valuesArray, {
            header: [],
            skipHeader: true,
            origin: -1,
          });

          const newExcelData = XLSX.write(workbook, {
            bookType: 'xlsx',
            type: 'base64',
          });

          await RNFS.writeFile(filePath, newExcelData, 'base64');

          handleSaveDataXlSXString();
        }
      } 
    } catch (error) {
      Alert.alert('Error al guardar datos en Excel:', error);
    }
  };

  const handleSaveDataXlSXString = async () => {
    try {
      const dataCloudFirestore = await handleGetData();
      const dataSurvey = dataCloudFirestore.filter(
        data => data.dataType === 'written' && data.year == selectedYear,
      );
      const valuesArray = [];

      dataSurvey.forEach((data, index) => {
        const values = Object.entries(data.results)
          .sort((a, b) => columns.indexOf(a[0]) - columns.indexOf(b[0]))
          .map(entry => entry[1]);
        values.unshift(index + 1); // Se agrega +1 para que el índice comience en 1 en lugar de 0
        valuesArray.push(values);
      });

      const filePath = `${RNFS.ExternalDirectoryPath}/archivos/cusco_string_${selectedYear}.xlsx`;
      let workbook = null;

      if (await RNFS.exists(filePath)) {
        await RNFS.unlink(filePath); // Elimina el archivo existente
      }
      workbook = XLSX.utils.book_new();

      let sheetName = 'Datos';
      let worksheet = workbook.Sheets[sheetName];

      if (!worksheet) {
        worksheet = XLSX.utils.aoa_to_sheet([columns]);
        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
      }

      XLSX.utils.sheet_add_aoa(worksheet, valuesArray, {
        header: [],
        skipHeader: true,
        origin: -1,
      });
      const newExcelData = XLSX.write(workbook, {
        bookType: 'xlsx',
        type: 'base64',
      });

      await RNFS.writeFile(filePath, newExcelData, 'base64');

      Alert.alert('Aviso', 'Archivo descargado correctamente.');
      
      setDownloading(false);
      await handleOpenExcelFile()
    } catch (error) {
      Alert.alert('Error al guardar datos en Excel DE STRING:', error);
    }
  };
  const handleOpenExcelFile = async () => {
    const filePath = `${RNFS.ExternalDirectoryPath}/archivos/cusco_string_${selectedYear}.xlsx`;

    try {
      const fileExists = await RNFS.exists(filePath);
      if (fileExists) {
        const options = {
          title: 'Abrir con...',
          url: `file://${filePath}`,
        };
        await Share.open(options);
      } else {
        Alert.alert('Archivo no encontrado', 'El archivo no existe en la ruta especificada.');
      }
    } catch (error) {
      // Alert.alert('Error al abrir el archivo', error.message);
    }
  };
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
        Descargar encuesta CUSCO
      </Text>
      <Text style={{color: 'black', fontSize: 20}}>Selecciona el año:</Text>
      <Picker
        selectedValue={selectedYear}
        style={{height: 50, width: 150}}
        onValueChange={itemValue => setSelectedYear(itemValue)}>
        <Picker.Item label="2023" value="2023" />
        <Picker.Item label="2024" value="2024" />
        <Picker.Item label="2025" value="2025" />
        <Picker.Item label="2026" value="2026" />
        <Picker.Item label="2027" value="2027" />
        <Picker.Item label="2028" value="2028" />
        {/* Agregar más años si es necesario */}
      </Picker>

      <Button
        title="Descargar y abrir archivo"
        disabled={downloading}
        onPress={handleSaveDataXlSXNumeric}
      />
    </View>
  );
};
