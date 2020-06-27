import React from 'react';
import { FIELDS_MAPPING } from '../../constant';

const Fields = ({ fileIndex, fields, onChange }) =>
fields.map((field, index) => (
    <label className="concat-field" key={index}>
        <input type="radio" name={`file${fileIndex}`} onChange={() => onChange(field)} />
        {FIELDS_MAPPING[field]}
    </label>
  ));

export default Fields;