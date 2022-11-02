import Login from "../login";
import styles from "./Header.module.scss";
function Header() {
    return (
        <>
            <div className={styles.container}>
                <p>Online Chat Engine - Made by David 😎</p>
            </div>
            <Login />
        </>
    );
}

export default Header;
