export const Input = ({type, name ,placeholder,onChange, ...rest} ) => {
    return (
        <div className="w-full p-px h-11 bg-gradient-to-r from-primary-color to-secondary-color ">
            <input name={name} type={type} placeholder={placeholder} onChange={onChange} {...rest} className="w-full h-full p-3 bg-black placeholder:text-white focus:outline-none focus:border-primary-color"/>
        </div>
    )
}

export const Button = ({children, onClick}) => {
    return(
        <button className="px-5 py-3 text-base font-semibold rounded mt-9 bg-gradient-to-br from-primary-color to-secondary-color h-14 focus:outline-none hover:opacity-90" onClick={onClick}>
          {children}
        </button>
    );
}