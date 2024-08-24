import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <p>
                    &copy; {new Date().getFullYear()} CBYA Auditores de Cuentas, S.L.P. All rights reserved.
                </p>
                <p>
                    <a href="https://cbyaauditores.es" target="_blank" rel="noopener noreferrer">
                        Visit our website
                    </a>
                    {' | '}
                    <a href="https://github.com/sergihejo" target="_blank" rel="noopener noreferrer">
                        GitHub Repository
                    </a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
