export const createMessageItemUI = (data) => {
    const {author, text} = data

    let messsageItem = document.createElement('div');
    messsageItem.className = 'comment'
    
    let dataUI = `
        <div className="content">
            <a className="author">${author}</a>
            <div className="metadata">
                <span className="date">Today at 5:42PM</span>
            </div>
            <div className="text">
                ${text}
            </div>
        </div>
    `;

    messsageItem.innerHTML = dataUI;

    return messsageItem;
}