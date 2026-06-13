import ProductsIcon from "../../public/icons/categories/ProductsIcon.svg";
import DrinksIcon from "../../public/icons/categories/DrinksIcon.svg";
import EntertaimentIcon from "../../public/icons/categories/EntertaimentIcon.svg";
import HealthIcon from "../../public/icons/categories/HealthIcon.svg";
import TransportIcon from "../../public/icons/categories/TransportIcon.svg";
import AllForHomeIcon from "../../public/icons/categories/AllForHomeIcon.svg";
import ToolsIcon from "../../public/icons/categories/ToolsIcon.svg";
import ServicesIcon from "../../public/icons/categories/ServicesIcon.svg";
import HobbyIcon from "../../public/icons/categories/HobbyIcon.svg";
import BookIcon from "../../public/icons/categories/BookIcon.svg";
import OtherIcon from "../../public/icons/categories/OtherIcon.svg";
import SalaryIncomeIcon from "../../public/icons/categories/SalaryIncome.svg";
import AdditionalIncomeIcon from "../../public/icons/categories/additionalIncome.svg";

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
  {
    id: "salary",
    label: "Зарплата",
    icon: SalaryIncomeIcon,
    width: 56,
    height: 56,
  },
  {
    id: "additional",
    label: "Дод. дохід",
    icon: AdditionalIncomeIcon,
    width: 56,
    height: 56,
  },
];
