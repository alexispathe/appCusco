import {PermissionsAndroid} from 'react-native';
// Permisos para acceder a los archivos del celular
export const requestExternalStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Permiso de escritura en almacenamiento externo',
          message:
            'Se requiere acceso a la carpeta de descargas para guardar archivos.',
          buttonPositive: 'Aceptar',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log(
          'Permiso de escritura en almacenamiento externo concedido.',
        );
         return true;
        
      } else {
        console.log('Permiso de escritura en almacenamiento externo denegado.');
      }
    } catch (error) {
      console.error(
        'Error al solicitar permiso de escritura en almacenamiento externo:',
        error,
      );
    }
  };