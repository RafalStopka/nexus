import ColorPicker from "../../components/colorPicker/ColorPicker";
import { Grid } from "../../components/grid";
import NamePicker from "../../components/namePicker/NamePicker";
import styles from './style.module.css';
import { useUserData } from '../../hooks/useUserData';

const MainContainer = () => {
    const { values, update } = useUserData();
    return (
        <div className={styles.container}>
            <NamePicker values={values} update={update} />
            <ColorPicker values={values} update={update} />
            <Grid values={values}/>
        </div>
    )
}

export default MainContainer;