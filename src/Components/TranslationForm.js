const TranslationForm = (props) => {
    return (
        <div id="translationForm">
            <form onSubmit={props.translationSubmitted}>
                <input onChange={props.translationChange} type="text" placeholder="What do you want to translate?" />
                <button type="submit">Translation</button>
            </form>
        </div>
    )
}

export default TranslationForm;