import styles from "./GridList.module.css";

import { Tcategory } from "../../../store/category/types";
import { Tproduct } from "../../../store/product/types";

import "swiper/css";
import { Loading } from "../../Ecom";

type GridListTypes = {
  loading?: boolean;
  error?: null | string;
  renderChild?: (record: Tcategory | Tproduct) => React.JSX.Element | undefined;
  data: (Tcategory | Tproduct)[];
};
const GridList = ({ data, loading, error, renderChild }: GridListTypes) => {
  const { grid } = styles;
  const renderItems = data.map((record: Tcategory | Tproduct) => {
    if (renderChild) return renderChild(record);
  });

  return (
    <Loading loading={loading} error={error}>
      <div className={grid}>{renderItems}</div>
    </Loading>
  );
};

export default GridList;
