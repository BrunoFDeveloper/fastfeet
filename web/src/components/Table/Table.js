import React from 'react';
import PropTypes from 'prop-types';

import { TableContent } from './styles';

export default function Table({ titles, children }) {
  return (
    <>
      {titles.length > 0 && (
        <TableContent>
          <thead>
            <tr>
              {titles.map(title => (
                <th key={title}>{title}</th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </TableContent>
      )}
    </>
  );
}

Table.propTypes = {
  titles: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
};
