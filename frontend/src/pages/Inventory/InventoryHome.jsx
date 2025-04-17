import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import CTAButton from "../../components/Button/CTAButton";
import InventoryTable from "../../components/Inventory/InventoryTable";

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
        <section className="main-sec inventory-sec">
            <InventoryTable />
        </section>
    )
}


export default InventoryHome;