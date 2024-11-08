import PaidIcon from "@mui/icons-material/Paid";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CarRepairIcon from "@mui/icons-material/CarRepair";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices";
import PropaneTankIcon from "@mui/icons-material/PropaneTank";
import SchoolIcon from "@mui/icons-material/School";
import ConnectedTvIcon from "@mui/icons-material/ConnectedTv";
import PoolIcon from "@mui/icons-material/Pool";
import OtherHousesIcon from "@mui/icons-material/OtherHouses";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import NightlifeIcon from "@mui/icons-material/Nightlife";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";

const iconMapper = {
  "Aylık Gelirler": <PaidIcon color="success" />,
  Sena: <FavoriteIcon color="success" />,
  "İlave Gelirler": <AttachMoneyIcon color="success" />,
  Araç: <CarRepairIcon color="error" />,
  Giyim: <CheckroomIcon color="error" />,
  Market: <ShoppingCartIcon color="error" />,
  Telefon: <PhoneIphoneIcon color="error" />,
  Birikim: <AddBusinessIcon color="error" />,
  Kredi: <AccountBalanceIcon color="error" />,
  Sağlık: <MonitorHeartIcon color="error" />,
  "Hazır Yemek": <LocalDiningIcon color="error" />,
  Su: <WaterDropIcon color="error" />,
  Elektrik: <ElectricalServicesIcon color="error" />,
  Doğalgaz: <PropaneTankIcon color="error" />,
  "Eğitim-Kitap": <SchoolIcon color="error" />,
  "Okul Aidatı": <SchoolIcon color="error" />,
  "İnternet-TV": <ConnectedTvIcon color="error" />,
  Tatil: <PoolIcon color="error" />,
  "Ev Eşyası": <OtherHousesIcon color="error" />,
  "Ev Tadilat": <OtherHousesIcon color="error" />,
  "Site Yakıt": <OtherHousesIcon color="error" />,
  "Site Aidat": <OtherHousesIcon color="error" />,
  Borç: <AttachMoneyIcon color="error" />,
  Diğer: <AttachMoneyIcon color="error" />,
  Kira: <AttachMoneyIcon color="error" />,
  "ATM Nakit": <LocalAtmIcon color="error" />,
  "Eğlence-Oyun": <NightlifeIcon color="error" />,
  default: <EventRepeatIcon color="error" />,
};

export default iconMapper;
