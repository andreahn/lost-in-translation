import { useState } from "react";

const TranslationOutput = () => {
    const [translations, setTranslations] = useState([])

    return (
        <div id="translation">           
            {translations}   
        </div>
    )
}

export default TranslationOutput;