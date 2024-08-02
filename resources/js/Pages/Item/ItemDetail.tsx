import ItemImage from "./ItemImage";
import { Iitem } from "@/Interface/Item";

const ItemDetail = ({ item }: Iitem) => {
    return (
        <div className="p-12 flex flex-col lg:flex-row">
            <ItemImage item={item} />
        </div>
    );
};

export default ItemDetail;
