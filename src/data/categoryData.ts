import ProductsIcon from "../../public/icons/ProductsIcon.svg";
import DrinksIcon from "../../public/icons/DrinksIcon.svg";
import EntertaimentIcon from "../../public/icons/EntertaimentIcon.svg";
import HealthIcon from "../../public/icons/HealthIcon.svg";
import TransportIcon from "../../public/icons/TransportIcon.svg";
import AllForHomeIcon from "../../public/icons/AllForHomeIcon.svg";
import ToolsIcon from "../../public/icons/ToolsIcon.svg";
import ServicesIcon from "../../public/icons/ServicesIcon.svg";
import HobbyIcon from "../../public/icons/HobbyIcon.svg";
import BookIcon from "../../public/icons/BookIcon.svg";
import OtherIcon from "../../public/icons/OtherIcon.svg";

export const expanseCategories = [
  { id: "food", label: "Продукти", icon: ProductsIcon, width: 63, height: 56 },
  { id: "alcohol", label: "Алкоголь", icon: DrinksIcon, width: 45, height: 56 },
  {
    id: "entertainment",
    label: "Розваги",
    icon: EntertaimentIcon,
    width: 50,
    height: 56,
  },
  { id: "health", label: "Здоров'я", icon: HealthIcon, width: 55, height: 56 },
  {
    id: "transport",
    label: "Транспорт",
    icon: TransportIcon,
    width: 56,
    height: 43,
  },
  {
    id: "housing",
    label: "Все для дому",
    icon: AllForHomeIcon,
    width: 56,
    height: 31,
  },
  { id: "technique", label: "Техніка", icon: ToolsIcon, width: 56, height: 56 },
  {
    id: "utilities",
    label: "Комуналка, Зв'язок",
    icon: ServicesIcon,
    width: 54,
    height: 56,
  },
  { id: "sport", label: "Спорт, Хобі", icon: HobbyIcon, width: 56, height: 56 },
  { id: "education", label: "Навчання", icon: BookIcon, width: 56, height: 40 },
  { id: "other", label: "Інше", icon: OtherIcon, width: 56, height: 50 },
];

export const incomeCategories = [
  { id: "salary", label: "Зарплата", icon: OtherIcon, width: 56, height: 50 },
  {
    id: "additional",
    label: "Дод. дохід",
    icon: OtherIcon,
    width: 56,
    height: 50,
  },
];
