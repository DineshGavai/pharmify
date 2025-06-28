const EmptyPlaceholder = ({ heading, caption, action }) => {

    if (!heading) throw new Error("A Helper Text for the Empty Placeholder is required.")

    return (
        <div className="empty-placeholder">
            <span className="text-emphasis">{heading}</span>
            {caption && <span>{caption}</span>}
            {action}
        </div>
    )
}

export default EmptyPlaceholder;