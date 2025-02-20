import React, { useState } from 'react';
import styles from './style.module.css';
import { UserData, UpdateType } from '../../types/commonTypes';

const NamePicker: React.FC<{values: UserData, update: UpdateType}> = ({values, update}) => {
    const [name, setName] = useState(values.name);
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        update('name', e.target.value);
    };

    return (
        <div className={styles.container}>
            <label htmlFor='namePicker' className={styles.label}>Choose your name:</label>
            <input
                id='namePicker'
                type='text'
                value={name}
                onChange={handleNameChange}
                className={styles.input}
                data-testid='namePicker'
            />
            <div 
                className={styles.nameDisplay}
                data-testid='nameDisplay'
            >
                Your chosen name: 
                    <span 
                        className={styles.name}
                        style={{color: values.hex}}
                    >
                        {name}
                    </span>
            </div>
        </div>
    );
}

export default NamePicker;