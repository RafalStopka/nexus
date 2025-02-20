import ColorPicker from "../../components/colorPicker/ColorPicker";
import NamePicker from "../../components/namePicker/NamePicker";
import styles from './style.module.css';

const UserData = () => {
   return (
    <div className={styles.container}>
        <NamePicker />
        <ColorPicker />
    </div>
   )
}

export default UserData;