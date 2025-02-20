import React, { useEffect, useState, useRef } from 'react';
import { routeColorApiBase, routeJsonType } from '../../constants/routes';
import { useDebounce } from '../../hooks/useDebounce';
import styles from './style.module.css';
import { UpdateType, UserData } from '../../types/commonTypes';

const ColorPicker: React.FC<{values: UserData, update: UpdateType}> = ({values, update}) => {

    const [selectedColorHex, setSelectedColorHex] = useState(values.hex);
    const [selectedColor, setSelectedColor] = useState(values.currentColor);
    const [hasError, setHasError] = useState(false);
    const debouncedColor = useDebounce(selectedColorHex, 100);
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        const abortController = new AbortController();

        const getColorName = async (hex: string) => {
            try {
                setHasError(false);
                const response = await fetch(`${routeColorApiBase}=${hex}&${routeJsonType}`, { signal: abortController.signal });
                const data = await response.json();
                update('currentColor', data.name.value);
                setSelectedColor(data.name.value);
            } catch (e) {
                console.error(e);
                update('currentColor', 'Black');
                setSelectedColor('Black');
                setSelectedColorHex('#000000');
                update('hex', '#000000');
                setHasError(true);
            }
        };

        if (debouncedColor) {
            getColorName(debouncedColor.replace("#", ""));
        }

        return () => {
            abortController.abort();
        };
    }, [debouncedColor]);

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedColorHex(e.target.value);
        update('hex', e.target.value);
    };

    return (
        <div className={styles.container}>
            <label htmlFor='colorPicker' className={styles.label}>Pick your character color</label>
            <input 
                type="color"
                id="colorPicker"
                value={selectedColorHex}
                onChange={handleColorChange}
                className={styles.colorInput}
                data-testid="colorPicker"
            />
            <div 
                className={styles.colorDisplay}
                data-testid="colorDisplay"
            >
                Your chosen color: 
                <span 
                    className={styles.colorName} 
                    style={{color: values.hex}}
                >
                    {selectedColor}
                </span>
            </div>
            {
                hasError && 
                <div className={styles.error}>
                    Error occurred while requesting data. Setting color and color name to default values.
                </div>
            }
        </div>
    );
};

export default ColorPicker;