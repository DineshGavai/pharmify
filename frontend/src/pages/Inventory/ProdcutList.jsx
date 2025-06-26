import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import CTAButton from "../../components/Button/CTAButton";
import InventoryTable from "../../components/Inventory/InventoryTable";
import InventoryItemTile from "../../components/Inventory/InventoryItemTile";
import { exampleInventoryList } from "../../utils/data";
import IconButton from "../../components/Button/IconButton";
import { useNavigate } from "react-router-dom";

const ProductList = () => {

    const navigate = useNavigate();

    // Customized header
    const { headerChildren, setHeaderChildren } = useContext(GlobalContext);

    useEffect(() => {
        setHeaderChildren({
            heading: "Inventory",
            children:
                <>
                    <IconButton
                        iconName={"add"}
                        className="primary mobile-only"
                        onClick={() => navigate("/inventory/new")}
                    />
                    <CTAButton
                        label="New Product"
                        iconName="add"
                        className="primary tab-desk-only"
                        onClick={() => navigate("/inventory/new")}
                    />
                </>
        })

        return () => {
            setHeaderChildren({});
        };
    }, [])


    return (
        <section className="main-sec inventory-sec">
            <InventoryTable />
            <InventoryItemTile data={exampleInventoryList[0]} />
        </section>
    )
}


export default ProductList;