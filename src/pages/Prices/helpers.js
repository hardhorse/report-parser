import {
    KEY_TYPE,
    TABLET_TYPE,
    PARAMETERS_MAPPING_TABLET,
    PARAMETERS_MAPPING_LAPTOP,
    PARAMETERS_LIST_TABLET,
    PARAMETERS_LIST_LAPTOP,
    SHOPS,
    ID_LOWEST,
    ID_21VEK,
    ID_SILA,
    ID_5ELEMENT,
    ID_AMD,
    ID_IMARKET,
    KEY_NAME,
    KEY_SKU,
    NAMES_MAPPING
} from './constants';

export const getObjectProperty = (data, excludeFields = []) => key => {
    if (excludeFields.includes(key)) return;
    const value = data.parameters
      .map(obj => obj.parameters)
      .reduce((acc, arr) => [...acc, ...arr], [])
      .filter(param => param.id === key);
  
    return ({ [key]: value.length ? { value: value[0].value.reduce((acc, item) => [acc, item.value].join(' '), '') } : { value: null } })
  }
  
  export const getApiUrl = item =>
    `https://catalog.onliner.by/sdapi/shop.api/products/${item.trim().toLowerCase()}/positions?town=minsk&v=0.08389959292567406`;
  
  export const getDetailsUrl = item => `https://catalog.api.onliner.by/products/${item.trim().toLowerCase()}?include=parameters`;
  
  
  export const isTablet = ({ [KEY_TYPE]: type }) => (type.value || type) === TABLET_TYPE;
  
  export const getMappingList = (isTablet) => isTablet ? PARAMETERS_MAPPING_TABLET : PARAMETERS_MAPPING_LAPTOP;
  export const getParametersList = (isTablet) => isTablet ? PARAMETERS_LIST_TABLET : PARAMETERS_LIST_LAPTOP;
  
  export const getShop = (shops, id) => {
      const shop = shops.find(item => item.shop_id === id)
  
      return shop || null;
  }
  
  export const getLowestPrice = (shops) => {
      return shops.sort((a, b) => a.position_price.amount - b.position_price.amount)[0] || null
  }
  
  export const getShops = shops => ({
      [ID_LOWEST]: getLowestPrice(shops),
      [ID_21VEK]: getShop(shops, ID_21VEK),
      [ID_SILA]: getShop(shops, ID_SILA),
      [ID_5ELEMENT]: getShop(shops, ID_5ELEMENT),
      [ID_AMD]: getShop(shops, ID_AMD),
      [ID_IMARKET]: getShop(shops, ID_IMARKET),
  })
  
  export const getProductData = data => ({
    ...(getParametersList(isTablet(data)).map(getObjectProperty(data)).reduce((acc, item) => ({ ...acc, ...item }) , {})),
    [KEY_TYPE]: { value: data.name_prefix },
    [KEY_NAME]: { value: data.full_name },
    [KEY_SKU]: { value: data.key },
  })
  
  export const getProductPrice = item => item ? `${item.position_price.amount} ${item.position_price.currency}`: '';
  
  export const createTable = (product, type) => product.length ? [
    [
        ...getParametersList(type === TABLET_TYPE).map(item => getMappingList(type === TABLET_TYPE)[item]),
        ...SHOPS.map(item => NAMES_MAPPING[item])
    ],
    ...product
  ] : undefined;
  