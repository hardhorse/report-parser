import React, {useState} from 'react';
import Table from './Table';
import Fields from './Fields';

const FileData = ({ name, data, fileIndex, optionalFields = [], fields = [], onFieldSelect = () => {}, fileData = {} }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [activeField, setActiveField] = useState('');

  function handleCollapse() {
    setCollapsed(!collapsed);
  }
  function handleFieldChange(field) {
    setActiveField(field)
  }

  return (
    <div>
      <h1 className={!collapsed ? 'active' : ''} onClick={handleCollapse}>{name}</h1>
      {!collapsed && <Fields fileIndex={fileIndex} fields={fields} onChange={handleFieldChange} /> }
      {!collapsed && optionalFields.length > 0 && <Fields fileIndex={fileIndex} fields={optionalFields} onChange={handleFieldChange} /> }
      {!collapsed && <Table fileData={fileData[name]} fields={fields} onFieldSelect={onFieldSelect(name, activeField)} data={data} />}
    </div>
  );
};

export default FileData