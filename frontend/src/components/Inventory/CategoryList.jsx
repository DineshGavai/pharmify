import CTAButton from "../Button/CTAButton";
import EmptyPlaceholder from "../EmptyPlaceholder";
import Icon from "../Icon";

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
        <ul className={`categories-list ${className}`}>

            {
                !categoryData ?
                    <EmptyPlaceholder
                        helperText={"No Categories Selected"}
                        action={
                            <CTAButton
                                label={"Select"}
                                className="primary"
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
    );
};


export default CategoryList;