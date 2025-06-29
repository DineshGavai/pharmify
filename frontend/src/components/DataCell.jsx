import PropTypes from "prop-types";

const DataCell = ({ label, data, className = "" }) => {

    return (
        <div className={`data-cell ${className}`}>
            {label}
            <span>{data || "NA"}</span>
        </div>
    );
}

DataCell.propTypes = {
    label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node,
        PropTypes.element,
    ]),
    data: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node,
        PropTypes.element,
    ]).isRequired,
    className: PropTypes.string
}

export default DataCell;