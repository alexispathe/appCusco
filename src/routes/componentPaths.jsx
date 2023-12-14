import { GraficaScreen } from "../components/GraficaScreen";
import { DataUserScreen } from "../components/DataUserScreen";
import { FileDownloaderScreen } from "../components/FileDownloaderScreen";
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
  }
]