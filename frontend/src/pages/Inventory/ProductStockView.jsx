import { useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { getFromLocalStorage } from "../../utils/browserStorage";
import { useNavigate } from "react-router-dom";
import IconButton from "../../components/Button/IconButton";
import DataCell from "../../components/DataCell";
import Aside from "../../components/Aside";
import CategoryList from "../../components/Inventory/CategoryList";

const ProductStockView = () => {

    const [inventoryData, setInventoryData] = useState(() => getFromLocalStorage("viewed_product"));
    const [initialInventoryData, setInitialInventoryData] = useState({});
    const [updatedInventoryData, setUpdatedInventoryData] = useState({});

    const [isFormEditable, setIsFormEditable] = useState(true);

    const navigate = useNavigate();

    const { headerChildren, setHeaderChildren } = useContext(GlobalContext);

    useEffect(() => {
        setHeaderChildren({
            backBtn: (
                <IconButton
                    iconName="arrow_left"
                    onClick={() => {
                        navigate("/inventory/product");
                    }}
                />
            ),
            heading: `Stock - ${inventoryData.name}`,
            collapsible: true,
        })
    }, [])


    return (
        <form className={`inventory-stock-view`}>
            <Aside
                className={"product-summary"}
                heading={<>Product</>}
                activeStatus={window.innerWidth > 1024 || true}
                content={
                    <>
                        <div className="info">
                            <DataCell
                                label={"Product Name"}
                                data={inventoryData.name}
                            />
                            {
                                inventoryData.generic_name &&
                                <DataCell
                                    label={"Generic Name"}
                                    data={inventoryData.generic_name}
                                />
                            }
                            <DataCell
                                label={"Brand Name"}
                                data={inventoryData.brand}
                            />
                        </div>

                        <div className="info">
                            <DataCell
                                label={"Supplier Name"}
                                data={inventoryData.supplier}
                            />
                        </div>

                        <div className="info">
                            <DataCell
                                label={"Cost Price"}
                                data={"₹" + (inventoryData.cost_price || "NA")}
                            />
                            <DataCell
                                label={"Selling Price"}
                                data={"₹" + (inventoryData.selling_price || "NA")}
                            />
                            <DataCell
                                label={"Tax Rate"}
                                data={(inventoryData.tax_rate || "NA") + "%"}
                            />
                        </div>

                        <div className="info">
                            <DataCell
                                label={"Net Selling Price"}
                                data={"₹" + (inventoryData.net_selling_price || "NA")}
                            />
                            <DataCell
                                label={"Profit Amount"}
                                data={"₹" + (inventoryData.selling_price || "NA")}
                            />
                            <DataCell
                                label={"Profit Percentage Rate"}
                                data={(inventoryData.tax_rate || "NA") + "%"}
                            />
                        </div>

                        <div className="info">
                            <DataCell
                                label={"Categories"}
                                data={<CategoryList categoryData={inventoryData.categories} />}
                            />
                        </div>
                    </>
                }
            />

            <section className="main-sec">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore corrupti vel odit quo numquam, non nemo tempore molestias sapiente dignissimos. Culpa vitae et sequi expedita vero necessitatibus tempora, dolorum quos possimus qui dignissimos. Saepe sunt sint quae sapiente nulla, est deserunt expedita alias ipsam quia ratione officia quibusdam labore odit error necessitatibus placeat! Nobis ullam eaque id temporibus recusandae laboriosam exercitationem quo, illo, placeat dolorem velit adipisci mollitia. Dolorum perspiciatis eos aperiam facilis sint necessitatibus alias inventore temporibus obcaecati. Repellat velit corrupti, vitae ex reiciendis nulla! Quos ducimus eum ratione sed, natus rem modi eveniet tempora mollitia sint. Obcaecati quod consequuntur placeat dolorum aspernatur, aliquam, fugit animi explicabo ducimus aperiam fuga dolor, delectus voluptates temporibus debitis labore expedita totam eos voluptatibus consequatur. Ex magni enim nam alias iure beatae vero deserunt odit et sunt natus possimus sapiente, nihil nisi cumque a quasi esse autem cum recusandae blanditiis porro quo nemo. Sint consequatur maxime libero? Adipisci voluptates eum sed assumenda quaerat earum corporis quasi provident corrupti quam nam, officiis quos enim ipsum maxime magnam voluptatum sint nihil sequi ducimus aliquam repellendus recusandae commodi tempore? Tempora recusandae dolorum, suscipit eligendi exercitationem quasi inventore ullam illo modi mollitia dignissimos quae dicta enim, repudiandae placeat ad officia debitis eum voluptate alias ab voluptates? Voluptatem accusamus exercitationem, ipsam architecto nobis sint voluptas. Quia consectetur quod, eligendi dolor accusamus rem inventore laborum, unde consequuntur autem at pariatur minima voluptates quaerat temporibus? Nihil voluptatibus ratione, aperiam possimus maxime consequatur? Quidem eligendi doloribus nisi ex minus. Alias laudantium laborum molestias id, atque ipsam nostrum. Odio reprehenderit eum est alias. Eos, suscipit nesciunt rem tempore aperiam praesentium consequatur neque earum ut magnam sed quia deserunt nemo fuga iure quis unde distinctio dolorum aut architecto! Facere sit officia perferendis cumque laboriosam quo soluta non explicabo, atque culpa accusantium fugiat minus?
            </section>
        </form>
    )
}

export default ProductStockView;