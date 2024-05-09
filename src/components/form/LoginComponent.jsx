export const Input = ({type, name ,placeholder,onChange, ...rest} ) => {
    return (
        <div className="w-full p-px h-11 bg-gradient-to-r from-primary-color to-secondary-color ">
            <input name={name} type={type} placeholder={placeholder} onChange={onChange} {...rest} className="w-full h-full p-3 bg-black placeholder:text-white focus:outline-none focus:border-primary-color"/>
        </div>
    )
}

export const Button = ({children, onClick, type, disabled,item}) => {
    const buttonVarients =  {
        largeButton : 'px-5 py-3 text-base  font-semibold rounded bg-gradient-to-br from-primary-color to-secondary-color h-14 focus:outline-none hover:opacity-90',
        smallButton : 'px-5 py-3 text-base font-semibold rounded bg-gradient-to-br from-primary-color to-secondary-color h-11 focus:outline-none hover:opacity-90'
    }


    return(
        <button disabled={disabled} type={type} className={`${buttonVarients[item]}`} onClick={onClick}>
          {children}
        </button>
    );
}