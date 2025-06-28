import { useState } from "react";
import EmptyPlaceholder from "../EmptyPlaceholder";
import Input from "../Input/Input";
import IconButton from "../Button/IconButton";
import CTAButton from "../Button/CTAButton";

const Barcode = ({ }) => {

    const [img, setImg] = useState("/src/assets/placeholders/no-barcode.png");
    const [code, setCode] = useState("");

    return (
        <div className="barcode">
            {/* 
            * Label
            * Dashed border empty state with:
                * Menu Button with Options:
                    * Scan Now (Default)
                    * Upload Image
            * Fill the empty state with barcode (SVG generated according to the input) and solid border
            * Input for entering barcode + Tick button
                * Replace the Tick button with Edit button if barcode already exists
            */}

            <p className="floating-label">Barcode</p>

            <div className="img-box">
                {
                    (!code || !img) ?
                        <EmptyPlaceholder
                            heading={"No Barcode"}
                            caption={"Scan, upload or enter code"}
                        />
                        : <>
                            <img
                                src={img || `/src/assets/placeholders/no-barcode.png`}
                                alt={code || `No Barcode Chosen`}
                            />
                        </>
                }

            </div>

            <div className="input-group">

                <Input
                    placeholder="Enter 13 digit code"
                    className="inventory-input"
                    rightElem={
                        <IconButton
                            className="no-border"
                            iconName={"check_lg"}
                        />
                    }
                />

                <CTAButton
                    label="Upload"
                    iconName="upload"
                    className="ghost"
                />

            </div>

        </div>
    )
}

export default Barcode;