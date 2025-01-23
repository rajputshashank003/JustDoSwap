const SwapIcon : React.FC<any> = ({onClick}) => {
  return (
    <div onClick={onClick} className='h-12 m-2 hover:border-1 z-[9999] duration-200 hover:shadow-[1px_1px_20px_#C7F284] hover:shadow-[#C7F284] hover:border-[#C7F284] cursor-pointer w-12 relative border-2 border-[#131B24] flex justify-center items-center rotate-90 rounded-full bg-[#1C2936] text-slate-500'>
        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-arrows-exchange"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 10h14l-4 -4" /><path d="M17 14h-14l4 4" /></svg>
    </div>
  )
}

export default SwapIcon