import style from "../order-card.module.css";
import { FC } from "react";
type ImgLineProps = {
  img: string;
  index: number;
  length: number;
};
export const ImgLine: FC<ImgLineProps> = ({ img, index, length }) => {
  return (
    <div className={style.imgWrapper} key={index} style={{ zIndex: 6 - index }}>
      {index === 5 ? (
        <div className={style.last}>
          <span
            className={`text text_type_digits-default ${style.moreIngredients}`}
          >
            {`+${length - 5}`}
          </span>
          <div className={style.lastImg}>
            <img className={style.img} src={img} alt={'ingredient'}/>
          </div>
        </div>
      ) : (
        <img className={style.img} src={img} alt={'ingredient'} />
      )}
    </div>
  );
};
