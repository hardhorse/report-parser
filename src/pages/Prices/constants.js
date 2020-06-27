
export const ID_21VEK = 965;
export const ID_SILA = 12735;
export const ID_5ELEMENT = 3467;
export const ID_AMD = 1689;
export const ID_IMARKET = 581;
export const ID_LOWEST = -1;

export const NAMES_MAPPING = {
  [ID_LOWEST]: "Самая ниизкая цена на Onliner",
  [ID_21VEK]: "21 век",
  [ID_SILA]: "Электросила",
  [ID_5ELEMENT]: "5 элемент",
  [ID_AMD]: "AMD.BY",
  [ID_IMARKET]: "IMARKET"
};

export const LAPTOP_TYPE = 'Ноутбук';
export const TABLET_TYPE = 'Планшет';



export const KEY_SKU = 'key';
export const KEY_SERIES = 'notebook_series';
export const KEY_PROC_MODEL = 'cpunb_model';
export const KEY_BUILT_IN_GRAPH = 'cpu_builtingraph';
export const KEY_DIAGON = 'diagonalnb';
export const KEY_RESOLUTION = 'display_resnb';
export const KEY_DISP_TECH = 'display_technb';
export const KEY_RAM_SIZE = 'ram_sizenb';
export const KEY_HDD_CONF = 'nb_hddconfig';
export const KEY_HDD_TYPE = 'hdd_type';
export const KEY_HDD_CAPACITY = 'nb_storcapacity';
export const KEY_GPU_DISCR = 'gpu_discr';
export const KEY_GPU_ADAPTER = 'gpunb_video';
export const KEY_KEY_LIT = 'keyboard_lit';
export const KEY_KEY_OS = 'osnb';
export const KEY_TYPE = 'name_prefix';
export const KEY_NAME = 'name';

export const KEY_TAB_DIAGONAL = 'tab_diagonal';
export const KEY_TAB_RESOLUTION = 'tab_resolution';
export const KEY_TAB_SCREENTECH = 'tab_screentech';
export const KEY_TAB_OS = 'tab_os';
export const KEY_TAB_CPU = 'tab_cpu';
export const KEY_TAB_RAM = 'tab_ram';
export const KEY_TAB_FALSH = 'tab_flash';
export const KEY_TAB_MOBILEPHONE = 'tab_mobilephone';
export const KEY_TAB_CORENB = 'cpu_corenb';
export const KEY_TAB_FREQNB = 'cpu_freqnb';
export const KEY_TAB_CASE_TYPE = 'case_type';
export const KEY_TAB_WEIGHT = 'weight';
export const KEY_TAB_CAMNB = 'camnb';
export const KEY_TAB_CAM_MPXNB = 'cam_mpxnb';
export const KEY_TAB_CAM2_MPX = 'cam2_mpx';
export const KEY_TAB_PRINSCANNER = 'printcsaner';
export const KEY_TAB_NFC = 'nfc';
export const KEY_TAB_BT = 'bluetoothnb';
export const KEY_TAB_MOB_MODEM = 'mobmodemnb';
export const KEY_TAB_ACC_CAP = 'acc_capacity';
export const KEY_TAB_STILUS = 'tc_stilus';

// tablet
export const PARAMETERS_LIST_TABLET = [
  KEY_SKU,
  KEY_TYPE,
  KEY_NAME,
  KEY_TAB_DIAGONAL,
  KEY_TAB_RESOLUTION,
  KEY_TAB_SCREENTECH,
  KEY_TAB_OS,
  KEY_TAB_CPU,
  KEY_TAB_RAM,
  KEY_TAB_FALSH,
  KEY_TAB_MOBILEPHONE,
  KEY_TAB_CORENB,
  KEY_TAB_FREQNB,
  KEY_TAB_CASE_TYPE,
  KEY_TAB_WEIGHT,
  KEY_TAB_CAMNB,
  KEY_TAB_CAM_MPXNB,
  KEY_TAB_CAM2_MPX,
  KEY_TAB_PRINSCANNER,
  KEY_TAB_NFC,
  KEY_TAB_BT,
  KEY_TAB_MOB_MODEM,
  KEY_TAB_ACC_CAP,
  KEY_TAB_STILUS,
];

export const PARAMETERS_MAPPING_TABLET = {
  [KEY_SKU]: 'Артикул',
  [KEY_TYPE]: 'Тип',
  [KEY_NAME]: 'Наименование',
  [KEY_TAB_DIAGONAL]: "Диагональ",
  [KEY_TAB_RESOLUTION]: "Разрешение",
  [KEY_TAB_SCREENTECH]: "Матрица",
  [KEY_TAB_OS]: "OS",
  [KEY_TAB_CPU]: "CPU",
  [KEY_TAB_RAM]: "RAM",
  [KEY_TAB_FALSH]: "Внутренняя память",
  [KEY_TAB_MOBILEPHONE]: "Голосовые вызовы",
  [KEY_TAB_CORENB]: "Кол-во ядер",
  [KEY_TAB_FREQNB]: "Частота",
  [KEY_TAB_CASE_TYPE]: "Тип корпуса",
  [KEY_TAB_WEIGHT]: "Вес",
  [KEY_TAB_CAMNB]: "Камера",
  [KEY_TAB_CAM_MPXNB]: "Основная камера MPx",
  [KEY_TAB_CAM2_MPX]: "Фронтальная камера MPx",
  [KEY_TAB_PRINSCANNER]: "Сканер отпечатков пальцев",
  [KEY_TAB_NFC]: "NFC",
  [KEY_TAB_BT]: "BT",
  [KEY_TAB_MOB_MODEM]: "Сотовая связь",
  [KEY_TAB_ACC_CAP]: "Аккумулятор",
  [KEY_TAB_STILUS]: "Стилус",
};
// laptop
export const PARAMETERS_LIST_LAPTOP = [
  KEY_SKU,
  KEY_TYPE,
  KEY_NAME,
  KEY_SERIES,
  KEY_PROC_MODEL,
  KEY_BUILT_IN_GRAPH,
  KEY_DIAGON,
  KEY_RESOLUTION,
  KEY_DISP_TECH,
  KEY_RAM_SIZE,
  KEY_HDD_CONF,
  KEY_HDD_TYPE,
  KEY_HDD_CAPACITY,
  KEY_GPU_DISCR,
  KEY_GPU_ADAPTER,
  KEY_KEY_LIT,
  KEY_KEY_OS];

export const PARAMETERS_MAPPING_LAPTOP = {
  [KEY_SKU]: 'Артикул',
  [KEY_TYPE]: 'Тип',
  [KEY_NAME]: 'Наименование',
  [KEY_SERIES]: 'Продуктовая линейка',
  [KEY_PROC_MODEL]: 'Модель процессора',
  [KEY_BUILT_IN_GRAPH]: 'Встроенная графика',
  [KEY_DIAGON]: 'Диагональ экрана',
  [KEY_RESOLUTION]: 'Разрешение экрана',
  [KEY_DISP_TECH]: 'Технология экрана',
  [KEY_RAM_SIZE]: 'Объём памяти',
  [KEY_HDD_CONF]: 'Конфигурация накопителя',
  [KEY_HDD_TYPE]: 'Тип накопителя',
  [KEY_HDD_CAPACITY]: 'Ёмкость накопителя',
  [KEY_GPU_DISCR]: 'Дискретная графика',
  [KEY_GPU_ADAPTER]: 'Графический адаптер',
  [KEY_KEY_LIT]: 'Подсветка клавиатуры',
  [KEY_KEY_OS]: 'OS',
};
  
export const SHOPS = [ID_LOWEST, ID_21VEK, ID_SILA, ID_5ELEMENT, ID_AMD, ID_IMARKET];