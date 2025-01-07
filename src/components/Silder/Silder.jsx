import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import useGetByPrice from '../../shared/hooks/useGetByPrice';

function valuetext(value) {
    return `${value}°C`;
}

export function RangeSlider() {
    const [value, setValue] = React.useState([0, 999]);
    const { products, loading, error } = useGetByPrice(value[0], value[1]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: 300 }}>
            <Slider
                getAriaLabel={() => 'Temperature range'}
                value={value}
                min={0}
                max={100000}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
            />
        </Box>
    );
}