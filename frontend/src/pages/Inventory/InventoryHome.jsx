import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import CTAButton from "../../components/Button/CTAButton";
import InventoryTable from "../../components/Inventory/InventoryTable";
import InventoryItemTile from "../../components/Inventory/InventoryItemTile";
import { exampleInventoryList } from "../../utils/data";
import IconButton from "../../components/Button/IconButton";

const InventoryHome = () => {

    // Customized header
    const { headerChildren, setHeaderChildren } = useContext(GlobalContext);

    useEffect(() => {
        setHeaderChildren({
            heading: "Inventory",
            elements:
                <>
                    <IconButton iconName={"add"} className="primary mobile-only" />
                    <CTAButton label="Add product" iconName="add" className="primary tab-desk-only" />
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


export default InventoryHome;