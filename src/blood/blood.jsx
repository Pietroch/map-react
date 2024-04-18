import { useState, useMemo, useCallback } from 'react';

const Blood = ({ bloodGroups }) => {
    const [rows] = useState([['', ''], ['', ''], ['', ''], ['', '']]);

    useMemo(() => {
        bloodGroups.forEach(({ id, group_type, rhesus }) => {
            if (id === 1) {
                rows[0][0] = `${group_type}${rhesus}`;
            } else if (id === 2) {
                rows[0][1] = `${group_type}${rhesus}`;
            } else if (id === 3) {
                rows[1][0] = `${group_type}${rhesus}`;
            } else if (id === 4) {
                rows[1][1] = `${group_type}${rhesus}`;
            } else if (id === 5) {
                rows[2][0] = `${group_type}${rhesus}`;
            } else if (id === 6) {
                rows[2][1] = `${group_type}${rhesus}`;
            } else if (id === 7) {
                rows[3][0] = `${group_type}${rhesus}`;
            } else if (id === 8) {
                rows[3][1] = `${group_type}${rhesus}`;
            }
        });
    }, [bloodGroups]);

    const tableStyle = {
        borderCollapse: 'collapse',
    };

    const tdStyle = {
        border: '1px solid black',
        padding: '8px',
        textAlign: 'center',
        width: '50px',
        height: '50px',
    };

    return (
        <div>
            <table style={tableStyle}>
                <tbody>
                    {rows.map((row, index) => (
                        <tr key={index}>
                            {row.map((value, index) => (
                                <td key={index} style={tdStyle}>{value}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Blood;
