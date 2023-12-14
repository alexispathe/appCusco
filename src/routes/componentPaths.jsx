import { GraficaScreen } from "../components/GraficaScreen";
import { DataUserScreen } from "../components/DataUserScreen";
import { FileDownloaderScreen } from "../components/FileDownloaderScreen";
import { DataUploadScreen } from "../components/DataUploadComponent";
export const routes =[
  {
    component: GraficaScreen,
    name: 'GraficaScreen'
  },
  {
    component: DataUserScreen,
    name: 'DataUserScreen'
  },
  {
    component: FileDownloaderScreen,
    name: 'FileDownloaderScreen'
  },
  {
    component: DataUploadScreen,
    name: 'DataUploadScreen'
  },
]