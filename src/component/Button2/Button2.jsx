import './Button2.css';
function Button2({children,onClick, className='',disabled=false,type}) {
    const name = className?' '+className:'';
    return <button type={type} disabled={disabled} className={'custom_button2'+name} onClick={onClick}>{children}</button>
}
export default Button2;