import { useCallback, useEffect, useState } from 'react';
import styles from './style.module.css';
import { UserData } from '../../types/commonTypes';
import { defaultGridItemBackground } from '../../constants/values';

type ArrowClickType = 'ArrowDown' | 'ArrowUp' | 'ArrowLeft' | 'ArrowRight';

const Grid: React.FC<{values: UserData}> = ({values}) => {
    const rows = 10;
    const columns = 10;

    const grid = [];

    const [currentRow, setCurrentRow] = useState(5);
    const [currentColumn, setCurrentColumn] = useState(5);

    const calculateNewPosition = useCallback((arrowClickType: ArrowClickType) => {
        const goToEdgePositionRow = rows - 1;
        const goToEdgePositionColumn = columns - 1;
        setCurrentRow((prevRow) => {
            let newRow = prevRow;
            switch (arrowClickType) {
                case 'ArrowDown':
                    newRow = prevRow === goToEdgePositionRow ? 0 : prevRow + 1;
                    break;
                case 'ArrowUp':
                    newRow = prevRow === 0 ? goToEdgePositionRow : prevRow - 1;
                    break;
            }
            return newRow;
        });

        setCurrentColumn((prevColumn) => {
            let newColumn = prevColumn;
            switch (arrowClickType) {
                case 'ArrowLeft':
                    newColumn = prevColumn === 0 ? goToEdgePositionColumn : prevColumn - 1;
                    break;
                case 'ArrowRight':
                    newColumn = prevColumn === goToEdgePositionColumn ? 0 : prevColumn + 1;
                    break;
            }
            return newColumn;
        });
    }, []);
    
    const handleKeyboardClick = useCallback((e: globalThis.KeyboardEvent) => {
        calculateNewPosition(e.key as ArrowClickType);
    }, [calculateNewPosition]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyboardClick);

        return () => {
            document.removeEventListener('keydown', handleKeyboardClick);
        };
    }, [handleKeyboardClick]);

    for (let row = 0; row < rows; row++) {
        const rowItems = [];
        for (let col = 0; col < columns; col++) {
            const isSelected = currentRow === row && currentColumn === col;
            rowItems.push(
                <div
                    key={`${row}-${col}`}
                    className={`${styles.gridItem} ${isSelected && styles.selected}`}
                    style={{ background: isSelected ? values.hex : defaultGridItemBackground }}
                    data-testid={`gridItem-${row}-${col}`}
                >
                    {isSelected && (
                        <div 
                            className={styles.selectedGridItem}
                            style={{ color: values.hex }}
                            data-testid='selectedGridItem'
                        >
                            {values.name}
                        </div>
                    )}
                </div>
            );
        }
        grid.push(
            <div key={`${row}`} className={styles.gridRow}>
                {rowItems}
            </div>
        );
    }

    return (
        <div className={styles.gridContainer}>
            Press arrows to move around the playground
            {grid}
        </div>
    );
};

export default Grid;