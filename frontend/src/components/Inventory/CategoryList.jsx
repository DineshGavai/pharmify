import CTAButton from "../Button/CTAButton";
import EmptyPlaceholder from "../EmptyPlaceholder";
import Icon from "../Icon";
import Input, { controlledInput } from "../Input/Input";

// Renders subcategories <li> elements
const renderSubcategories = (subcategories, marker) => {
    return subcategories.map((subcategory, index) => (
        <li className="category-list-item subcategory" key={index}>
            <span>{marker} {subcategory}</span>
        </li>
    ));
};

// Renders categories with their subcategories
const renderCategories = (categories, marker) => {
    return Object.entries(categories).map(([category, subcategories], index) => (
        <li className="category-list-item category" key={index}>
            <span>{marker} {category}</span>
            {subcategories.length > 0 && (
                <ul>{renderSubcategories(subcategories, marker)}</ul>
            )}
        </li>
    ));
};

// Main function to render full nested category structure
const CategoryList = ({ categoryData, className = "", marker = <>-</> }) => {

    return (
        <>
            <Input
                className="inventory-input"
                label={`Common Name ${categoryData?.commonName ? "(" + categoryData?.commonName?.label + ")" : ""}`}
                id="common_name"
                name="common_name"
                defaultValue={categoryData?.commonName?.value}
                placeholder={!(categoryData?.commonName?.value) && "None"}
                onChange={controlledInput(categoryData, "commonName")}
                disabled={true}
            />

            <ul className={`categories-list ${className}`}>

                {
                    !categoryData ?
                        <EmptyPlaceholder
                            heading={"No Categories Selected"}
                            action={
                                <CTAButton
                                    label={"Select"}
                                    className="ghost"
                                />
                            }
                        /> :
                        categoryData.map((item, index) => (
                            <li className="category-list-item type" key={index}>
                                <span>{marker} {item.type}</span>
                                <ul>
                                    {item.categories && renderCategories(item.categories, marker)}
                                </ul>
                            </li>
                        ))
                }
            </ul>
        </>
    );
};


export default CategoryList;