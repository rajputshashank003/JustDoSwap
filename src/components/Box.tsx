import { useState } from "react";

const Box = ({listShow , inAmount, setListShow,tokenData, children, value, onChange, forData}) => {

    const handleAllTokenShow = () => {
        setListShow(prev => [!prev[0], prev[1]]);
    }
    const [isFocus , setFocus] = useState(false);

    const formatValue = (val) => {
        if(val == 0){
            return '';
        }
        if (val?.toString().length > 9) {
          return val.toString().slice(0, 9);
        }
        return val;
    };

    return (
        <div className={`w-96 max-sm:w-[20rem] p-4 h-fit font-inter rounded-xl bg-[#131B24] font-normal z-[99] ${isFocus ? "shadow-[0.2px_0.2px_3px_#e2f8c1] border-[0.1px] border-[#C7F284]" : ""}`}>
            <div className="text-[1rem] mb-4">
                {children}
            </div>
            <div className="flex flex-row justify-between items-cener">
                <div onClick={handleAllTokenShow} className="flex flex-row hover:shadow-[0.001px_0.001px_5px_#C7F284] hover:border-[0.2px] hover:bg-[#e2f8c1] hover:bg-opacity-[0.2] duration-200 cursor-pointer hover:border-[#C7F284] hover:text-[#C7F284] text-slate-400 bg-[#1C2936] h-fit w-fit rounded-md px-2 py-1 justify-between items-center">
                    <img className="h-6 w-6 max-sm:h-4 max-sm:w-4 rounded-full" src={tokenData.logoURI} alt="" />
                    <div className="text-sm max-sm:text-[10px] text-slate-100 m-2">
                        {tokenData.name}
                    </div>
                    <div  className={`-rotate-90 text-2xl duration-200 cursor-pointer`}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="24" height="24" strokeWidth="2">
                            <path d="M15 6l-6 6l6 6"></path>
                        </svg>
                    </div>
                </div>
                <div className="text-2xl flex justify-center items-center text-slate-200 font-bold">
                    <input 
                        {...(forData === 'input' ? { onChange: (e) => onChange(e) } : {onChange : () => 1} )}
                        {...(forData === 'output' ? { value : formatValue(value) } : '')}
                        className={`bg-transparent w-44 max-sm:w-40 max-sm:text-xl text-right border-none outline-none placeholder-[#4E545B] hide-arrows`}
                        type="number"
                        onFocus={() => setFocus(true && forData === 'input')}
                        onBlur={() => setFocus(false)}
                        placeholder="0.00"
                        readOnly={forData === 'input' ? false : true}
                    />
                </div>
            </div>
        </div>
    )
}

export default Box