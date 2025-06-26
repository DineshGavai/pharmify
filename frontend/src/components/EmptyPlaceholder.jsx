const EmptyPlaceholder = ({ helperText, action }) => {

    if (!helperText) throw new Error("A Helper Text for the Empty Placeholder is required.")

    return (
        <div className="empty-placeholder">
            <span>{helperText}</span>
            {action}
        </div>
    )
}

export default EmptyPlaceholder;