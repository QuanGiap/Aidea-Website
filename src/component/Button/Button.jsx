import './Button.css';
function Button({children,onClick=()=>{}, className=''}){
    const name = className?' '+className:'';
    return <button className={'custom_button'+name} onClick={onClick}>{children}</button>
}
export default Button;