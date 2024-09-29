import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.description}>
            <Link href='/metro/sweets'>
              /metro/sweets
            </Link>
            <Link href='/metro/chocolate'>
              /metro/chocolate
            </Link>
        </div>

        <div className={styles.center}>
          <Image
            className={styles.logo}
            src="/icon-512x512.png"
            alt="Kuper Logo"
            width={180}
            height={180}
            priority
          />
        </div>
      </main>
    </>
  );
}
