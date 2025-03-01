import './Button.css';
function Button({children,onClick=()=>{}, className='',disabled=false,type}) {
    const name = className?' '+className:'';
    return <button type={type} disabled={disabled} className={'custom_button'+name} onClick={onClick}>{children}</button>
}
export default Button;