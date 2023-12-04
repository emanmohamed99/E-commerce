import styles from "./GridList.module.css"
import Loading from '../../Ecom/Loading/Loading';
type GridListTypes<T>={
  loading:boolean,
  error:null|string,
  renderChild:(record: T)=>JSX.Element,
  data:T[];
} 
const GridList  =<T,> ({data,loading,error,renderChild}:GridListTypes<T>) => {
    const {grid}=styles;
    const renderItems=
    data.length>0? data.map((record) =>renderChild(record))
    :"there is no record avalible"
  return (
  <Loading loading={loading} error={error}>
    <div className={grid}> {
      renderItems
  }
    </div>
    </Loading>
  );
}

export default GridList;
