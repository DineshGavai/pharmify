import PropTypes from "prop-types";

const DataCell = ({ label, data }) => {

    return (
        <div className="data-cell">
            {label}
            <span>{data || "NA"}</span>
        </div>
    );
}

DataCell.proptypes = {
    label: PropTypes.string,
    data: PropTypes.string,
}

export default DataCell;