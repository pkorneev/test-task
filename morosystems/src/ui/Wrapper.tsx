import React, { PropsWithChildren } from "react";
import styles from "./Wrapper.module.css";

const Wrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};

export default Wrapper;
