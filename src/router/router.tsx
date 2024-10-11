// import { ReactComponent as IcSetting } from "../assets/menuIcons/Settings/ic_setting.svg";
import { ReactComponent as IcDashboard } from "../assets/Dashboard/ic_dashboard.svg";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import AccountTreeIcon from '@mui/icons-material/AccountTree';
// import InfoIcon from "@mui/icons-material/Info";

export interface MenuTypes {
  linkName: string;
  href: string;
  isIconsVisible?: boolean;
  icon?: any;
  children?: MenuTypes[];
  open?: boolean;
  handleDrawer?: () => void;
}

const menuArr: MenuTypes[] = [
  {
    linkName: "Dashboard",
    href: "/",
    isIconsVisible: false,
    icon: <IcDashboard />
  },
  {
    linkName: "Discovery",
    href: "/discovery",
    isIconsVisible: false,
    icon: <AccountTreeIcon />
  },
  // {
  //   linkName: "Pair details",
  //   isIconsVisible: false,
  //   href: "/pair-details",
  //   icon: <InfoIcon fontSize={"large"} color={"info"} />
  // },
  {
    linkName: "Setup",
    href: "/setup",
    isIconsVisible: true,
    icon: <CurrencyBitcoinIcon fontSize={"large"} />,
    children: [
      { linkName: "Categories", href: "setup/categories" },
      { linkName: "Dapps", href: "setup/dapps" },
      { linkName: "Limit Categories", href: "setup/limit-categories" },
      { linkName: "Market Categories", href: "setup/market-categories" },
      { linkName: "Networks", href: "setup/networks" },
      { linkName: "Nodes", href: "setup/nodes" },
      { linkName: "Operations", href: "setup/operations" },
      { linkName: "Pools", href: "setup/pools" },
      { linkName: "Pool Tokens", href: "setup/pool-tokens" },
      { linkName: "Settings", href: "setup/settings" },
      { linkName: "Tokens", href: "setup/tokens" },
    ]
  },
];
export default menuArr;
