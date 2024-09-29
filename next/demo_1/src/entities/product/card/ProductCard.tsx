import Link from "next/link";
import type {CatalogApiV3Product} from "@/src/api-client/data-contracts";
import {Price} from "../price/Price";
import styles from './ProductCard.module.css';

interface IProductCardProps {
    product: CatalogApiV3Product
}

export const ProductCard = ({product}: IProductCardProps) => {
    return (
        <li className={styles.root}>
            <Link href={product.canonicalUrl ?? '/metro'} className={styles.content}>
                <picture  className={styles.picture}>
                    <img src={product.imageUrl ?? '/noImageIllustration.svg'} alt={product.name} className={styles.img}/>
                </picture>
                <div className={styles.bottom}>
                    <h2 className={styles.title}>{product.name}</h2>
                    <p className={styles.volume}>{product.humanVolume}</p>
                    <div className={styles.priceWrapper}>
                        <Price value={product.price} className={styles.price}/>
                    </div>
                </div>
            </Link>
        </li>
    )
}