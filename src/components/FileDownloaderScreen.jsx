import React, {useState} from 'react';
import {View, Text, Button, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import XLSX from 'xlsx';
import RNFS from 'react-native-fs';
import {handleGetData} from '../assets/questionnaireFunctions';
import {columns} from '../database/preguntasCuscoDB';
import {requestExternalStoragePermission} from '../assets/permissions';

export const FileDownloaderScreen = () => {
  const [selectedYear, setSelectedYear] = useState('2023'); // Año seleccionado por defecto
  const handleSaveDataXlSXNumeric = async () => {
    try {
      // const permissions = await requestExternalStoragePermission();
      const permissions = true;
      if (permissions) {
        const dataCloudFirestore = await handleGetData();
        const dataSurvey = dataCloudFirestore.filter(
          data => data.dataType === 'numeric' && data.year === selectedYear,
        );
        const valuesArray = [];
        dataSurvey.forEach((data, index) => {
          const values = Object.entries(data.results)
            .sort((a, b) =>columns.indexOf(a[0]) -columns.indexOf(b[0]))
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
      }else{
        Alert.alert('Permisos denegados', 'Permite a la aplicación acceder a tus archivos')
      }
    } catch (error) {
      console.error('Error al guardar datos en Excel:', error);
    }
  };

  const handleSaveDataXlSXString = async () => {
    try {
      const dataCloudFirestore = await handleGetData();
      const dataSurvey = dataCloudFirestore.filter(
        data => data.dataType === 'written' && data.year == selectedYear,
      );
      const valuesArray = [];
      console.log(dataSurvey)
      dataSurvey.forEach((data, index) => {
        const values = Object.entries(data.results)
          .sort((a, b) =>columns.indexOf(a[0]) -columns.indexOf(b[0]))
          .map((entry) => entry[1]);
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

      alert('Archivo descargado correctamente.');
    } catch (error) {
      console.error('Error al guardar datos en Excel DE STRING:', error);
    }
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Selecciona el año:</Text>
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

      <Button title="Descargar archivo" onPress={handleSaveDataXlSXNumeric} />
    </View>
  );
};
