import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/date";
import IconButton from "../Button/IconButton";
import DataCell from "../DataCell";

const BatchSummaryCard = ({ cardData }) => {

    const navigate = useNavigate()

    cardData = {
        batch_num: "SN24-1127",
        stock: {
            quantity: 39,
            label: "Carton",
            child: {
                quantity: 3,
                label: "Pack",
                child: {
                    quantity: 20,
                    label: "Strip",
                    child: {
                        quantity: 10,
                        label: "Tablet",
                        child: {}
                    }
                }
            }
        },
        date_expiry: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
        date_added: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
        date_updated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    };

    let totalQuantity = 1;

    const getStockDataArray = (data, arr = []) => {
        if (!data.child || data.child == {}) return arr;

        const { child, ...rest } = data
        arr.unshift(rest)
        return getStockDataArray(child, arr)
    }

    const createStockHierarchy = (data, i = 0) => {
        if (i >= data.length) return;

        totalQuantity *= data[i].quantity;

        return (
            <div className={`level`}>
                <span>{data[i].quantity} {data[i].label}</span>
                {createStockHierarchy(data, i + 1)}
            </div>
        )
    }

    return (
        <div className="batch-summary-card">
            <div className="header">
                <p>Batch #{cardData.batch_num}</p>

                <IconButton
                    iconName={"arrow_right"}
                    className="see-stock"
                    onClick={()=>navigate("/inventory/:id/product/stock")}
                />

            </div>

            <div className="col-left">
                <div className="dates">
                    <DataCell
                        label={"Expiry"}
                        data={formatDate(cardData.date_expiry)}
                    />
                    <DataCell
                        label={"Added on"}
                        data={formatDate(cardData.date_added)}
                    />
                    <DataCell
                        label={"Updated on"}
                        data={formatDate(cardData.date_updated)}
                    />
                </div>

            </div>

            <div className="col-right">
                <div className="stock-hierarchy">
                    {createStockHierarchy(getStockDataArray(cardData.stock))}
                </div>

                <div className="total">
                    Total Quantity: <span>{totalQuantity}</span> Units
                </div>
            </div>
        </div>
    )
}


export default BatchSummaryCard;