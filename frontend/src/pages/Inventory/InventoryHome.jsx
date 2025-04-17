import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import CTAButton from "../../components/Button/CTAButton";
import InventoryItemTile from "../../components/Inventory/InventoryItemTile";
import InventoryTableRow from "../../components/Inventory/InventoryItemRow";

const InventoryHome = () => {

    // Customized header
    const { headerChildren, setHeaderChildren } = useContext(GlobalContext);

    useEffect(() => {
        setHeaderChildren({
            heading: "Inventory",
            elements:
                <>
                    <CTAButton label="Add product" className="primary" />
                </>
        })

        return () => {
            setHeaderChildren({});
        };
    }, [])


    return (
        <section className="main-sec">
            <InventoryTableRow />
            <br />
            <br />
            <InventoryItemTile />
        </section>
    )
}


export default InventoryHome;