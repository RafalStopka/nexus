import React, { useState } from 'react';
import { useUserData } from '../../hooks/useUserData';
import styles from './style.module.css';

const NamePicker = () => {
    const { values, update } = useUserData();
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