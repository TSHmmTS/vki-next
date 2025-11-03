'use client';

import Link from 'next/link';
import styles from './BackLink.module.scss';

interface Props {
  href: string;
  children: React.ReactNode;
}

const BackLink = ({ href, children }: Props): React.ReactElement => (
  <div className={styles.BackLink}>
    <Link href={href}>{children}</Link>
  </div>
);

export default BackLink;


