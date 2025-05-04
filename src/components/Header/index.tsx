import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header} data-testid="header">
      <div className={styles.headerContent}>
        <h2 className={styles.headerTitle}>Instagram</h2>
      </div>
    </header>
  );
};

export default Header;
