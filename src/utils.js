export const createMessageItemUI = (data) => {
    const {author, text} = data

    let messsageItem = document.createElement('li');
    messsageItem.className = 'messageList__item'
    
    let dataUI = `
            <div>Name: ${author}</div>
            <div>Message: ${text}</div>
    `;

    messsageItem.innerHTML = dataUI;

    return messsageItem
}