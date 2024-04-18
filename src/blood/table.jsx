import { useState, useMemo, useCallback } from 'react';
import Blood from './blood';
import { data } from './data';


const Table = () => {
  const tableStyle = {
    borderCollapse: 'collapse',
    border: '1px solid black',
  };

  const tdStyle = {
    border: '1px solid black',
    padding: '0px',
    textAlign: 'center',
    width: '100px',
    height: '50px',
  };

  // Créez un tableau unique pour les groupes sanguins des parents 1
  const parent1BloodGroups = useMemo(() => {
    return [...new Set(data.map(item => item.parent1.blood))];
  }, [data]);

  // Créez un tableau unique pour les groupes sanguins des parents 2
  const parent2BloodGroups = useMemo(() => {
    return [...new Set(data.map(item => item.parent2.blood))];
  }, [data]);

  return (
    <div>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={tdStyle}></th>
            {parent1BloodGroups.map((bloodGroup, index) => (
              <th key={index} style={tdStyle}>{bloodGroup}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {parent2BloodGroups.map((parent2BloodGroup, parent2Index) => (
            <tr key={parent2Index}>
              <td style={tdStyle}>{parent2BloodGroup}</td>
              {parent1BloodGroups.map((parent1BloodGroup, parent1Index) => {
                const item = data.find(item =>
                  item.parent1.blood === parent1BloodGroup &&
                  item.parent2.blood === parent2BloodGroup
                );
                return (
                  <td key={parent1Index} style={tdStyle}>
                    {item && <Blood bloodGroups={item.predict_child_blood_group} />}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;